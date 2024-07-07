const sendEmail = require('./sendEmail')

const sendEmailToUser = async ({ name, email, message, subject }) => {
  return sendEmail({
    to: email,
    subject,
    html: `<h1>Dear user: ${name} !</h1> ${message}`
  })
}


module.exports = sendEmailToUser