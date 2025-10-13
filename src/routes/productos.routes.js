import { Router } from 'express'
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../controllers/productos.controller.js'

const router = Router()

// GET /api/productos
router.get('/', getAllProductos)
// GET /api/productos/:id
router.get('/:id', getProductoById)

// POST /api/productos
router.post('/', createProducto)

// PUT /api/productos/:id
router.put('/:id', updateProducto)

// DELETE /api/productos/:id
router.delete('/:id', deleteProducto)

export default router
