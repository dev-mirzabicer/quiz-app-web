const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");
const Quiz = require("./quiz.model");
const User = require("./user.model");

const solvedAnswerSchema = new mongoose.Schema({
  question:
    {
      title: {
        type: String,
        required: true,
      },
      answers: [
        {
          title: {
            type: String,
            required: true,
          },
          correct: {
            type: Boolean,
            default: false,
          },
        },
      ],
    } | String,
  answer:
    {
      title: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        default: false,
      },
    } | String,
});

const solvedQuizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    answers: [solvedAnswerSchema],
    isComplete: {
      type: Boolean,
      default: false,
    },
    score: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

solvedQuizSchema.pre("save", async function (next) {
  if (this.isComplete) {
    try {
      const user = await User.findById(this.user);
      user.solvedQuizzes++;
      await user.save();
    } catch {
      next();
    }
  }
  next();
});

solvedQuizSchema.pre("save", async function (next) {
  const quiz = await Quiz.findById(this.quiz.toString());
  this.answers.forEach((answer, index) => {
    const question = quiz.questions.find((q) => {
      return q._id.toString() === answer.question;
    });
    if (!question) {
      next(new ApiError("Question does not belong to this quiz", 400));
    }
    const ans = question.answers.find(
      (a) => a._id.toString() === answer.answer
    );
    this.answers[index].answer = ans;
    this.answers[index].question = question;
  });
  if (this.answers.length !== quiz.questions.length) {
    quiz.questions.forEach((question) => {
      if (
        !this.answers.find(
          (a) =>
            a.question?._id.toString() === question._id.toString() ||
            a.question === question._id.toString()
        )
      ) {
        this.answers.push({
          question,
          answer: null,
        });
      }
    });
  }
  this.score = -1;
  if (this.isComplete) {
    this.score =
      (this.answers.reduce((acc, cur) => {
        if (cur.answer?.correct) {
          return acc + 1;
        }
        return acc;
      }, 0) *
        100) /
      this.answers.length;
    const quiz = await Quiz.findById(this.quiz);
    quiz.questions.forEach((question) => {
      if (
        !this.answers.find(
          (a) =>
            a.question?._id.toString() === question._id.toString() ||
            a.question === question._id.toString()
        )
      ) {
        this.answers.push({
          question,
          answer: null,
        });
      }
    });
  }
  next();
});

const SolvedQuiz = mongoose.model("SolvedQuiz", solvedQuizSchema);

module.exports = SolvedQuiz;
