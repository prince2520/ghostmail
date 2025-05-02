// Method - Description
import { DeleteMessageResponse } from "@/types/message.d";
import {  ChangeMailAddressResponse, CreateMailResponse, DeleteMailResponse, Mail } from "@/types/mail.d";
import { throwError } from "../../utils/throwError";
import { MAIL_ROUTES } from "@/config/routes"; 

// POST - generate a new mail for authorized user
export const createAuthorizedMailAPI = async (token: string): Promise<CreateMailResponse> => {
  const response = await fetch(
    MAIL_ROUTES.CREATE_AUTHORIZED_MAIL__ADDRESS,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    }
  );

  const result = throwError(response);
  return result;
};

// GET - generate a new mail for unauthorized user
export const createUnAuthorizedMailAPI = async (): Promise<CreateMailResponse> => {
  const response = await fetch(
    MAIL_ROUTES.CREATE_UNAUTHORIZED_MAIL__ADDRESS,
  );

  const result = throwError(response);

  return result;
};


// GET - MAIL DATA
export const getMailAPI = async (token?: string, mailId?: string | null): Promise<Mail> => {
  const response = await fetch(
    MAIL_ROUTES.GET_MAIL__ADDRESS + `?mailId=${mailId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    }
  );

  const result = throwError(response);

  return result;
};

// GET - MAIL DATA
export const deleteMailAPI = async (token?: string, mailId?: string, mailAddress?: string): Promise<DeleteMailResponse> => {
  const response = await fetch(
    MAIL_ROUTES.DELETE_MAIL__ADDRESS,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        mailId: mailId,
        mailAddress: mailAddress
      }),
    }
  );
  const result = throwError(response);

  return result;
};



export const updateMailAddressAPI = async (token: string, mailId?: string, mailAddress?: string): Promise<ChangeMailAddressResponse> => {
  const response = await fetch(
    MAIL_ROUTES.UPDATE_MAIL_ADDRESS__ADDRESS,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        mailId: mailId,
        mailAddress: mailAddress
      }),
    }
  );

  const result = throwError(response);

  return result;
}


// DELETE - delete message
export const deleteMessageAPI = async (token:string, mailId:string, messageId:string) : Promise<DeleteMessageResponse> => {
  const response = await fetch(
    MAIL_ROUTES.DELETE_MESSAGE__ADDRESS,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        token, mailId, messageId
      })
    }
  );

  const result = throwError(response);
  return result;
};
