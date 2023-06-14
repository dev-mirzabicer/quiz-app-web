const solvedQuizController = require("../controllers/solvedQuiz.controller");
const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("teacher", "admin"),
    solvedQuizController.getSolvedQuizzes
  )
  .post(
    authController.protect,
    authController.restrictTo("student"),
    solvedQuizController.createSolvedQuiz
  );

router
  .route("/my/:id")
  .get(
    authController.protect,
    authController.restrictTo("student"),
    solvedQuizController.getMyQuiz
  )
  .patch(
    authController.protect,
    authController.restrictTo("student"),
    solvedQuizController.updateSolvedQuiz
  );

router
  .route("/my")
  .get(
    authController.protect,
    authController.restrictTo("student"),
    solvedQuizController.getMyQuizzes
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("teacher", "admin"),
    solvedQuizController.getSolvedQuiz
  );

module.exports = { path: "solved-quiz", router };
