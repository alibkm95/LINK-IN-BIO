const express = require('express')
const router = express.Router()

const {
  createTicket,
  getUserTickets,
  getAllTickets,
  getSingleTicket,
  addNewMessage,
  closeTicket,
  deleteTicket,
} = require('../controllers/ticketController')

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

router
  .route('/')
  .post(authenticateUser, createTicket)
  .get(authenticateUser, getUserTickets)

router
  .route('/all')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getAllTickets)

router
  .route('/add/:id')
  .patch(authenticateUser, addNewMessage)

router
  .route('/:id')
  .get(authenticateUser, getSingleTicket)
  .patch(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), closeTicket)
  .delete(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), deleteTicket)

module.exports = router