import express from "express";

import{
    generateNewGhostMail,
    authorizedGenerateGhostMail,
    getMailData,
    deleteMail,
    changeAddress
} from "../controllers/mail.controller";

import {isAuth} from "../middleware/isAuth.middleware";

const router = express.Router();

router.get('/get-mail-data', isAuth, getMailData);
router.delete('/delete-mail', isAuth, deleteMail);
router.get('/generate-new-mail', generateNewGhostMail);
router.patch('/change-address', isAuth, changeAddress);
router.get('/auth-generate-new-mail', isAuth, authorizedGenerateGhostMail);


export default router;