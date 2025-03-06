const { APP_PORT } = require("./config/app.config");
const express = require("express");
const app = express();
const userRouter = require("./routes/users.route");
const blogRouter = require("./routes/blogs.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", userRouter);
app.use("/", blogRouter);

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
});
