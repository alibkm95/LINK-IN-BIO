const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}

const isTokenValid = ( token ) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } })
  const refreshTokenJWT = createJWT({payload: {user, refreshToken}})

  const longEXP = 1000 * 60 * 60 * 24 * 30
  const shortEXP = 1000 * 60 * 60 * 24 * 2

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + shortEXP),
    signed: true,
    sameSite: 'strict',
    path: '/',
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + longEXP),
    signed: true,
    sameSite: 'strict',
    path: '/',
  })
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
