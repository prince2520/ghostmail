const express = require("express");

const {
    signup,
    login,
    googleAuthentication
} = require("../controllers/auth.controller");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/google-auth", googleAuthentication);

module.exports = router;