const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;

export const MAIL_ROUTES = {
    CREATE_AUTHORIZED_MAIL__ADDRESS: `${API_BASE_URL}/mail/create-authorized-mail`,
    CREATE_UNAUTHORIZED_MAIL__ADDRESS: `${API_BASE_URL}/mail/create-unauthorized-mail`,
    GET_MAIL__ADDRESS: `${API_BASE_URL}/mail/get-mail`,
    DELETE_MAIL__ADDRESS: `${API_BASE_URL}/mail/delete-mail`,
    UPDATE_MAIL_ADDRESS__ADDRESS: `${API_BASE_URL}/mail/update-mail-address`,
    DELETE_MESSAGE__ADDRESS: `${API_BASE_URL}/message/delete-message`,
};


export const USER_ROUTES = {
    GET_USER__ADDRESS: `${API_BASE_URL}/user/get-user`,
    
    LOGIN__ADDRESS: `${API_BASE_URL}/auth/login`,
    SIGNUP__ADDRESS: `${API_BASE_URL}/auth/signup`,
    GOOGLE_AUTH__ADDRESS: `${API_BASE_URL}/auth/google-auth`
};
