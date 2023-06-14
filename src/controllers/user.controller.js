const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, password, role, name } = req.body;
  const newUser = await User.create({ username, password, role, name });
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: req.query.role || { $exists: true } });
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getStudents = async (req, res, next) => {
  req.query.role = "student";
  exports.getUsers(req, res, next);
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("No user found with that ID", 404));
  }
  if (req.params.role !== user.role) {
    return next(
      new ApiError(`No "${req.params.role}" found with that ID`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getStudent = async (req, res, next) => {
  req.params.role = "student";
  exports.getUser(req, res, next);
};
