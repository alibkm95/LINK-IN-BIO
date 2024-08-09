const Link = require('../models/Link')
const User = require('../models/User')
const Notification = require('../models/Notification')
const ClickRecord = require('../models/ClickRecord')
const Report = require('../models/Report')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { sendEmailToUser } = require('../utils')

const createLink = async (req, res) => {
  const { destinationURL, title, showInProfile, ageRestriction } = req.body

  if (!destinationURL) {
    throw new CustomError.BadRequestError('Destination URL is not provided!')
  }

  const user = await User.findOne({ _id: req.user.userId })

  if (!user.isVerified) {
    throw new CustomError.BadRequestError('Please verify your email first!')
  }

  if (user.isBanned) {
    throw new CustomError.BadRequestError('Your account is banned!')
  }

  try {
    const link = await Link.create({
      creator: req.user.userId,
      title: title && title.length > 0 ? title : null,
      longLink: destinationURL,
      isAgeRestrict: ageRestriction ? true : false,
      showInProfile: showInProfile ? true : false,
    })

    res.status(StatusCodes.CREATED).json({ link })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const getAllLinks = async (req, res) => {
  const { r: isAgeRestrict, a: isActive, sip: showInProfile, b: isBanned, s: sort } = req.params
  const queryObj = {}

  const filterMap = { t: ['t', true], f: ['f', false] }

  if (isAgeRestrict && filterMap[isAgeRestrict]) {
    queryObj.isAgeRestrict = filterMap[isAgeRestrict][1]
  }

  if (isActive && filterMap[isActive]) {
    queryObj.isActive = filterMap[isActive][1]
  }

  if (showInProfile && filterMap[showInProfile]) {
    queryObj.showInProfile = filterMap[showInProfile][1]
  }

  if (isBanned && filterMap[isBanned]) {
    queryObj.isBanned = filterMap[isBanned][1]
  }

  let result = Link.find(queryObj).populate({
    path: 'creator',
    select: '-password -verificationCode -verificationCodeExpirationDate -resetPasswordCode -resetPasswordCodeExpirationDate'
  })

  const sortOpt = {
    newest: '-createdAt',
    oldest: 'createdAt'
  }

  if (sort && sortOpt[sort]) {
    result = result.sort(sortOpt[sort])
  } else {
    result = result.sort('-createdAt')
  }

  const links = await result

  res.status(StatusCodes.OK).json({ links })

}

const getSingleLink = async (req, res) => {
  const { id: linkId } = req.params

  const link = await Link.findOne({ _id: linkId }).populate({
    path: 'creator',
    select: '-password -verificationCode -verificationCodeExpirationDate -resetPasswordCode -resetPasswordCodeExpirationDate'
  })

  if (!link) {
    throw new CustomError.NotFoundError('There is no link with provided information!')
  }

  res.status(StatusCodes.OK).json({ link })
}

const getUserLinks = async (req, res) => {
  const links = await Link.find({ creator: req.user.userId })

  res.status(StatusCodes.OK).json({ links })
}

const updateLink = async (req, res) => {
  const { id: linkId } = req.params
  const { title, originURL, setRestriction, setActive, setShowInProfile } = req.body

  const link = await Link.findOne({ _id: linkId, creator: req.user.userId })

  if (!link) {
    throw new CustomError.NotFoundError('There is no link with provided information!')
  }

  if (title) {
    link.title = title
  }

  if (originURL) {
    link.longLink = originURL
  }

  link.isAgeRestrict = setRestriction ? true : false
  link.isActive = setActive ? true : false
  link.showInProfile = setShowInProfile ? true : false

  try {
    await link.save()
    res.status(StatusCodes.OK).json({ link })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const deleteLink = async (req, res) => {
  const { id: linkId } = req.params

  const link = await Link.findOne({ _id: linkId })
    .populate({ path: 'creator' })

  if (!link) {
    throw new CustomError.NotFoundError('There is no link with provided information')
  }

  await link.deleteOne()

  const message = `One of your links with ID: ${link._id} deleted.`

  try {
    const notification = await Notification.create({
      user: link.creator._id,
      subject: 'Link deleted',
      message,
    })

    await sendEmailToUser({
      name: link.creator.username,
      email: link.creator.email,
      subject: 'Link deleted',
      message,
    })
  } catch (error) {
    console.log(error)
  }
  res.status(StatusCodes.OK).json({ msg: 'Link removed successfully.' })
}

const bannLink = async (req, res) => {
  const { id: linkId } = req.params

  const link = await Link.findOne({ _id: linkId })
    .populate({ path: 'creator' })

  if (!link) {
    throw new CustomError.NotFoundError('There is no link with provided information!')
  }

  link.isBanned = !link.isBanned

  await link.save()

  const message = link.isBanned ?
    `One of your links with ID: ${link._id} has been banned due to our privacy and politics violation. Reach out our support section and try to handle this issue.`
    :
    `Your link with ID: ${link._id} has been unblocked and from now on could be served for visitors.`

  try {
    const notification = await Notification.create({
      user: link.creator._id,
      subject: link.isBanned ? 'Link banned' : 'Link unblocked',
      message,
    })

    await sendEmailToUser({
      name: link.creator.username,
      email: link.creator.email,
      subject: link.isBanned ? 'Link banned' : 'Link unblocked',
      message,
    })
  } catch (error) {
    console.log(error)
  }

  res.status(StatusCodes.OK).json({ msg: `link with id: ${link._id} is ${link.isBanned ? 'blocked' : 'unblocked'} successfully.` })
}

const redirect = async (req, res) => {
  const { short: shortLink } = req.params

  const link = await Link.findOne({ shortLink, isActive: true, isBanned: false })

  if (!link) {
    throw new CustomError.BadRequestError('The destination URL is not exist or deactivated!')
  }

  try {
    const clickRecord = await ClickRecord.create({
      link: link._id,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    })

    link.clicks += 1

    link.save()

    res.status(StatusCodes.OK).json({ URL: link.longLink })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong')
  }
}

module.exports = {
  createLink,
  getAllLinks,
  getSingleLink,
  getUserLinks,
  updateLink,
  deleteLink,
  bannLink,
  redirect
}