const fs = require("fs");
const mongoose = require("mongoose");
const Quiz = require("../src/models/quiz.model");
const User = require("../src/models/user.model");
require("dotenv").config({ path: "back.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
    process.exit(1);
  });

const quizzes = JSON.parse(
  fs.readFileSync(`${__dirname}/quizzes.json`, "utf-8")
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

try {
  User.create(users.users).then(() => {
    Quiz.create(quizzes.quizzes).then(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  });
} catch (e) {
  console.error(e);
}
