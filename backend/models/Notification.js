const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    maxlength: 100,
    required: [true, 'Notification must be contain a subject text!']
  },
  message: {
    type: String,
    maxlength: 1000,
    required: [true, 'Notification must be contain a message!']
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Notification', NotificationSchema)