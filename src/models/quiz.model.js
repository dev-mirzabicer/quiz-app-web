const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [questionSchema],
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
  questionNum: Number,
});

exports.questionSchema = questionSchema;
exports.answerSchema = answerSchema;

quizSchema.pre("save", function (next) {
  this.questionNum = this.questions.length;
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
