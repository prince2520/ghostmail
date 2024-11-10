const express = require("express");

const {
    getMail,
    createMail
} = require("../controllers/mail.controller.js")

const router = express.Router();

router.post('/get-mail', getMail);

router.post('/create-mail', createMail);

module.exports = router;