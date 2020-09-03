const mongoose = require('mongoose');
const User = require('./User');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
});

module.exports = Group = mongoose.model('group', GroupSchema);
