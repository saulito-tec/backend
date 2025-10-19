import { Router } from 'express'
import {
  getEntradaById,
  getAllEntradas,
  createEntrada,
  getAllEntradasById,
} from '../controllers/entradas.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Entradas
 *   description: Endpoints para la gestión de entradas de productos
 */

/**
 * @swagger
 * /entradas:
 *   get:
 *     summary: Obtiene todas las entradas registradas
 *     tags: [Entradas]
 *     responses:
 *       200:
 *         description: Lista de todas las entradas
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
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idEntrada:
 *                         type: integer
 *                         example: 1
 *                       fechaEntrada:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-10-16T00:00:00.000Z
 *                       emisor:
 *                         type: string
 *                         example: "Proveedor X"
 *                       compra:
 *                         type: string
 *                         example: "Compra #12345"
 *                       idUsuario_usuario:
 *                         type: integer
 *                         example: 2
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllEntradas)

/**
 * @swagger
 * /entradas/{id}:
 *   get:
 *     summary: Obtiene una entrada específica por su ID
 *     tags: [Entradas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entrada a consultar
 *     responses:
 *       200:
 *         description: Entrada encontrada
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
 *                     idEntrada:
 *                       type: integer
 *                       example: 1
 *                     fechaEntrada:
 *                       type: string
 *                       format: date-time
 *                     emisor:
 *                       type: string
 *                       example: "Proveedor X"
 *                     compra:
 *                       type: string
 *                       example: "Compra #12345"
 *       404:
 *         description: Entrada no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getEntradaById)

/**
 * @swagger
 * /entradas/producto/{id}:
 *   get:
 *     summary: Obtiene las últimas entradas registradas para un producto
 *     description: >
 *       Retorna las últimas *n* entradas (`limit`) registradas en la tabla `entradaProducto`
 *       asociadas a un producto específico, ordenadas por el ID de entrada descendente.
 *     tags:
 *       - Entradas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID del producto a consultar
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 2
 *         description: Número máximo de registros a devolver
 *     responses:
 *       200:
 *         description: Lista de entradas obtenidas exitosamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - idEntradaProducto: 26
 *                   idEntrada_entrada: 42
 *                   idProducto_producto: 5
 *                   idUnidad_unidad: 2
 *                   fechaEstimada: "2025-10-19T04:48:46.000Z"
 *                   cantidad: 1.000
 *                 - idEntradaProducto: 25
 *                   idEntrada_entrada: 41
 *                   idProducto_producto: 5
 *                   idUnidad_unidad: 2
 *                   fechaEstimada: "2025-10-19T03:05:29.000Z"
 *                   cantidad: 10.000
 *       400:
 *         description: Parámetros inválidos o faltantes
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El parámetro 'id' es requerido."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */
router.get('/producto/:id', getAllEntradasById)

/**
 * @swagger
 * /entradas:
 *   post:
 *     summary: Crea una nueva entrada con sus productos asociados
 *     tags: [Entradas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario_usuario
 *               - fechaEntrada
 *               - emisor
 *               - compra
 *               - productos
 *             properties:
 *               idUsuario_usuario:
 *                 type: integer
 *                 description: ID del usuario que crea la entrada
 *                 example: 2
 *               fechaEntrada:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-16
 *               emisor:
 *                 type: string
 *                 example: "Proveedor X"
 *               compra:
 *                 type: int
 *                 example: 0
 *               productos:
 *                 type: array
 *                 description: Lista de productos incluidos en la entrada
 *                 items:
 *                   type: object
 *                   required:
 *                     - idProducto
 *                     - idUnidad
 *                     - fechaEstimada
 *                     - cantidad
 *                   properties:
 *                     idProducto:
 *                       type: integer
 *                       example: 1
 *                     idUnidad:
 *                       type: integer
 *                       example: 1
 *                     fechaEstimada:
 *                       type: string
 *                       format: date
 *                       example: 2025-10-25
 *                     cantidad:
 *                       type: number
 *                       example: 10
 *     responses:
 *       201:
 *         description: Entrada creada correctamente
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
 *                   example: "Entrada creada correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     idEntrada:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createEntrada)

export default router
