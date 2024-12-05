// Method - Description

// POST - generate a new mail for authorized user
export const authorizedGenerateGhostMail = async (token) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/auth-generate-new-mail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    }
  );

  return result.json();
};

// GET - generate a new mail for unauthorized user
export const unauthorizedGenerateGhostMail = async () => {

  const result = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/generate-new-mail`,
  );

  return result.json();
};


// GET - MAIL DATA
export const mailData = async (token, mailAddress) => {

  const result = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/mail/get-mail-data?mailAddress=${mailAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    }
  );
  return result.json();
};
