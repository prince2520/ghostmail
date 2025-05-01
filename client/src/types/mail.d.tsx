import { Message } from "./message.d";


export interface Mail {
    address: string;
    createdAt: string;
    expires: null | string;
    id: string;
    messages: Message[];
    updatedAt: string;
    userId?: string;
}

// MAIL SLICE TYPES -
export interface IMailSlice {
    currMailId: string;
    mails: Mail[];
}

export interface CreateMailResponse {
    success: boolean,
    data: Mail,
    message: string,
    token: string,
    isAuth: boolean
}


export interface DeleteMailResponse {
    success: boolean,
    mailId: string,
    message: string
};

export interface ChangeMailAddressResponse {
    success: boolean,
    mailId: string,
    updatedMailAddress: string,
    message: string
}