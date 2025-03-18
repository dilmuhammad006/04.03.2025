const pool = require("../config/db.config");

exports.renderLogin = async (_, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email va parolni to'ldiring!" });
  }

  const users = await pool.query(`SELECT * FROM users`);
  const user = users.rows.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).send({ message: "Email yoki parol noto'g'ri!" });
  }

  res.redirect(`/api/blogs?userId=${user.id}`);
};

exports.renderRegistration = async (_, res) => {
  res.render("registration");
};

exports.registration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Barcha maydonlarni to'ldiring!" });
  }
  const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userCheck.rows.length > 0) {
    return res
      .status(409)
      .send({ message: "Bu email allaqachon ro'yxatdan o'tgan!" });
  }

  const newUser = await pool.query(
    `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id`,
    [name, email, password]
  );

  res.redirect(`/api/blogs?userId=${newUser.rows[0].id}`);
};
