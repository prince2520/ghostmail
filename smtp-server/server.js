const SMTPSERVER = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

require("dotenv").config();

const server = new SMTPSERVER({
    allowInsecureAuth: true,
    authOptional: true,

    onData(stream, session, cb) {
        stream.on('data', (data) => {
            simpleParser(data, async (err, parsed) => {
                try {
                    await fetch(
                        `${process.env.SERVERURL}/message/save-message`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(parsed),
                        }
                    );

                } catch (err) {
                    console.log(err);
                }

            });
        });
        stream.on('end', cb);
    }
});

server.listen(25, () => {
    console.log("Connected to SMTP Server!!")
});
