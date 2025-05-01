import express from "express";

import{
    createUnAuthorizedMail,
    createAuthorizedMail,
    getMail,
    deleteMail,
    updatedMailAddress
} from "../controllers/mail.controller";

import {isAuth} from "../middleware/isAuth.middleware";

const router = express.Router();

router.get('/create-authorized-mail', isAuth, createAuthorizedMail);
router.get('/create-unauthorized-mail', createUnAuthorizedMail);
router.get('/get-mail', isAuth, getMail);
router.delete('/delete-mail', isAuth, deleteMail);
router.patch('/update-mail-address', isAuth, updatedMailAddress);


export default router;