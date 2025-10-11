import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importar rutas

import authRoutes from "./routes/auth.routes.js";
// import usuariosRoutes from "./routes/usuarios.routes.js";
// import productosRoutes from "./routes/productos.routes.js";
// import inventarioRoutes from "./routes/inventario.routes.js";
// import entradasRoutes from "./routes/entradas.routes.js";
import salidasRoutes from "./routes/salidas.routes.js";
// import reportesRoutes from "./routes/reportes.routes.js";

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Prefijo global de la API

app.use("/api/auth", authRoutes);
// app.use("/api/usuarios", usuariosRoutes);
// app.use("/api/productos", productosRoutes);
// app.use("/api/inventario", inventarioRoutes);
// app.use("/api/entradas", entradasRoutes);
app.use("/api/salidas", salidasRoutes);
// app.use("/api/reportes", reportesRoutes);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.json({ message: "✅ API Casa Hogar funcionando correctamente" });
});

export default app;