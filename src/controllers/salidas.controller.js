import prisma from "../config/db.js";

// Obtener todas las salidas
export const getAllSalidas = async (req, res) => {
  try {
    const salidas = await prisma.salidaProducto.findMany();
    res.status(200).json(salidas);
  } catch (error) {
    console.error("Error al obtener salidas:", error);
    res.status(500).json({ error: "Error al obtener las salidas" });
  }
};

// Obtener una salida por ID
export const getSalidaById = async (req, res) => {
  try {
    const { id } = req.params;
    const salida = await prisma.salidaProducto.findUnique({
      where: { idSalidaProducto: parseInt(id) }
    });

    if (!salida) {
      return res.status(404).json({ message: "Salida no encontrada" });
    }

    res.status(200).json(salida);
  } catch (error) {
    console.error("Error al obtener salida:", error);
    res.status(500).json({ error: "Error al obtener la salida" });
  }
};

// Crear una nueva salida
export const createSalida = async (req, res) => {
  try {
    const { idUsuario_usuario, idEntradaProducto_entradaProducto, idRazon_razon, fechaSalida } = req.body;

    // Validaciones
    if (!idUsuario_usuario || !idEntradaProducto_entradaProducto || !idRazon_razon || !fechaSalida) {
      return res.status(400).json({
        message: "Faltan datos obligatorios (idUsuario_usuario, idEntradaProducto_entradaProducto, idRazon_razon, fechaSalida)"
      });
    }

    const nuevaSalida = await prisma.salidaProducto.create({
      data: {
        idUsuario_usuario: parseInt(idUsuario_usuario),
        idEntradaProducto_entradaProducto: parseInt(idEntradaProducto_entradaProducto),
        idRazon_razon: parseInt(idRazon_razon),
        fechaSalida: new Date(fechaSalida)
      }
    });

    res.status(201).json({
      idSalidaProducto: nuevaSalida.idSalidaProducto,
      idUsuario_usuario: nuevaSalida.idUsuario_usuario,
      idEntradaProducto_entradaProducto: nuevaSalida.idEntradaProducto_entradaProducto,
      idRazon_razon: nuevaSalida.idRazon_razon,
      fechaSalida: nuevaSalida.fechaSalida.toISOString().split("T")[0] // "año mes dia"
    });
  } catch (error) {
    console.error("Error al crear salida:", error);
    res.status(500).json({ error: "Error al crear la salida" });
  }
};
