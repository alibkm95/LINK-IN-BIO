const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  reportLink,
  getSingleReport,
  getAllReports
} = require('../controllers/reportController')

router
  .route('/')
  .post(reportLink)
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getAllReports)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getSingleReport)

module.exports = router