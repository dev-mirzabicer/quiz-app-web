require("dotenv").config({ path: "back.env" });

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: ", err);
  console.log(err.message);
  console.log("Exiting process");
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (rej) => {
  console.log("Unhandled Rejection:", rej);
  console.log("Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
