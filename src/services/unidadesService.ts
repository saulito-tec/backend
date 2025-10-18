import prisma from '../config/db.js'
import { IUnidad } from '../valueObjects/unidadVO.ts'

export async function getAllUnidadesService(): Promise<IUnidad[]> {
  const unidades = await prisma.unidad.findMany()
  return unidades
}

export async function createUnidadService(data: IUnidad): Promise<IUnidad> {
  const nuevaUnidad = await prisma.unidad.create({
    data: {
      unidad: data.unidad,
    },
  })
  return nuevaUnidad
}
