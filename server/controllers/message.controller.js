const Mail = require("../models/mail.model").Mail();
const Message = require("../models/message.model").Message();
const User = require("../models/user.model").User();

const MessageFrom = require("../models/message.model").MessageFrom();

exports.saveMessage = async (req, res, next) => {
    console.log("Req.body => ", req.body);
    // try {
    //     const address = req.body.to.value[0].address;
    //     const mailFromAddress = req.body.from.value[0].address;

    //     let mailFound = await Mail.findOne({where: { address: address }});
    //     let messageFrom = await MailFrom.findOne({ address: mailFromAddress })

    //     if (!mailFound) {
    //         mailFound = await User.create({
    //             address: address
    //         });
    //     }

    //     if (!messageFrom) {
    //         messageFrom = await User.create({
    //             address: mailFromAddress,
    //             name: req.body.from?.value[0].name
    //         });
    //     }

    //     const data = {
    //         from: {
    //             address: req.body.from.value[0].address,
    //             name: req.body.from?.value[0].name
    //         },
    //         to: mailFound.id,
    //         subject: req.body.subject,
    //         text: req.body.text,
    //         time: new Date(req.body.date)
    //     };

    //     const createMessage = new Message(data);
    //     await createMessage.save();

    //     mailFound.messages?.push(createMessage);

    //     await mailFound.save();
    // } catch (err) {
    //     console.log(err);
    //     next(err);
    // }
}
