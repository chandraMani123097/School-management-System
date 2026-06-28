const db = require("../config/db");

const User = {
  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",

      [email],
    );

    return rows[0];
  },

  async create(user) {
    return db.query(
      `INSERT INTO users
            (name,email,password,role)
            VALUES(?,?,?,?)`,

      [user.name, user.email, user.password, user.role],
    );
  },
};

module.exports = User;
