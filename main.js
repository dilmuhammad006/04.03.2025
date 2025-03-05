const { APP_PORT } = require("./config/app.config");
const express = require("express");
const app = express();
const userRouter = require("./routes/users.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// import
app.use("/api/users", userRouter)

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
});
