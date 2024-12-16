import { throwError } from "./throwError";

// POST - generate a new mail for authorized user
export const fetchUserData = async (token) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/user/user-data`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        }
    );

    const result = throwError(response)

    return result;
};