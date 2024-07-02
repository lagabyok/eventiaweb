const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../../db/dbconnection");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      const user = rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
};
