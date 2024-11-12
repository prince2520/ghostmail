const express = require("express");

const {
    createMail
} = require("../controllers/mail.controller.js")

const router = express.Router();

router.post('/create-mail', createMail);

module.exports = router;