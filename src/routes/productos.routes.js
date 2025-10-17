import { Router } from 'express'
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getCategorias,
} from '../controllers/productos.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para la gestión de productos y categorías
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene la lista de todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllProductos)

/**
 * @swagger
 * /productos/categorias:
 *   get:
 *     summary: Obtiene la lista de todas las categorías de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente
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
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idDepartamento:
 *                         type: integer
 *                         example: 1
 *                       nombreDepartamento:
 *                         type: string
 *                         example: "Limpieza"
 *       404:
 *         description: No se encontraron categorías
 *       500:
 *         description: Error interno del servidor
 */
router.get('/categorias', getCategorias)

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getProductoById)

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreProducto
 *               - idDepartamento_departamento
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 example: "Detergente Ariel"
 *               idDepartamento_departamento:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
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
 *                   example: "Producto creado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createProducto)

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreProducto
 *               - idDepartamento_departamento
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 example: "Cloro Pinol"
 *               idDepartamento_departamento:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateProducto)

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: ID no válido
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteProducto)

export default router
