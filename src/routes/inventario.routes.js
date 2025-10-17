import { Router } from 'express'
import {
  getAllInventario,
  getInventarioById,
  updateInventario,
} from '../controllers/inventario.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Inventario
 *   description: Endpoints para la gestión del inventario
 */

/**
 * @swagger
 * /inventario:
 *   get:
 *     summary: Obtiene todo el inventario actual
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Lista completa del inventario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idInventario:
 *                         type: integer
 *                         example: 1
 *                       idProducto_producto:
 *                         type: integer
 *                         example: 3
 *                       cantidadTotal:
 *                         type: number
 *                         example: 150
 *                       idUnidad_unidad:
 *                         type: integer
 *                         example: 2
 *                       fechaFinal:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-10-31T00:00:00.000Z
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllInventario)

/**
 * @swagger
 * /inventario/{id}:
 *   get:
 *     summary: Obtiene un registro del inventario por su ID
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de inventario
 *     responses:
 *       200:
 *         description: Registro de inventario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     idInventario:
 *                       type: integer
 *                       example: 1
 *                     idProducto_producto:
 *                       type: integer
 *                       example: 3
 *                     cantidadTotal:
 *                       type: number
 *                       example: 150
 *                     idUnidad_unidad:
 *                       type: integer
 *                       example: 2
 *                     fechaFinal:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-31T00:00:00.000Z
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getInventarioById)

/**
 * @swagger
 * /inventario/{id}:
 *   put:
 *     summary: Actualiza un registro del inventario existente
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de inventario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto_producto
 *               - cantidadTotal
 *               - idUnidad_unidad
 *               - fechaFinal
 *             properties:
 *               idProducto_producto:
 *                 type: integer
 *                 example: 3
 *               cantidadTotal:
 *                 type: number
 *                 example: 200
 *               idUnidad_unidad:
 *                 type: integer
 *                 example: 2
 *               fechaFinal:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-01
 *     responses:
 *       200:
 *         description: Inventario actualizado correctamente
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
 *                   example: "Inventario actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     idInventario:
 *                       type: integer
 *                       example: 1
 *                     cantidadTotal:
 *                       type: number
 *                       example: 200
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateInventario)

export default router
