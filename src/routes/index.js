const quizRouter = require("./quiz.route");
const userRouter = require("./user.route");
const solvedQuizRouter = require("./solvedQuiz.route");

const apiURL = `/api/v${process.env.API_VERSION}`;

const apiRouters = [quizRouter, userRouter, solvedQuizRouter];

module.exports = (app) => {
  apiRouters.forEach((apiRouter) => {
    app.use(`${apiURL}/${apiRouter.path}`, apiRouter.router);
  });
};
