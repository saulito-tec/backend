import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

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
    const user = await prisma.usuario.findFirst({
      where: {
        nombreUsuario: nombreUsuario
      },
      select: {
        idUsuario: true,
        nombreUsuario: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        permisoUsuario: true,
        hashPassword: true
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

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
