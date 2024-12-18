const express = require("express");

const {
    saveMessage,
    deleteMessage
} = require("../controllers/message.controller")

const router = express.Router();

router.post('/save-message', saveMessage);
router.delete('/delete-message', deleteMessage);

module.exports = router;