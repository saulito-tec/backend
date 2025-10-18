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
 * components:
 *   schemas:
 *     ProductoSalida:
 *       type: object
 *       required:
 *         - idProducto
 *         - cantidad
 *       properties:
 *         idProducto:
 *           type: integer
 *           description: ID del producto al que se le da salida
 *           example: 1
 *         cantidad:
 *           type: number
 *           description: Cantidad que se está dando de salida
 *           example: 3
 *
 *     SalidaProducto:
 *       type: object
 *       properties:
 *         idSalidaProducto:
 *           type: integer
 *           example: 1
 *         idUsuario:
 *           type: integer
 *           example: 1
 *         idRazon:
 *           type: integer
 *           example: 2
 *         fechaSalida:
 *           type: string
 *           format: date
 *           example: "2025-10-30"
 *         idEntradaProducto:
 *           type: integer
 *           example: 5
 *         producto:
 *           $ref: '#/components/schemas/ProductoSalida'
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
 *                     $ref: '#/components/schemas/SalidaProducto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllSalidas)

/**
 * @swagger
 * /salidas/{id}:
 *   get:
 *     summary: Obtener una salida específica por su ID
 *     tags: [Salidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salidaProducto
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
 *                   $ref: '#/components/schemas/SalidaProducto'
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
 *     summary: Registrar una nueva salida de productos
 *     tags: [Salidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idRazon
 *               - fechaSalida
 *               - productos
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 description: ID del usuario que realiza la salida
 *                 example: 1
 *               idRazon:
 *                 type: integer
 *                 description: ID de la razón de salida
 *                 example: 1
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-30"
 *               productos:
 *                 type: array
 *                 description: Lista de productos que se están dando de salida
 *                 items:
 *                   type: object
 *                   required:
 *                     - idProducto
 *                     - cantidad
 *                   properties:
 *                     idProducto:
 *                       type: integer
 *                       description: ID del producto
 *                       example: 1
 *                     cantidad:
 *                       type: number
 *                       description: Cantidad que se retira del inventario
 *                       example: 3
 *     responses:
 *       201:
 *         description: Salida(s) creada(s) correctamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createSalida)

export default router
