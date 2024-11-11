const SMTPSERVER = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

require("dotenv").config();

const server = new SMTPSERVER({
    allowInsecureAuth: true,
    authOptional: true,

    onData(stream, session, cb) {
        stream.on('data', (data) => {
            simpleParser(data, async (err, parsed) => {
               
                const data = {
                    headers: parsed.headers,
                    subject: parsed.subject,
                    from: parsed.from,
                    to: parsed.to,
                    cc: parsed.cc,
                    bcc: parsed.bcc,
                    date: parsed.date,
                    messageId: parsed.messageId,
                    inReplyTo: parsed.inReplyTo,
                    references: parsed.references,
                    html: parsed.html,
                    text: parsed.text,
                    textAsHtml: parsed.textAsHtml,
                    attachments: parsed.attachments
                }

                try {
                    await fetch(
                        `${process.env.SERVERURL}/message/save-message`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
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
