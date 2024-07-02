const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'email is already in use!'],
    required: [true, 'email must be provided']
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    unique: [true, 'username is already in use!'],
    required: [true, 'username must be provided']
  },
  profileImg: {
    type: String,
    default: null
  },
  coverImg: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: {
      values: ['USER', 'ADMIN', 'ROOTADMIN'],
      message: '{VALUE} is not a valid role'
    },
    default: 'USER'
  },
  password: {
    type: String,
    required: [true, 'password must be provided']
  },
  verificationCode: String,
  verificationCodeExpirationDate: Date,
  resetPasswordCode: String,
  resetPasswordCodeExpirationDate: Date,
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedIn: Date,
  isBanned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt)
  }

  if (this.isModified('verificationCode')) {
    this.verificationCode = await bcrypt.hash(this.verificationCode, salt)
  }

  if (this.isModified('resetPasswordCode')) {
    this.resetPasswordCode = await bcrypt.hash(this.resetPasswordCode, salt)
  }
})

UserSchema.methods.comparePassword = async function (insertedPassword) {
  const isMatch = await bcrypt.compare(insertedPassword, this.password)
  return isMatch
}

UserSchema.methods.compareVerificationCode = async function (insertedCode) {
  const isMatch = await bcrypt.compare(insertedCode, this.verificationCode)
  return isMatch
}

UserSchema.methods.compareResetCode = async function (insertedResetCode) {
  const isMatch = await bcrypt.compare(insertedResetCode, this.resetPasswordCode)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)