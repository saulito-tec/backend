import { Router } from 'express'
import {
  productos,
  producto,
  Postproducto,
  PutProducto,
  DeleteProducto,
} from '../controllers/productos.controller.js'

const router = Router()

// GET /api/productos
router.get('/', productos)
// GET /api/productos/:id
router.get('/:id', producto)

// POST /api/productos
router.post('/', Postproducto)

// PUT /api/productos/:id
router.put('/:id', PutProducto)

// DELETE /api/productos/:id
router.delete('/:id', DeleteProducto)

export default router
