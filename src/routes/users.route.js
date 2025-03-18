const { Router } = require("express");
const {
  renderLogin,
  login,
  renderRegistration,
  registration,
} = require("../controllers/users.controller");

const userRouter = Router();

userRouter
  .get("/api/login", renderLogin)
  .post("/api/login", login)
  .get("/api/registration", renderRegistration)
  .post("/api/registration", registration);

// Export
module.exports = userRouter;
