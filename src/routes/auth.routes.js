import { Router } from 'express'
import { login } from '../controllers/auth.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con el inicio de sesión y autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - password
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     idUsuario:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     rol:
 *                       type: string
 *                       example: "admin"
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', login)

export default router
