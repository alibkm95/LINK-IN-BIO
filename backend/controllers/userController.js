const User = require('../models/User')
const Token = require('../models/Token')
const Link = require('../models/Link')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {
  createTokenUser,
  attachCookiesToResponse
} = require('../utils')

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId }).select('-password -verificationCode -verificationCodeExpirationDate -resetPasswordCode -resetPasswordCodeExpirationDate')

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })
}

const getAllUsers = async (req, res) => {

  const { q: searchQuery, r: role, v: isVerified, b: isBanned, s: sort } = req.query

  let queryObj = {}

  if (searchQuery && searchQuery.length) {
    queryObj.$or = [
      { username: { $regex: searchQuery, $options: 'i' } },
      { email: { $regex: searchQuery, $options: 'i' } },
    ]
  }

  const roleOpt = { RA: 'ROOTADMIN', A: 'ADMIN', U: 'USER' }

  if (role && roleOpt[role]) {
    queryObj.role = roleOpt[role]
  }

  const isVerifiedOpt = { t: ['t', true], f: ['f', false] }

  if (isVerified && isVerifiedOpt[isVerified]) {
    queryObj.isVerified = isVerifiedOpt[isVerified][1]
  }

  const isBannedOpt = { t: ['t', true], f: ['f', false] }

  if (isBanned && isBannedOpt[isBanned]) {
    queryObj.isBanned = isBannedOpt[isBanned][1]
  }

  let result = User.find(queryObj).select('-password -verificationCode -verificationCodeExpirationDate -resetPasswordCode -resetPasswordCodeExpirationDate')

  const sortOpt = {
    newest: '-createdAt',
    oldest: 'createdAt',
    AZ: 'username',
    ZA: '-username',
  }

  if (sort && sortOpt[sort]) {
    result = result.sort(sortOpt[sort])
  } else {
    result = result.sort('-createdAt')
  }

  const users = await result

  res.status(StatusCodes.OK).json({ users })

}

const updateUser = async (req, res) => {
  const { username, oldPassword, newPassword, bio } = req.body
  const profileImg = req.files ? req.files.profileImg : null
  const coverImg = req.files ? req.files.coverImg : null

  const user = await User.findOne({ _id: req.user.userId })
  const alreadyExist = await User.findOne({ username })

  if (username && username.length > 3) {
    user.username = username
  }

  if (bio && bio.length) {
    user.bio = bio
  }

  if (alreadyExist && alreadyExist._id.toString() !== req.user.userId) {
    throw new CustomError.BadRequestError('The username is already taken. choose another one!')
  }

  if (oldPassword && newPassword) {
    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if (!isPasswordCorrect) {
      throw new CustomError.UnAuthenticatedError('Old password in incorrect!')
    }

    user.password = newPassword
  }

  if (profileImg) {
    const uploadedProfileImgName = await userFileUploader(profileImg, 'profileImg')
    user.profileImg = uploadedProfileImgName
  }

  if (coverImg) {
    const uploadedCoverImgName = await userFileUploader(coverImg, 'coverImg')
    user.coverImg = uploadedCoverImgName
  }

  await user.save()

  const tokenUser = createTokenUser(user)

  await Token.findOneAndDelete({ user: user._id })

  const refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const bannUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`)
  }

  if (user.role === 'ROOTADMIN') {
    throw new CustomError.UnAuthorizedError('This action is restricted!')
  }

  if (user.role === req.user.role) {
    throw new CustomError.UnAuthorizedError('This action can complete only with ROOTADMIN access!')
  }

  user.isBanned = !user.isBanned

  await user.save()

  res.status(StatusCodes.OK).json({ msg: `User ${user.isBanned ? 'blocked' : 'unblocked'} successfully.` })
}

const userRoleManagement = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`)
  }

  switch (user.role) {
    case 'ADMIN':
      user.role = 'USER'
      break;
    case 'USER':
      user.role = 'ADMIN'
      break;
    case 'ROOTADMIN':
      throw new CustomError.BadRequestError('The root admin access cannot be changed!')
    default:
      throw new CustomError.BadRequestError('The role is not valid!')
  }

  await user.save()

  res.status(StatusCodes.OK).json({ msg: `User role changed to : ${user.role}` })
}

const deleteUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`)
  }

  await user.deleteOne()

  res.status(StatusCodes.OK).json({ msg: 'User deleted successfully.' })
}

const profile = async (req, res) => {
  const { username } = req.params

  const user = await User.findOne({ username, isBanned: false, isVerified: true }).select('_id username profileImg coverImg bio')

  if (!user) {
    throw new CustomError.NotFoundError('There is no user with provided username!')
  }

  const links = await Link.find({ creator: user._id, isActive: true, isBanned: false })

  res.status(StatusCodes.OK).json({ user, links })
}

const userFileUploader = async (file, fileType) => {
  if (!file) return null

  const uploadDir = path.join(__dirname, '../public/uploads')

  const directory = fileType === 'profileImg' ? path.join(uploadDir, 'profile') : path.join(uploadDir, 'cover')

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  const image = file

  if (!image.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Selected file is not an image file (*.png | *.jpg | ...)')
  }

  const maxSize = fileType === 'profileImg' ? (1024 * 1024 * 2) : (1024 * 1024 * 5)

  if (image.size > maxSize) {
    throw new CustomError.BadRequestError('Selected file is too large')
  }

  image.name = image.name.replaceAll(' ', '_')
  const fileName = `${new Date().getTime()}_${crypto.randomInt(0, 10 ** 12 - 1).toString().padStart(12, '0')}_${image.name}`
  const imagePath = path.join(directory, fileName)

  try {
    await image.mv(imagePath)
    return fileName
  } catch (error) {
    throw new CustomError.InternalServerError('oops! upload failed!')
  }
}

module.exports = {
  showMe,
  updateUser,
  bannUser,
  deleteUser,
  userRoleManagement,
  getSingleUser,
  getAllUsers,
  profile
}