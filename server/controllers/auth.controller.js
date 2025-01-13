const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../services/connectDB").db;

const { StatusCodes } = require("http-status-codes");
const { Mail } = require("../services/connectDB").db;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

// POST -> Sign Up
exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    if (password !== confirmPassword) {
      let error = new Error("Confirm password and password are not matched!");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const userCount = await User.count({ where: { email: email } });

    if (userCount > 0) {
      let error = new Error("User with this email already exists!!");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    if (!hashedPw) {
      let error = new Error(err.message);
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    await User.create({
      name: name,
      email: email,
      password: hashedPw
    });

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "User Created!" });

  } catch (err) {
    next(err);
  }
};

const generateToken = ({
  email,
  userId,
  isAuthUser
}) => {

  return jwt.sign(
    {
      email,
      userId,
      isAuthUser
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
}

// POST - Login
exports.login = async (req, res, next) => {
  console.log("Req.user", req.user);

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
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, userFound.password);

    if (!isEqual) {
      let error = new Error("Password incorrect!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;

    } else {
      const token = generateToken({
        email: userFound.email,
        userId: userFound.id,
        isAuthUser: true
      });

      return res.status(StatusCodes.OK).json({
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

exports.googleAuthentication = async (req, res, next) => {
  const googleToken = {
    idToken: req.body.credential,
    audience: req.body.clientId,
  };

  console.log(" Google authentication ");

  try {

    const ticket = await client.verifyIdToken(googleToken);

    const payload = ticket.getPayload();

    const { given_name, email } = payload;

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
        name: given_name,
        email: email,
        isGoogleAuth: true
      });
    };

    const token = generateToken({
      email: userFound.email,
      userId: userFound.id,
      isAuthUser: true
    });


    return res.status(StatusCodes.OK).json({
      user: req.user,
      success: true,
      token: token,
      message: "Google authentication successfully!",
      data: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        mails: userFound.mails
      }
    });
  } catch (error) {
    next(error);
  }
};