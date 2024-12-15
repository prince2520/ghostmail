const express = require("express");

const {
    signup,
    login,
    handleGoogleCallback
} = require("../controllers/auth.controller");
const passport = require("passport");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google"),
    handleGoogleCallback
);

module.exports = router;