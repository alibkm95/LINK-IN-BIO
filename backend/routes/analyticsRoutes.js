const express = require('express')
const router = express.Router()

const {
  getClientRecords,
  getUserStats,
  getSingleLinkStats,
} = require('../controllers/analyticsController')

const {
  authenticateUser
} = require('../middlewares/authentication')

router
  .route('/')
  .get(getClientRecords)

router
  .route('/user')
  .get(authenticateUser, getUserStats)

router
  .route('/link/:id')
  .get(authenticateUser, getSingleLinkStats)

module.exports = router