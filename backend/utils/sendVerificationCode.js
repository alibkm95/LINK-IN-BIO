const sendEmail = require('./sendEmail')

const sendVerificationCode = async ({ name, email, verificationCode }) => {

  const message =
    `
    <p style="font-size: 35px; font-weight: 700;">You verification code is:</p>
    <p style="background-color: #059669; color: white; padding: 10px; border-radius: 5px; font-size: 25px; text-align: center; width: 200px">${verificationCode}</p>
    <p style="color: #e11d48; font-size: 25px;">Important: do not share this code with any one!</p>
    `

  return sendEmail({
    to: email,
    subject: 'email varification',
    html: `<h1>hi there ${name} !</h1> ${message}`
  })
}

module.exports = sendVerificationCode