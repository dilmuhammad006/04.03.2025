const pool = require("../config/db.config");

async function createTables() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(50),
                password VARCHAR(50)
            );

            CREATE TABLE IF NOT EXISTS blogs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                content TEXT,
                date TIMESTAMP DEFAULT NOW(),
                user_id INT NOT NULL
                REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
            );
        `);
    return "Database ichida table yaratildi ✅";
  } catch (error) {
    throw new Error("Jadval yaratishda xatolik ⚠️: " + error.message);
  }
}

module.exports = createTables;
