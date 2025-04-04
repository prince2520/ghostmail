import express from "express";

import {
    getUser
} from "../controllers/user.controller";

import {isAuth} from "../middleware/isAuth.middleware";

const router = express.Router();

router.get('/get-user', isAuth, getUser);

export default router;