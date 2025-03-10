import express from "express";

import {
    fetchUserData
} from "../controllers/user.controller";

import {isAuth} from "../middleware/isAuth.middleware";

const router = express.Router();

router.get('/user-data', isAuth, fetchUserData);

export default router;