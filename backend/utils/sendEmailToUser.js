const sendEmail = require('./sendEmail')

const sendEmailToUser = async ({ name, email, message, subject }) => {

  const text = `
    <p style="font-size: 35px; font-weight: 700;">
    ${message}
    </p>
    `

  return sendEmail({
    to: email,
    subject,
    html: `<h1>Dear user: ${name} !</h1> ${text}`
  })
}


module.exports = sendEmailToUser