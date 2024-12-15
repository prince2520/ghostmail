const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../services/connectDB").db;

const { StatusCodes } = require("http-status-codes");
const { Mail } = require("../services/connectDB").db;

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

// POST - Login
exports.login = async (req, res, next) => {

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

      const token = jwt.sign(
        {
          email: userFound.email,
          userId: userFound.id,
          isAuthUser: true
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );

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

exports.handleGoogleCallback = (req, res, next) => {
  console.log("handleGoogleCallBack -> ", req.user)
  try {
    const data = {
      googleId: req.user.googleId,
      email: req.user.email,
      userId: req.user.id,
      isAuthUser: true,
      isGoogleAuth: true
    };

    console.log("Data -> ", data);
    const token = jwt.sign(data,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" });

    return res.status(StatusCodes.OK).json({
      message: "Login successful!",
      token,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};