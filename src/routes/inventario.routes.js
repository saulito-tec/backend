import { Router } from "express";
import { 
  getInventario, 
  getInventarioById, 
  updateInventarioById 
} from "../controllers/inventario.controller.js";

const router = Router();

// GET /api/inventario
router.get("/", getInventario);

// GET /api/inventario/:id
router.get("/:id", getInventarioById);

// PUT /api/inventario/:id
router.put("/:id", updateInventarioById);

export default router;
