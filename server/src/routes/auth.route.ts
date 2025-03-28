import express from "express";

import {
    signup,
    login,
    googleAuthentication
} from "../controllers/auth.controller";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post("/google-auth", googleAuthentication);

export default router;