const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.route("/login").post(authController.login);
router.route("/logout").post(authController.protect, authController.logout);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUsers
  )
  .post(userController.createUser);
// ⬆ Bu ozelligi yeni kullanici eklemek isterseniz diye koydum, normalde guvelik sorunlari cikaracak bir ozellik.

router
  .route("/student")
  .get(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    userController.getStudents
  );

router
  .route("/student/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    userController.getStudent
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUser
  );

module.exports = { path: "user", router };
