const { APP_PORT } = require("./config/app.config");
const express = require("express");
const createTables = require("./models/db");
const app = express();
const userRouter = require("./routes/users.route");
const path = require("path");
const blogRouter = require("./routes/blogs.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

createTables()
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use("/", userRouter);
app.use("/", blogRouter);

app.all("/*", (_, res) =>{
  res.redirect("/api/registration")
})

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
});
