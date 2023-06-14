const Quiz = require("../models/quiz.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, questions, isPublished } = req.body;
  const newQuiz = await Quiz.create({
    title,
    questions,
    isPublished,
  });
  res.status(201).json({
    status: "success",
    data: {
      quiz: newQuiz,
    },
  });
});

exports.getQuizzes = catchAsync(async (req, res, next) => {
  let filter = { isPublished: true };
  if (req.user.role === "admin") {
    filter = {};
  }
  const quizzes = await Quiz.find(filter).select(
    "title questionNum isPublished"
  );
  res.status(200).json({
    status: "success",
    results: quizzes.length,
    data: {
      quizzes,
    },
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    return next(new ApiError("No quiz found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      quiz,
    },
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const { title, questions, isPublished } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  if (quiz.isPublished) {
    return next(new ApiError("Cannot update published quiz", 403));
  }
  if (!quiz) {
    return next(new ApiError("No quiz found with that ID", 404));
  }
  quiz.title = title || quiz.title;
  quiz.questions = questions || quiz.questions;
  quiz.isPublished = isPublished || quiz.isPublished;
  await quiz.save();
  res.status(200).json({
    status: "success",
    data: {
      quiz,
    },
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) {
    return next(new ApiError("No quiz found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
