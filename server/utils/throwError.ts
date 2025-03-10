import { CustomError } from "../types/controllers/error";

export const throwError = (message: string, statusCode: number) => {
  let error: CustomError = new Error(message);
  error.statusCode = statusCode;
  throw error;
}