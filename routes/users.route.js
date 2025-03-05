const { Router } = require("express");
const { readFile, wrtieFile } = require("../helpers/fs");
const path = require("node:path");
const userRouter = Router();

userRouter.get("/", (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "blog.json");
    const users = readFile(filePath);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Xatolik yuz berdi!" });
  }
});

userRouter.post("/", (req, res) => {
  const { name, email } = req.body;
  const filePath = path.join(__dirname,"..", "data", "blog.json");
  const users = readFile(filePath);
  const foundedUser = users.find((u) => u.name === name && u.email === email);

  if (foundedUser) {
    res.status(409).send({
      message: "This name or email already taken!",
    });
    return;
  }
  const newUser = {
    id: users.at(-1)?.id + 1 || 1,
    name,
    email,
  };
  users.push(newUser);
  wrtieFile(filePath, users);
  res.status(201).send({
    message: "User created!",
    data: newUser,
  });
});

// export
module.exports = userRouter;
