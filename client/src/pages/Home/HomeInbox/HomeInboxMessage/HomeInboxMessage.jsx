

import { uid } from "uid";

const mails = [
    {
        id: uid(8),
        address: "temp1@ghostmails.site",
        subject: "Hello 1",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    },
    {
        id: uid(8),
        address: "temp2@ghostmails.site",
        subject: "Hello 2",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    },
    {
        id: uid(8),
        address: "temp1@ghostmails.site",
        subject: "Hello 3",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    }
];

const HomeInboxMessages = ({ messages }) => {
    return (
        <div>
            {messages.map(msg => <div key={msg.id}>
                <h1>{msg.subject}</h1>
                <p>{msg.text}</p>

            </div>)}

        </div>
    );
};

export default HomeInboxMessages;