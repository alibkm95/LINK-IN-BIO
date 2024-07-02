const CustomAPIError = require('./customAPIError')
const UnAuthenticatedError = require('./unAuthenticated')
const UnAuthorizedError = require('./unAuthorized')
const NotFoundError = require('./notFound')
const BadRequestError = require('./badRequest')
const InternalServerError = require('./internalServer')
module.exports = {
  CustomAPIError,
  UnAuthenticatedError,
  UnAuthorizedError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
}