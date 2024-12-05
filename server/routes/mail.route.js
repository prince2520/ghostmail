const express = require("express");

const {
    generateNewGhostMail,
    authorizedGenerateGhostMail,
    getMailData
} = require("../controllers/mail.controller.js");

const isAuth = require("../middleware/isAuth.middleware.js")

const router = express.Router();

router.get('/generate-new-mail', generateNewGhostMail);

router.get('/auth-generate-new-mail', isAuth, authorizedGenerateGhostMail);

router.get('/get-mail-data', isAuth, getMailData);

module.exports = router;