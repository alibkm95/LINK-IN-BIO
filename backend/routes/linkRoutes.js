const express = require('express')
const router = express.Router()

const {
  createLink,
  getAllLinks,
  getSingleLink,
  getUserLinks,
  updateLink,
  deleteLink,
  bannLink,
  redirect
} = require('../controllers/linkController')

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getAllLinks)
  .post(authenticateUser, createLink)

router
  .route('/u')
  .get(authenticateUser, getUserLinks)

router
  .route('/r/:short')
  .get(redirect)

router
  .route('/bann/:id')
  .patch(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), bannLink)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getSingleLink)
  .patch(authenticateUser, updateLink)
  .delete(authenticateUser, deleteLink)

module.exports = router