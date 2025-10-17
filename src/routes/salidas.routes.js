import { Router } from 'express'
import {
  getAllSalidas,
  getSalidaById,
  createSalida,
} from '../controllers/salidas.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Salidas
 *     description: Endpoints para la gestión de salidas de productos
 */

/**
 * @swagger
 * /salidas:
 *   get:
 *     summary: Obtener todas las salidas registradas
 *     tags: [Salidas]
 *     responses:
 *       200:
 *         description: Lista de salidas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Salida'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllSalidas)

/**
 * @swagger
 * /salidas/{id}:
 *   get:
 *     summary: Obtener una salida por su ID
 *     tags: [Salidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salida
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Salida obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Salida'
 *       404:
 *         description: Salida no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getSalidaById)

/**
 * @swagger
 * /salidas:
 *   post:
 *     summary: Crear una nueva salida
 *     tags: [Salidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario_usuario
 *               - idEntradaProducto_entradaProducto
 *               - idRazon_razon
 *               - fechaSalida
 *               - cantidadSalida
 *             properties:
 *               idUsuario_usuario:
 *                 type: integer
 *                 example: 1
 *               idEntradaProducto_entradaProducto:
 *                 type: integer
 *                 example: 2
 *               idRazon_razon:
 *                 type: integer
 *                 example: 3
 *               fechaSalida:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-16T00:00:00.000Z"
 *               cantidadSalida:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Salida creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Salida creada correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Salida'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createSalida)

export default router
