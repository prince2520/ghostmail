const express = require("express");

const {
    generateNewGhostMail
} = require("../controllers/mail.controller.js")

const router = express.Router();

router.get('/generate-new-mail', generateNewGhostMail);

module.exports = router;