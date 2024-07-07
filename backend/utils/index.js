const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const sendVerificationCode = require('./sendVerificationCode')
const sendResetPasswordCode = require('./sendResetPasswordCode')
const sendEmailToUser = require('./sendEmailToUser')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationCode,
  sendResetPasswordCode,
  sendEmailToUser
}