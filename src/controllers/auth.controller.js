import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body;

    // Validate input
    if (!nombreUsuario || !password) {
      return res.status(400).json({
        success: false,
        message: "Nombre de usuario y contraseña son requeridos"
      });
    }

    // Find user by nombreUsuario
    const [users] = await pool.query(
      "SELECT idUsuario, nombreUsuario, apellidoPaterno, apellidoMaterno, permisoUsuario, hashPassword FROM usuario WHERE nombreUsuario = ?",
      [nombreUsuario]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    const user = users[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.hashPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.idUsuario, 
        nombreUsuario: user.nombreUsuario,
        permisoUsuario: user.permisoUsuario
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Return success response
    res.json({
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user.idUsuario,
        nombreUsuario: user.nombreUsuario,
        nombreCompleto: `${user.nombreUsuario} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
        apellidoPaterno: user.apellidoPaterno,
        apellidoMaterno: user.apellidoMaterno,
        permisoUsuario: user.permisoUsuario
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};
