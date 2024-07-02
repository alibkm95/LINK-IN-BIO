const mongoose = require('mongoose')
const nanoId = require('nanoid')

const LinkSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  longLink: {
    type: String,
    required: [true, 'original link must be provided!']
  },
  shortLink: {
    type: String,
    default: () => { return nanoId(12) }
  },
  clicks: {
    type: Number,
    default: 0
  },
  isAgeRestric: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isShowInProfile: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Link', LinkSchema)