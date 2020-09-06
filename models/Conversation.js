const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  conversationName: {
    type: String,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
