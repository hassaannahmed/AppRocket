const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation' },
  msgText: { type: String },
});

module.exports = Message = mongoose.model('message', MessageSchema);
