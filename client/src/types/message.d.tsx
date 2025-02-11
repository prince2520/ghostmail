export interface Message {
    createdAt: string;
    id: string;
    mailId: string;
    messageFrom:
    {
        address: string;
        createdAt: string;
        id: string;
        name: string;
        updatedAt: string;
    }
    messageFromId: string;
    subject: string;
    text: string;
    updatedAt: string;
}

// API RESPONSE 
export interface DeleteMessageResponse {
    success : boolean, 
    mailId : string,
    messageId : string,
    message : string
}
