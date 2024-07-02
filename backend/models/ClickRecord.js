const mongoose = require('mongoose')

const ClickRecordSchema = new mongoose.Schema({
  link: {
    type: mongoose.Types.ObjectId,
    ref: 'Link',
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ClickRecord', ClickRecordSchema)