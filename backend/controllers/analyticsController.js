const Link = require('../models/Link')
const ClickRecord = require('../models/ClickRecord')
const User = require('../models/User')
const Notification = require('../models/Notification')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getClientRecords = async (req, res) => {
  try {
    const linkCount = await Link.countDocuments()
    const clickCount = await ClickRecord.countDocuments()
    const userCount = await User.countDocuments()

    res.status(StatusCodes.OK).json({ linkCount, clickCount, userCount })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const getUserStats = async (req, res) => {
  const links = await Link.find({ creator: req.user.userId })
  const notifications = await Notification.countDocuments({ user: req.user.userId, seen: false })

  let count = 0

  links.map(link => {
    if (link.isActive && !link.isBanned) count++
  })

  const userStats = {
    activeLinks: count,
    deactiveLinks: links.length - count < 0 ? 0 : links.length - count,
    notifCount: notifications
  }

  res.status(StatusCodes.OK).json({ userStats })
}

const getSingleLinkStats = async (req, res) => {
  const { id: linkId } = req.params

  const link = await Link.findOne({ _id: linkId, creator: req.user.userId })

  if (!link) {
    throw new CustomError.NotFoundError('there is no such a link!')
  }

  const clickRecords = await ClickRecord.find({ link: link._id })

  const statData = clickRecords.reduce((acc, current) => {
    const date = new Date(current.createdAt).toLocaleDateString()
    const existingDate = acc.find((item) => item.date === date)
    if (existingDate) {
      existingDate.clickCount++
    } else {
      acc.push({ date, clickCount: 1 })
    }
    return acc
  }, [])

  res.status(StatusCodes.OK).json({ link, statData })
}

module.exports = {
  getClientRecords,
  getUserStats,
  getSingleLinkStats,
}