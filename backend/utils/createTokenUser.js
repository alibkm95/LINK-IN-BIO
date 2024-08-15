const createTokenUser = (user) => {
  return { username: user.username, userId: user._id, role: user.role, email: user.email, profileImg: user.profileImg, coverImg: user.coverImg, bio: user.bio }
}

module.exports = createTokenUser