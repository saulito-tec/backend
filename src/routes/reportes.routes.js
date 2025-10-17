import { Router } from 'express'
import {
  getReportesPorAño,
  getReportesPorMes,
  getReporteDetalle,
} from '../controllers/reportes.controller.js'

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Endpoints para obtener reportes anuales, mensuales y diarios
 */

/**
 * @swagger
 * /reportes:
 *   get:
 *     summary: Obtiene los reportes por año
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Lista de años y meses con movimientos
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
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: integer
 *                         example: 2025
 *                       months:
 *                         type: array
 *                         items:
 *                           type: integer
 *                           example: 10
 */
router.get('/', getReportesPorAño)

/**
 * @swagger
 * /reportes/{year}/{month}:
 *   get:
 *     summary: Obtiene los reportes de un mes específico
 *     tags: [Reportes]
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         description: Año del reporte
 *         schema:
 *           type: integer
 *           example: 2025
 *       - name: month
 *         in: path
 *         required: true
 *         description: Mes del reporte (1-12)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de operaciones del mes
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
 *                     type: object
 *                     properties:
 *                       fecha:
 *                         type: string
 *                         example: "2025-10-01"
 *                       tipo:
 *                         type: string
 *                         example: "entrada"
 *                       total:
 *                         type: number
 *                         example: 2500.5
 */
router.get('/:year/:month', getReportesPorMes)

/**
 * @swagger
 * /reportes/{year}/{month}/{day}/{tipo}:
 *   get:
 *     summary: Obtiene el detalle de un día específico (entrada o salida)
 *     tags: [Reportes]
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2025
 *       - name: month
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: day
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 16
 *       - name: tipo
 *         in: path
 *         required: true
 *         description: Tipo de reporte ("entrada" o "salida")
 *         schema:
 *           type: string
 *           enum: [entrada, salida]
 *     responses:
 *       200:
 *         description: Detalle del día solicitado
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
 *                     type: object
 *                     properties:
 *                       producto:
 *                         type: string
 *                         example: "Coca-Cola 600ml"
 *                       cantidad:
 *                         type: integer
 *                         example: 15
 *                       unidad:
 *                         type: string
 *                         example: "piezas"
 *                       total:
 *                         type: number
 *                         example: 300
 */
router.get('/:year/:month/:day/:tipo', getReporteDetalle)

export default router
