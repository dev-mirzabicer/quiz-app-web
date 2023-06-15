const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const errorHandler = require("./middlewares/errorHandler.middleware");
const useRoutes = require("./routes");
const ApiError = require("./utils/apiError");

const app = express();

// Global Middleware
app.use(helmet());
// app.use(cors({ origin: "https://dev-mirzabicer.github.io" }));
// app.options("/*", (_, res) => {
//   res.sendStatus(200);
// });
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(cookieParser());

//Route'lar ve Bilinmeyen URL'ler için Middleware
useRoutes(app);
app.all("*", (req, res, next) => {
  next(new ApiError(`Page not found: ${req.url}`, 404));
});

// Global Error Handler
app.use(errorHandler);

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
    process.exit(1);
  });

module.exports = app;
