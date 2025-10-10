import prisma from "../config/db.js";

export const entradas = async (req, res) => {
  try {
    const entradas = await prisma.entrada.findMany();

    res.json({
      data: entradas
    });

  } catch (error) {
    console.error("Error al obtener las entradas:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const entradaID = async (req, res) => {
  try {
    const { id } = req.params; 

    const idEntrada = parseInt(id);

    const entrada = await prisma.entrada.findFirst({
      where: { idEntrada: idEntrada }  
    });

    if (!entrada) {
      return res.status(404).json({
        success: false,
        message: "Entrada no encontrada"
      });
    }

    res.json({
      success: true,
      data: entrada
    });

  } catch (error) {
    console.error("Error al obtener la entrada:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const crearEntrada = async (req, res) => {
  try {
    const { idUsuario_usuario, fechaEntrada, emisor, compra } = req.body;

    const nuevaEntrada = await prisma.entrada.create({
      data: {
        idUsuario_usuario,
        fechaEntrada: new Date(fechaEntrada),
        emisor,
        compra
      }
    });

    res.status(201).json({
      success: true,
      data: nuevaEntrada
    });

  } catch (error) {
    console.error("Error al crear la entrada:", error);
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};