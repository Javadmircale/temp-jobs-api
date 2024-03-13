const router = require("express").Router();
const { login, register } = require("../controllers/auth");

const apiLimiter = require("express-rate-limit")({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});
router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
module.exports = router;
