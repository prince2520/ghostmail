const SMTPSERVER = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

require("dotenv").config();

const server = new SMTPSERVER({
    allowInsecureAuth: true,
    authOptional: true,
    

    onData(stream, session, cb) {
        let emailData = '';

        stream.on('data', (data) => {
            emailData += data.toString(); // Accumulate email data into a single string
        });

        stream.on('end', () => {
            simpleParser(emailData, async (err, parsed) => {
                if (err) {
                    console.error('Error parsing email:', err);
                    return;
                }

                try {
                    // Send the parsed email data once after it's fully received
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
                    console.error('Error sending email data:', err);
                }
            });

            cb(); // Call the callback to end the SMTP transaction
        });
    }
});

server.listen(25, () => {
    console.log("Connected to SMTP Server!!")
});
