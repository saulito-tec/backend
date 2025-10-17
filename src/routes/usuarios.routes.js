import { Router } from 'express'
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUsuario:
 *                         type: integer
 *                       nombreUsuario:
 *                         type: string
 *                       apellidoPaterno:
 *                         type: string
 *                       apellidoMaterno:
 *                         type: string
 *                       permisoUsuario:
 *                         type: integer
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - apellidoPaterno
 *               - apellidoMaterno
 *               - permisoUsuario
 *               - password
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               apellidoPaterno:
 *                 type: string
 *               apellidoMaterno:
 *                 type: string
 *               permisoUsuario:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Faltan campos requeridos
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               apellidoPaterno:
 *                 type: string
 *               apellidoMaterno:
 *                 type: string
 *               permisoUsuario:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

router.post('/', createUsuario)
router.get('/', getAllUsuarios)
router.get('/:id', getUsuarioById)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
