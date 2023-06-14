const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const setCookieToken = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE_N * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("authToken", token, cookieOptions);
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError("Please provide username and password", 400));
  }

  const user = await User.findOne({ username }).select("+password");
  if (!user || !(await user.correctPassword(password))) {
    return next(new ApiError("Invalid username or password", 401));
  }
  const token = user.getSignedJwtToken();

  setCookieToken(res, token);

  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("authToken");
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.authToken) {
    token = req.cookies.authToken;
  } else {
    return next(new ApiError("You're not logged in.", 401));
  }

  const decodedObj = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decodedObj.id);
  if (!currentUser) {
    return next(new ApiError("This user no longer exists.", 410));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};
