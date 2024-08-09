const mongoose = require('mongoose')
const ClickRecord = require('./ClickRecord')
const shortId = require('shortid')

const LinkSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: null
  },
  longLink: {
    type: String,
    required: [true, 'original link must be provided!']
  },
  shortLink: {
    type: String,
    unique: [true, 'Short-link generator error!'],
    default: shortId.generate
  },
  clicks: {
    type: Number,
    default: 0
  },
  isAgeRestrict: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  showInProfile: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

LinkSchema.virtual('clickRecords', {
  ref: 'ClickRecord',
  localField: '_id',
  foreignField: 'link',
  justOne: false
})

LinkSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'link',
  justOne: false
})

module.exports = mongoose.model('Link', LinkSchema)