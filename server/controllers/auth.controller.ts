import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../services/connectDB";
import { StatusCodes } from "http-status-codes";
import { OAuth2Client } from 'google-auth-library';
import { Request, Response, NextFunction } from 'express';
import { throwError } from "../utils/throwError";
import { GoogleToken} from "../types/controllers/auth";

const { Mail, User } = db;

const client = new OAuth2Client();

/*
  Method - POST 
  This is function help user to signup and store data in database  
*/

export const signup   = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      throwError("Confirm password and password are not matched!", StatusCodes.BAD_REQUEST);
    }

    const userCount = await User.count({ where: { email: email } });

    if (userCount > 0) {
      throwError("User with this email already exists!!", StatusCodes.BAD_REQUEST);
    }

    // create an encrypted password from input password
    const hashedPw = await bcrypt.hash(password, 12);

    if (!hashedPw) {
      throwError("Error hashing password", StatusCodes.BAD_REQUEST);
    }

    await User.create({
      name: name,
      email: email,
      password: hashedPw
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "User Created!" });

  } catch (err) {
    next(err);
  }
};


// Generate token which valid for a period of time
const generateToken = ({
  email,
  userId,
  isAuthUser
}: { email: string, userId: string, isAuthUser: boolean }) => {

  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  return jwt.sign(
    {
      email,
      userId,
      isAuthUser
    },
    secretKey,
    { expiresIn: "24h" }
  );
}

/*
  Method - POST 
  This is function is verify the email and password of user, and give a verified token and user data as response 
*/
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userFound = await User.findOne({
      where: { email: email },
      include:
      {
        model: Mail,
        required: false
      }
    });

    if (!userFound) {
      throwError("User not found!", StatusCodes.NOT_FOUND);
    }

    if (userFound.isGoogleAuth) {
      throwError("Authenticate with google with this email!", StatusCodes.NOT_FOUND);
    }

    // compare the input and encrypted password of user 
    const isEqual = await bcrypt.compare(password, userFound.password);

    if (!isEqual) {
      throwError("Password incorrect!", StatusCodes.UNAUTHORIZED);
    } else {

      const token = generateToken({
        email: userFound.email,
        userId: userFound.id,
        isAuthUser: true
      });

      res.status(StatusCodes.OK).json({
        success: true,
        token: token,
        message: "Login Successfull!",
        data: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          mails: userFound.mails
        }
      });
    }
  } catch (err) {
    next(err);
  }
};


/*
  Method - POST 
 
  This is function handle google authentication login user if not user found then create user and generate verified token 
*/


export const googleAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const googleToken: GoogleToken = {
    idToken: req.body.credential,
    audience: req.body.clientId,
  };

  try {
    // verify client google token 
    const ticket = await client.verifyIdToken(googleToken);

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid token payload");
    }

    const { name, email } = payload;

    let userFound = await User.findOne({
      where: { email: email, isGoogleAuth: true },
      include:
      {
        model: Mail,
        required: false
      }
    });

    if (!userFound) {
      userFound = await User.create({
        name: name,
        email: email,
        isGoogleAuth: true
      });
    };

    const token = generateToken({
      email: userFound.email,
      userId: userFound.id,
      isAuthUser: true
    });


    res.status(StatusCodes.OK).json({
      success: true,
      token: token,
      message: "Login Successfull!",
      data: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        mails: userFound.mails || []
      }
    });

  } catch (error) {
    next(error);
  }
};