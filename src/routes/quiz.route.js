const quizController = require("../controllers/quiz.controller");
const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router
  .route("/")
  .get(authController.protect, quizController.getQuizzes)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    quizController.createQuiz
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("teacher", "admin"),
    quizController.getQuiz
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    quizController.deleteQuiz
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    quizController.updateQuiz
  );

module.exports = { path: "quiz", router };
