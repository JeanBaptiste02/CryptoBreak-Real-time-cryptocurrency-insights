const Message = require("../models/message");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  const { content, username } = req.body;
  const newMessage = new Message({ content, username });

  try {
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
