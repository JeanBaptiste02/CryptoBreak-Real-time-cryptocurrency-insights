const express = require("express");
const router = express.Router();

const MessageCtrl = require("../controlleur/messageController");

router.get("/messages", MessageCtrl.getAllMessages);
router.post("/messages", MessageCtrl.createMessage);

module.exports = router;
