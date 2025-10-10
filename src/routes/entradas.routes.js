import { Router } from "express";
import { entradaID, entradas, crearEntrada } from "../controllers/entradas.controller.js";

const router = Router();

// GET /api/entradas
router.get("/", entradas);

// GET /api/entradas/:id
router.get("/:id", entradaID);

// POST /api/entradas
router.post("/", crearEntrada);

export default router;