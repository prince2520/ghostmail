import express from "express";

import {
    createMessage,
    deleteMessage
} from "../controllers/message.controller";

const router = express.Router();

router.post('/create-message', createMessage);
router.delete('/delete-message', deleteMessage);

export default router;