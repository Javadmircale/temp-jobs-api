require("dotenv").config();
require("express-async-errors");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("rate-limiter");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const { authRouter, jobsRouter } = require("./routes");
// error handler
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
  authenticated,
} = require("./middleware");

// extra packages
app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticated, jobsRouter);
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
