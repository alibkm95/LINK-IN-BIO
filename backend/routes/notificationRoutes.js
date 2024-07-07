const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  getUserNotifications,
  getAllNotifications,
  seenNotification,
} = require('../controllers/notificationController')

router
  .route('/')
  .get(authenticateUser, getUserNotifications)

router
  .route('/all')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getAllNotifications)

router
  .route('/:id')
  .patch(authenticateUser, seenNotification)

module.exports = router