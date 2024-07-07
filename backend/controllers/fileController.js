const CustomError = require('../errors')
const fs = require('fs')
const path = require('path')

const sendProfileImage = async (req, res) => {
  const { file } = req.params

  const filePath = path.join(__dirname, `../public/uploads/profile/${file}`)

  if (!fs.existsSync(filePath)) {
    throw new CustomError.NotFoundError('Requested file is not exist or removed!')
  }

  res.sendFile(filePath)
}

const sendCoverImage = async (req, res) => {
  const { file } = req.params

  const filePath = path.join(__dirname, `../public/uploads/cover/${file}`)

  if (!fs.existsSync(filePath)) {
    throw new CustomError.NotFoundError('Requested file is not exist or removed!')
  }

  res.sendFile(filePath)
}

const sendAttachmentFile = async (req, res) => {
  const { file } = req.params

  const filePath = path.join(__dirname, `../public/uploads/attachments/${file}`)

  if (!fs.existsSync(filePath)) {
    throw new CustomError.NotFoundError('Requested file is not exist or removed!')
  }

  res.sendFile(filePath)
}

module.exports = {
  sendProfileImage,
  sendCoverImage,
  sendAttachmentFile
}