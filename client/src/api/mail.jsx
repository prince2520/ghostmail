// Method - Description

// GET - generate a new mail 
export const generateGhostMail = async (mailAdminAddress) => {
    console.log("server url : ", import.meta.env.VITE_API_SERVER_URL)
    const result = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/mail/generate-new-mail?mailAdminAddress=${mailAdminAddress}`,
    );

    console.log("Generate ghost mail Result : ", result.json());
    return result.json();
  };