const SolvedQuiz = require("../models/solvedQuiz.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const Quiz = require("../models/quiz.model");

exports.getSolvedQuizzes = catchAsync(async (req, res, next) => {
  const user = req.query.userId;
  const solvedQuizzes = await SolvedQuiz.find({
    user: user || { $exists: true },
    isComplete: true,
  })
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "quiz",
      select: "title",
    });
  res.status(200).json({
    status: "success",
    results: solvedQuizzes.length,
    data: {
      solvedQuizzes,
    },
  });
});

exports.getSolvedQuiz = catchAsync(async (req, res, next) => {
  const solvedQuiz = await SolvedQuiz.findById(req.params.id)
    .populate({
      path: "user",
    })
    .populate({
      path: "quiz",
      select: "title",
    });
  if (!solvedQuiz) {
    return next(new ApiError("No solved quiz found with that ID", 404));
  }
  if (!solvedQuiz.isComplete) {
    return next(new ApiError("This quiz is not complete", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      solvedQuiz,
    },
  });
});

exports.createSolvedQuiz = catchAsync(async (req, res, next) => {
  const { quiz, answers, isComplete } = req.body;
  const user = req.user._id;
  if (!quiz) {
    return next(new ApiError("Please provide a quiz", 400));
  }

  if (!Quiz.findById(quiz)) {
    return next(new ApiError("No quiz found with that ID", 404));
  }

  const solvedQuiz = await SolvedQuiz.create({
    user,
    quiz,
    answers,
    isComplete,
  });
  res.status(201).json({
    status: "success",
    data: {
      solvedQuiz,
    },
  });
});

exports.updateSolvedQuiz = catchAsync(async (req, res, next) => {
  const { answers, isComplete } = req.body;
  const solvedQuiz = await SolvedQuiz.findById(req.params.id);
  if (!solvedQuiz) {
    return next(new ApiError("No solved quiz found with that ID", 404));
  }
  if (solvedQuiz.isComplete) {
    return next(new ApiError("Cannot update completed quiz", 403));
  }
  solvedQuiz.answers = answers || solvedQuiz.answers;
  solvedQuiz.isComplete = isComplete || solvedQuiz.isComplete;
  await solvedQuiz.save();
  res.status(200).json({
    status: "success",
    data: {
      solvedQuiz,
    },
  });
});

exports.getMyQuizzes = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  let filter = { user };
  if (req.query.quizId) {
    filter.quiz = req.query.quizId;
  }
  const solvedQuizzes = await SolvedQuiz.find(filter)
    .select("quiz isComplete score")
    .populate({
      path: "quiz",
      select: "title",
    });

  res.status(200).json({
    status: "success",
    results: solvedQuizzes.length,
    data: {
      solvedQuizzes,
    },
  });
});

exports.getMyQuiz = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const foundWithId = await SolvedQuiz.findById(req.params.id);
  if (!foundWithId) {
    return next(new ApiError("No quiz found with that ID", 404));
  }
  let selectCorrect = true;
  if (!foundWithId.isComplete) {
    selectCorrect = false;
  }
  const solvedQuiz = await SolvedQuiz.findOne({
    user: user || { $exists: true },
    _id: req.params.id,
  })
    .select(
      `${
        selectCorrect
          ? "-user"
          : "-answers.question.answers.correct -answers.answer.correct -user"
      }`
    )
    .populate({
      path: "quiz",
      select: "title",
    });
  if (!solvedQuiz) {
    return next(new ApiError("This quiz does not belong to you.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      solvedQuiz,
    },
  });
});
