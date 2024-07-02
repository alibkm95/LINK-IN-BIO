const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
  link: {
    type: mongoose.Types.ObjectId,
    ref: 'Link',
    required: [true, 'subject link must be provided!']
  },
  subject: {
    type: String,
    maxlength: 100,
    required: [true, 'report subject must be provided!']
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, 'report description must be provided!']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Report', ReportSchema)