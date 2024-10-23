const SMTPSERVER = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

require("dotenv").config();

const server = new SMTPSERVER({
    allowInsecureAuth: true,
    authOptional: true,
    
    onData(stream, session, cb) {
        stream.on('data', (data) => {
            simpleParser(data, async (err, parsed) => {
                
                console.log("Parsed email data: ", parsed);
                console.log("Server Url", process.env.SERVERURL);

                try {
                    await fetch(
                        `${process.env.SERVERURL}/mail/get-mail`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(parsed),
                        }
                    );

                }catch(err){
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
