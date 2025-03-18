const { Router } = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blogs.controller");
const blogRouter = Router();

blogRouter
  .get("/api/blogs", getAllBlogs)
  .post("/api/blogs", createBlog);

module.exports = blogRouter;
