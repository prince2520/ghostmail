import { throwError } from "./throwError";

// POST -> Sign up
export const signup = async (name, email, password, confirmPassword) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    });

    const result = throwError(response);
    return result;
};

// POST -> Login
export const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });
    const result = throwError(response);
    return result;
}
