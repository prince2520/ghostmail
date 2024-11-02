const Mail = require("../models/mail.model");
const Message = require("../models/message.model")

exports.getMail = async (req, res, next) => {
    try {
        const address = req.body.to.value[0].address;

        let mailFound = await Mail.findOne({address: address});

        if(!mailFound){
            mailFound = new Mail({
              address : address 
            });

            await mailFound.save();
        }

        const data = {
            from: {
                address: req.body.from.value[0].address,
                name: req.body.from?.value[0].name
            },
            to : mailFound._id,
            subject: req.body.subject,
            text: req.body.text,
            time: new Date(req.body.date)
        };

        const createMessage =  new Message(data);
        await createMessage.save();

        mailFound.messages?.push(createMessage);

        await mailFound.save();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
