// Method - Description

// GET - generate a new mail 
export const generateGhostMail = async (mailAdminAddress) => {
    const result = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/mail/generate-new-mail?mailAdminAddress=${mailAdminAddress}`,
    );
    return result.json();
  };