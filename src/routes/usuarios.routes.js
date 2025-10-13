import { Router } from 'express'
import {
  usuarios,
  usuario,
  PostUsuario,
  PutUsuario,
  DeleteUsuario,
} from '../controllers/usuarios.controller.js'

const router = Router()

router.post('/', PostUsuario)
router.get('/', usuarios)
router.get('/:id', usuario)
router.put('/:id', PutUsuario)
router.delete('/:id', DeleteUsuario)

export default router
