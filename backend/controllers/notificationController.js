const Notification = require('../models/Notification')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.userId, seen: false })
    res.status(StatusCodes.OK).json({ notifications })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({})
    res.status(StatusCodes.OK).json({ notifications })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const seenNotification = async (req, res) => {
  const { id: notifId } = req.params

  const notification = await Notification.findOne({ _id: notifId })

  if (!notification) {
    throw new CustomError.NotFoundError('There is no notification with provided information!')
  }

  notification.seen = true

  await notification.save()

  res.status(StatusCodes.OK).json({ msg: "notification updated successfully." })
}

module.exports = {
  getUserNotifications,
  getAllNotifications,
  seenNotification,
}