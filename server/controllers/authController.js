const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios" });
    }

    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    // comparar password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    //JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: error.message });
  }
};

const modifyPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Falta contraseña actual o nueva." });
    }

    // obtener admin con contraseña actual
    const [[admin]] = await pool.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (!admin) {
      return res.status(404).json({ error: "Admin no encontrado." });
    }

    // comparar la contraseña actual
    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);

    // si contraseña actual es incorrecta
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "La contraseña actual es incorrecta." });
    }

    // si es valida encriptar la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    //actualizzar la contraseña
    await pool.query("UPDATE admin SET password = ? WHERE email = ?", [
      hashedNewPassword,
      email,
    ]);

    res.json({ message: "Contraseña cambiada correctamente." });
  } catch (error) {
    console.error("Error en changePassword:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  login,
  modifyPassword,
};
