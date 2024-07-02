const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const crypto = require('crypto')
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationCode,
  sendResetPasswordCode
} = require('../utils')

const register = async (req, res) => {
  const { email, username, password } = req.body

  const emailAlreadyExist = await User.findOne({ email })
  const userNameAlreadyExist = await User.findOne({ username })

  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError('selected email is already taken! please pick another one.')
  }

  if (userNameAlreadyExist) {
    throw new CustomError.BadRequestError('selected username is already taken! please pick another one.')
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "ROOTADMIN" : "USER"

  const verificationCode = crypto.randomInt(0, 1000000).toString().padStart(6, '0')
  const tenMinutes = 1000 * 60 * 10
  const verificationCodeExpirationDate = new Date(Date.now() + tenMinutes)

  try {
  const user = await User.create({ email, username, password, role, verificationCode, verificationCodeExpirationDate })

  await sendVerificationCode({
    name: user.username,
    email: user.email,
    verificationCode,
  })

  res.status(StatusCodes.CREATED).json({ msg: 'Your account created successfully. please consider account verification.' })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong.')
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Required credentials must be provided')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnAuthenticatedError('There is no such a user with provided email address')
  }

  if (!user.isVerified) {
    throw new CustomError.UnAuthorizedError('Your account has been not verified yet!')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError('Password is incorrect!')
  }

  const tokenUser = createTokenUser(user)

  let refreshToken = ''

  const existingToken = await Token.findOne({ user: user._id })

  if (existingToken) {
    const { isValid } = existingToken

    if (!isValid) {
      throw new CustomError.UnAuthenticatedError('Information is not valid!')
    }

    refreshToken = existingToken.refreshToken
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  try {
    await Token.findOneAndDelete({ user: req.user.userId })

    res.cookie('accessToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now())
    })

    res.cookie('refreshToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({ msg: 'Loged out successfully.' })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const verifyEmail = async (req, res) => {
  const { verificationCode, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnAuthenticatedError('Error! no such a user exist.')
  }

  const isCodeValid = await user.compareVerificationCode(verificationCode)

  if (!isCodeValid) {
    throw new CustomError.UnAuthenticatedError('Error! verification code is not valid')
  }

  const currentDate = new Date()

  if (currentDate > user.verificationCodeExpirationDate) {
    throw new CustomError.BadRequestError('Verification code has expired! try after 15 minutes')
  }

  user.isVerified = true
  user.verifiedIn = Date.now()
  user.verificationCode = ''

  await user.save()

  const tokenUser = createTokenUser(user)

  let refreshToken = ''

  const existingToken = await Token.findOne({ user: user._id })

  if (existingToken) {
    const { isValid } = existingToken

    if (!isValid) {
      throw new CustomError.UnAuthenticatedError('information is not valid')
    }

    refreshToken = existingToken.refreshToken
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser, msg: 'Your account verified successfully.' })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  res.status(StatusCodes.OK).json({ user: tokenUser, msg: 'Your account verified successfully' })
}

const forgetPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new CustomError.BadRequestError('Email is required to send reset code!')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.NotFoundError('There is no such a user with provided credentials!')
  }

  const resetPasswordCode = crypto.randomInt(0, 1000000).toString().padStart(6, '0')
  const tenMinutes = 1000 * 60 * 10
  const resetPasswordCodeExpirationDate = new Date(Date.now() + tenMinutes)

  user.resetPasswordCode = resetPasswordCode
  user.resetPasswordCodeExpirationDate = resetPasswordCodeExpirationDate

  await sendResetPasswordCode({
    name: user.username,
    email: user.email,
    resetPasswordCode
  })

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Reset password Code sent to your email.' })
}

const resetPassword = async (req, res) => {
  const { resetPasswordCode, email, password } = req.body

  if (!email || !password || !resetPasswordCode) {
    throw new CustomError.BadRequestError('Error! required resetting information must be provided.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.NotFoundError('There is no such a user!')
  }

  const isCodeValid = await user.compareResetCode(resetPasswordCode)

  if (!isCodeValid) {
    throw new CustomError.UnAuthenticatedError('Error! verification code is not valid.')
  }

  const currentDate = new Date()

  if (currentDate > user.resetPasswordCodeExpirationDate) {
    throw new CustomError.BadRequestError('The rest password vrification code has expired!')
  }

  user.password = password
  user.resetPasswordCode = ''

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Resetting password successfull.' })
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
}