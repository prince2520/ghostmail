import { throwError } from "./throwError";


// DELETE - delete message
export const deleteMessage = async (token, mailId, messageId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/message/delete-message`,
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
