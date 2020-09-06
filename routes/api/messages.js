const express = require('express');
const User = require('../../models/User');

const Conversation = require('../../models/Conversation');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Message = require('../../models/Message');

// @route POST api/conversations/
// @desc Get All My Coversations
router.post('/', async (req, res) => {
  const { id } = req.body;

  try {
    let user = await User.findOne({ _id: id });

    // Checks if user with username present
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    let conversations = await Conversation.find({ members: { $in: id } });

    return res.json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route POST api/conversations/messages
// @desc Get All My Messages in a convo
router.post('/messages/', async (req, res) => {
  const { id, conversationId } = req.body;

  try {
    let user = await User.findOne({ _id: id });

    // Checks if user with username present
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    let messages = await Message.find({ conversationId: conversationId });

    return res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route POST api/conversations/messages/new
// @desc Send a Message
router.post('/messages/new', async (req, res) => {
  const { id, conversationId, msgText } = req.body;

  try {
    let user = await User.findOne({ _id: id });

    // Checks if user with username present
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    let message = new Message({
      senderId: id,
      conversationId: conversationId,
      msgText: msgText,
    });

    await message.save();

    return res.json('Added');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route POST api/conversations/new
// @desc Create New Coversations
router.post('/new', async (req, res) => {
  const { id, members } = req.body;

  try {
    let user = await User.findOne({ _id: id });

    // Checks if user with username present
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    let listOfMembers = members;
    listOfMembers.push(id);
    // members = listOfMembers;
    let conversation = new Conversation({
      members: listOfMembers,
    });

    let conversations = await Conversation.find({});
    await conversation.save();
    return res.json('temp');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
