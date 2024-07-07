const Ticket = require('../models/Ticket')
const Conversation = require('../models/Conversation')
const fs = require('fs')
const path = require('path')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const crypto = require('crypto')

const createTicket = async (req, res) => {
  const { subject, message } = req.body
  const file = req.files ? req.files.attachment : null
  let uploadedFileName = null

  if (!subject || !message) {
    throw new CustomError.BadRequestError('Required fields are not provided!')
  }

  const ticket = await Ticket.create({
    subject,
    creator: req.user.userId
  })

  if (!ticket) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }

  if (file) {
    uploadedFileName = await ticketFileUploader(file)
  }

  const newMessage = await Conversation.create({
    sender: req.user.userId,
    ticket: ticket._id,
    message,
    attachment: uploadedFileName
  })

  if (!newMessage) {
    await ticket.deleteOne()
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }

  res.status(StatusCodes.CREATED).json({ msg: "Ticket created successfully", ticket })
}

const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ creator: req.user.userId })
    res.status(StatusCodes.OK).json({ tickets })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wromg!')
  }
}

const getAllTickets = async (req, res) => {
  const { q: searchQuery, u: user, ts: status, s: sort } = req.query

  let queryObj = {}

  if (searchQuery && searchQuery.length) {
    queryObj.subject = { $regex: searchQuery, $options: 'i' }
  }

  if (user && user.length) {
    queryObj.creator = user
  }

  const statusOpt = {
    pending: 'pending',
    answered: 'answered',
    closed: 'closed',
  }

  if (status && statusOpt[status]) {
    queryObj.ticketStatus = statusOpt[status]
  }

  let result = Ticket.find(queryObj)

  const sortOpt = {
    newest: '-createdAt',
    oldest: 'createdAt',
    AZ: 'subject',
    ZA: '-subject',
  }

  if (sort && sortOpt[sort]) {
    result = result.sort(sortOpt[sort])
  } else {
    result = result.sort('-createdAt')
  }

  const tickets = await result

  res.status(StatusCodes.OK).json({ tickets })
}

const getSingleTicket = async (req, res) => {
  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })
    .populate({
      path: 'creator',
      select: '_id username email profileImg coverImg'
    })
    .populate({
      path: 'conversations',
      populate: {
        path: 'sender',
        model: 'User',
        select: '_id username email, profileImg coverImg'
      }
    })

  if (!ticket) {
    throw new CustomError.NotFoundError('There is no ticket with provided information!')
  }

  if (req.user.role === 'USER' && req.user.userId !== ticket.creator._id.toString()) {
    throw new CustomError.UnAuthorizedError('You cant access the tickets other than yours!')
  }

  res.status(StatusCodes.OK).json({ ticket })
}

const addNewMessage = async (req, res) => {
  const { id: ticketId } = req.params
  const { newMessage } = req.body
  const file = req.files ? req.files.attachment : null
  let uploadedFileName = null

  let ticket = await Ticket.findOne({ _id: ticketId })
    .populate({
      path: 'creator',
      select: '_id userName email profileImg coverImg'
    })

  if (!ticket) {
    throw new CustomError.NotFoundError('There is no ticket with provided information!')
  }

  if (ticket.ticketStatus === 'closed') {
    throw new CustomError.BadRequestError('This ticket is closed and can not send any message to it!')
  }

  if (file) {
    uploadedFileName = await ticketFileUploader(file)
  }

  const newMessageInserting = await Conversation.create({
    sender: req.user.userId,
    ticket: ticketId,
    message: newMessage,
    attachment: uploadedFileName
  })

  if (!newMessageInserting) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }

  if (req.user.role === 'ADMIN' || req.user.role === 'ROOTADMIN') {
    ticket.ticketStatus = 'answered'
    await Conversation.updateMany({ ticket: ticketId }, { seenByAdmin: true })
    await ticket.save()
  }

  if (req.user.role === 'USER') {
    ticket.ticketStatus = 'pending'
    await Conversation.updateMany({ ticket: ticketId }, { seenByUser: true })
    await ticket.save()
  }

  ticket = await Ticket.findOne({ _id: ticketId })
    .populate({
      path: 'creator',
      select: '_id username email profileImg coverImg'
    })
    .populate({
      path: 'conversations',
      populate: {
        path: 'sender',
        model: 'User',
        select: '_id username email, profileImg coverImg'
      }
    })

  res.status(StatusCodes.OK).json({ ticket })
}

const closeTicket = async (req, res) => {
  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })

  if (!ticket) {
    throw new CustomError.NotFoundError('There is no ticket with provided information!')
  }

  ticket.ticketStatus = 'closed'
  await ticket.save()

  res.status(StatusCodes.OK).json({ msg: "Ticket closed successfully." })
}

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })

  if (!ticket) {
    throw new CustomError.NotFoundError('There is no ticket with provided information!')
  }

  await ticket.deleteOne()
  res.status(StatusCodes.OK).json({ msg: "Ticket deleted successfully." })
}

const ticketFileUploader = async (file) => {
  if (!file) return null

  const directory = path.join(__dirname, '../public/uploads/attachments')

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  if (!file.mimetype.startsWith('application/zip') && !file.mimetype.startsWith('application/x-zip-compressed')) {
    throw new CustomError.BadRequestError('Only *.ZIP files allowed!')
  }

  const maxSize = 1024 * 1024 * 2;

  if (file.size > maxSize) {
    throw new CustomError.BadRequestError('Selected file is too large!')
  }

  file.name = file.name.replaceAll(' ', '_')
  const fileName = `${new Date().getTime()}_${crypto.randomInt(0, 10 ** 12 - 1).toString().padStart(12, '0')}_${file.name}`
  const filePath = path.join(directory, fileName)

  try {
    await file.mv(filePath)
    return fileName
  } catch (error) {
    throw new CustomError.InternalServerError('oops! upload failed!')
  }
}

module.exports = {
  createTicket,
  getUserTickets,
  getAllTickets,
  getSingleTicket,
  addNewMessage,
  closeTicket,
  deleteTicket,
}