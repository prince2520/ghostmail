const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { OAuth2Client } = require('google-auth-library');

const { Mail, User } = require("../services/connectDB").db;

const client = new OAuth2Client();


/*
  Method - POST 
 
  This is function help user to signup and store data in database  
*/
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

    // create an encrypted password from input password
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


// Generate token which valid for a period of time
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

/*
  Method - POST 
 
  This is function is verify the email and password of user, and give a verified token and user data as response 
*/
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

    if (userFound.isGoogleAuth) {
      let error = new Error("Authenticate with google with this email!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    // compare the input and encrypted password of user 
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


/*
  Method - POST 
 
  This is function handle google authentication login user if not user found then create user and generate verified token 
*/
exports.googleAuthentication = async (req, res, next) => {
  const googleToken = {
    idToken: req.body.credential,
    audience: req.body.clientId,
  };

  try {

    const ticket = await client.verifyIdToken(googleToken);

    const payload = ticket.getPayload();

    const { name, email } = payload;
    console.log('payload ', payload);

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


    return res.status(StatusCodes.OK).json({
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