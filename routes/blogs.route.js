const express = require("express");
const path = require("node:path");
const { readFile, writeFile } = require("../helpers/fs");

const blogRouter = express.Router();
const blogFilePath = path.join(__dirname, "..", "data", "blogs.json");
const userFilePath = path.join(__dirname, "..", "data", "users.json");

blogRouter.get("/api/blogs", (req, res) => {
  const blogs = readFile(blogFilePath) || [];
  const users = readFile(userFilePath) || [];

  const userId = req.query.userId ? Number(req.query.userId) : null;

  const blogsWithUser = blogs.map((blog) => {
    const user = users.find((u) => u.id === blog.userId);
    return {
      ...blog,
      name: user ? user.name : "Unknown User",
    };
  });

  res.render("blogs", { blogs: blogsWithUser, userId }); 
});

blogRouter.post("/api/blogs", (req, res) => {
  const { title, content, userId } = req.body;
  
  if (!title || !content || !userId) {
    return res.status(400).send("All fields are required!");
  }

  let blogs = readFile(blogFilePath) || [];
  const newBlog = {
    id: blogs.length ? blogs.at(-1).id + 1 : 1,
    title,
    content,
    userId: Number(userId),
    date: new Date().toISOString().split("T")[0],
  };

  blogs.push(newBlog);
  writeFile(blogFilePath, blogs);
  res.redirect("/api/blogs");
});

module.exports = blogRouter;
