// Method - Description

import { AuthorizedGenerateGhostMailResponse, ChangeMailAddressResponse, DeleteMailResponse, GetMailResponse, UnAuthorizedGenerateGhostMailResponse } from "@/types/mail.d";
import { throwError } from "./throwError";

// POST - generate a new mail for authorized user
export const authorizedGenerateGhostMail = async (token: string): Promise<AuthorizedGenerateGhostMailResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/auth-generate-new-mail`,
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
export const unauthorizedGenerateGhostMail = async (): Promise<UnAuthorizedGenerateGhostMailResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/generate-new-mail`,
  );

  const result = throwError(response);

  return result;
};


// GET - MAIL DATA
export const mailData = async (token?: string, mailId?: string | null): Promise<GetMailResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/get-mail-data?mailId=${mailId}`,
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
export const deleteMail = async (token?: string, mailId?: string, mailAddress?: string): Promise<DeleteMailResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/delete-mail`,
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



export const changeMailAddress = async (token: string, mailId: string, mailAddress: string): Promise<ChangeMailAddressResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/change-address`,
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