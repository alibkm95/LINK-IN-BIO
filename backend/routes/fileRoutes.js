const express = require('express')
const router = express.Router()

const {
  sendProfileImage,
  sendCoverImage,
  sendAttachmentFile
} = require('../controllers/fileController')

router
  .route('/profile/:file')
  .get(sendProfileImage)

router
  .route('/cover/:file')
  .get(sendCoverImage)

router
  .route('/attachment/:file')
  .get(sendAttachmentFile)

module.exports = router