const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model").User();
console.log("user", User)

const { StatusCodes } = require("http-status-codes");

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

    const userCount = await User.count({ where: { email: email}});

    if (userCount>0) {
      let error = new Error("User with this email already exists");
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
      .json({ success: true, message: "User Created" });

  } catch (err) {
    next(err);
  }
};

// POST - Login
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userFound = await User.findOne({ email: email }).select("+password");

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
      const loadedUser = await User.findOne({ email: email })
        .populate({
          path: "privates",
          populate: [{ path: "messages", populate: "user" }, "users"],
        })
        .populate({
          path: "groups",
          populate: [
            { path: "blockList", populate: "user" },
            { path: "messages", populate: "user" },
          ],
        });

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5h" }
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        token: token,
        user: loadedUser,
      });
    }
  } catch (err) {
    next(err);
  }
};