const Report = require('../models/Report')
const Link = require('../models/Link')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { sendEmailToUser } = require('../utils')

const reportLink = async (req, res) => {
  const { linkId, email, description } = req.body

  if (!email || !description) {
    throw new CustomError.BadRequestError('Required fields must be provided!')
  }

  const link = await Link.findOne({ _id: linkId })

  if (!link) {
    throw new CustomError.NotFoundError('There is no link with provided information!')
  }

  try {
    const report = await Report.create({
      link: link._id,
      email,
      description,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    })

    await sendEmailToUser({
      name: 'user',
      email,
      subject: 'Report submission',
      message: `Your report has been registered and is being tracked. Thank you for being in touch. Team Link-In-Bio`
    })

    res.status(StatusCodes.CREATED).json({ msg: "Report submission completed." })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

const getSingleReport = async (req, res) => {
  const { id: reportId } = req.params

  const report = await Report.findOne({ _id: reportId })
    .populate({
      path: 'link'
    })

  if (!report) {
    throw new CustomError.NotFoundError('There is no report with provided information!')
  }

  report.seen = true
  await report.save()

  res.status(StatusCodes.OK).json({ report })
}

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({})
    res.status(StatusCodes.OK).json({ reports })
  } catch (error) {
    throw new CustomError.InternalServerError('oops! something went wrong!')
  }
}

module.exports = {
  reportLink,
  getSingleReport,
  getAllReports
}