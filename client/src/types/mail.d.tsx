import { Message } from "./message.d";


export interface Mail {
    address: string;
    createdAt?: string;
    expires?: null | string;
    id: string;
    messages?: Message[];
    updatedAt?: string;
    userId?: string;
}

// MAIL SLICE TYPES -
export interface IMailSlice {
    currMailId: string | null;
    mails: Mail[];
}

// API MAIL
export interface AuthorizedGenerateGhostMailResponse extends Mail { };
export interface UnAuthorizedGenerateGhostMailResponse extends Mail { };
export interface GetMailResponse extends Mail { };

export interface NewMailResponse extends Mail {
    success: boolean,
    data: Mail,
    message: string,
    token?: string,
    isNotAuth?: boolean
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
    isChangeAddress: boolean,
    message: string
}