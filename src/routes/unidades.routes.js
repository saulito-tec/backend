import { Router } from 'express'
import { getAllUnidades, createUnidad } from '../controllers/unidad.controller'

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Unidades
 *     description: Endpoints para la gestión de unidades de medida
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Unidad:
 *       type: object
 *       properties:
 *         idUnidad:
 *           type: integer
 *           example: 1
 *         unidad:
 *           type: string
 *           example: "Kg"
 */

/**
 * @swagger
 * /unidades:
 *   get:
 *     summary: Obtener todas las unidades
 *     tags: [Unidades]
 *     responses:
 *       200:
 *         description: Lista de unidades obtenida correctamente
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
 *                     $ref: '#/components/schemas/Unidad'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllUnidades)

/**
 * @swagger
 * /unidades:
 *   post:
 *     summary: Crear una nueva unidad
 *     tags: [Unidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unidad
 *             properties:
 *               unidad:
 *                 type: string
 *                 example: "Litro"
 *     responses:
 *       201:
 *         description: Unidad creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createUnidad)

export default router
