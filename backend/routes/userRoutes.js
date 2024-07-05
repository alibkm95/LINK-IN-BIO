const express = require('express')
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middlewares/authentication')

const {
  showMe,
  updateUser,
  bannUser,
  deleteUser,
  userRoleManagement,
  getSingleUser,
  getAllUsers,
  profile
} = require('../controllers/userController')

router
  .route('/')
  .get(authenticateUser, showMe)
  .patch(authenticateUser, updateUser)

router
  .route('/all')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getAllUsers)

router
  .route('/profile/:username')
  .get(profile)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), getSingleUser)
  .post(authenticateUser, authorizePermissions('ADMIN', 'ROOTADMIN'), bannUser)
  .patch(authenticateUser, authorizePermissions('ROOTADMIN'), userRoleManagement)
  .delete(authenticateUser, authorizePermissions('ROOTADMIN'), deleteUser)

module.exports = router