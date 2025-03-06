const { Router } = require("express");
const { readFile, writeFile } = require("../helpers/fs");
const path = require("node:path");

const userRouter = Router();

userRouter.get("/api/login", (req, res) => {
  res.render("login");
});

userRouter.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email va parolni to'ldiring!" });
  }

  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readFile(filePath);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).send({ message: "Email yoki parol noto'g'ri!" });
  }

  res.redirect(`/api/blogs`); 
});


userRouter.get("/api/registration", (req, res) => {
  res.render("registration");
});

userRouter.post("/api/registration", (req, res) => {
  const { name, email, password } = req.body;
  

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Barcha maydonlarni to‘ldiring!" });
  }

  const filePath = path.join(__dirname, "..", "data", "users.json");
  const users = readFile(filePath);

  const foundedUser = users.find((u) => u.email === email);

  if (foundedUser) {
    return res
      .status(409)
      .send({ message: "Bu email allaqachon ro‘yxatdan o‘tgan!" });
  }

  const newUser = {
    id: users.at(-1)?.id + 1 || 1,
    name,
    email,
    password,
  };

  users.push(newUser);
  writeFile(filePath, users);

  res.redirect(`/api/blogs`); 
});


// Export
module.exports = userRouter;
