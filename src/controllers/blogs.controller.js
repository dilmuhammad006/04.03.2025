const pool = require("../config/db.config");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await pool.query(`SELECT * FROM blogs`);
    const users = await pool.query(`SELECT * FROM users`);

    const userId = req.query.userId ? Number(req.query.userId) : null;

    const blogsWithUser = blogs.rows.map((blog) => {
      const user = users.rows.find((u) => u.id === blog.user_id);
      return {
        ...blog,
        name: user ? user.name : "Unknown User",
      };
    });

    res.render("blogs", { blogs: blogsWithUser, userId });
  } catch (error) {
    res.status(500).send("Server xatosi!");
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).send("Barcha maydonlarni to'ldiring!");
    }
    const newBlog = await pool.query(
      `INSERT INTO blogs (title, content, user_id, date) 
       VALUES ($1, $2, $3, NOW()) RETURNING id`,
      [title, content, Number(userId)]
    );

    res.redirect(`/api/blogs?userId=${userId}`);
  } catch (error) {
    res.status(500).send("Server xatosi!");
  }
};
