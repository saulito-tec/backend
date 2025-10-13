import { Router } from 'express'
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js'

const router = Router()

router.post('/', createUsuario)
router.get('/', getAllUsuarios)
router.get('/:id', getUsuarioById)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
