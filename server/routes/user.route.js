const express = require("express");

const {
    fetchUserData
} = require("../controllers/user.controller");
const isAuth = require("../middleware/isAuth.middleware");

const router = express.Router();

router.get('/user-data', isAuth, fetchUserData);

module.exports = router;