const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
  link: {
    type: mongoose.Types.ObjectId,
    ref: 'Link',
    required: [true, 'subject link must be provided!']
  },
  email: {
    type: String,
    required: [true, 'Email must be provided!']
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, 'Please describe the link issues.']
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Report', ReportSchema)