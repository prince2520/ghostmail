import express from "express";

import {
    saveMessage,
    deleteMessage
} from "../controllers/message.controller";

const router = express.Router();

router.post('/save-message', saveMessage);
router.delete('/delete-message', deleteMessage);

export default router;