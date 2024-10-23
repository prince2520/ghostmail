const express = require("express");

const {
    getMail
} = require("../controllers/mail.controller.js")

const router = express.Router();

router.post('/get-mail', getMail);

module.exports = router;