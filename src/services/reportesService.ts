import prisma from '../config/db.js'
import type {
  IReportePorAño,
  IReportePorMes,
  IReportePorDia,
} from '../valueObjects/reportesVO.ts'

export interface IReporteParams {
  year: number
  month: number
  day?: number
  tipo?: 'entrada' | 'salida'
}

export async function getReportesPorAñoService(): Promise<IReportePorAño[]> {
  const entradas = await prisma.entrada.findMany({
    select: { fechaEntrada: true },
  })

  const salidas = await prisma.salidaProducto.findMany({
    select: { fechaSalida: true },
  })

  const meses: Record<number, Set<string>> = {}

  const addFecha = (fecha: Date) => {
    const year = fecha.getUTCFullYear()
    const month = fecha.toLocaleString('es-MX', {
      month: 'long',
      timeZone: 'UTC',
    })
    if (!meses[year]) meses[year] = new Set()
    meses[year].add(month)
  }

  entradas.forEach((e) => addFecha(e.fechaEntrada))
  salidas.forEach((s) => addFecha(s.fechaSalida))

  const resultado: IReportePorAño[] = Object.entries(meses).map(
    ([year, months]) => ({
      year: parseInt(year),
      months: Array.from(months),
    })
  )

  return resultado.sort((a, b) => b.year - a.year)
}

export async function getReportesPorMesService(
  year: number,
  month: number
): Promise<{ count: number; data: IReportePorMes[] }> {
  const inicio = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0))
  const fin = new Date(Date.UTC(year, month, 1, 0, 0, 0))

  const entradas = await prisma.entrada.findMany({
    where: { fechaEntrada: { gte: inicio, lt: fin } },
    select: { idEntrada: true, fechaEntrada: true },
  })

  const salidas = await prisma.salidaProducto.findMany({
    where: { fechaSalida: { gte: inicio, lt: fin } },
    select: { idSalidaProducto: true, fechaSalida: true },
  })

  const operaciones: IReportePorMes[] = []

  const formatearDia = (date: Date): string => {
    const dia = date.getUTCDate()
    const mes = date.toLocaleString('es-MX', { month: 'long', timeZone: 'UTC' })
    return `${mes} ${dia}`
  }

  entradas.forEach((e) =>
    operaciones.push({
      tipo: 'entrada',
      fecha: e.fechaEntrada,
      titulo: `Entrada de ${formatearDia(e.fechaEntrada)}`,
    })
  )

  salidas.forEach((s) =>
    operaciones.push({
      tipo: 'salida',
      fecha: s.fechaSalida,
      titulo: `Salida de ${formatearDia(s.fechaSalida)}`,
    })
  )

  operaciones.sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
  return { count: operaciones.length, data: operaciones }
}

export async function getDetalleEntradaService({
  year,
  month,
  day,
}: IReporteParams): Promise<any> {
  if (!day) throw new Error('Día requerido para reporte de entrada.')

  const inicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  const fin = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0))

  const entradas = await prisma.entrada.findMany({
    where: {
      fechaEntrada: { gte: inicio, lt: fin },
    },
    include: {
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
      entradaProducto: {
        include: {
          producto: {
            include: {
              departamento: true,
            },
          },
          unidad: true,
        },
      },
    },
  })

  if (entradas.length === 0) {
    return { usuario: null, data: [] }
  }

  const usuario = entradas[0].usuario

  const data: IReportePorDia[] = entradas.flatMap((entrada) =>
    entrada.entradaProducto.map((ep) => ({
      cantidad: Number(ep.cantidad),
      unidad: ep.unidad.unidad,
      producto: ep.producto.nombreProducto,
      categoria: ep.producto.departamento.nombreDepartamento,
      fechaEntrada: entrada.fechaEntrada,
    }))
  )

  return { usuario, data }
}

export async function getDetalleSalidaService({
  year,
  month,
  day,
}: IReporteParams): Promise<any> {
  if (!day) throw new Error('Día requerido para reporte de salida.')

  const inicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  const fin = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0))

  const salidas = await prisma.salidaProducto.findMany({
    where: {
      fechaSalida: { gte: inicio, lt: fin },
    },
    include: {
      usuario: {
        select: {
          nombreUsuario: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
        },
      },
      razon: {
        select: {
          razon: true,
        },
      },
      entradaProducto: {
        include: {
          producto: {
            include: {
              departamento: true,
            },
          },
          unidad: true,
        },
      },
    },
  })

  if (salidas.length === 0) {
    return { usuario: null, data: [] }
  }

  const usuario = salidas[0].usuario

  const data: IReportePorDia[] = salidas.map((s) => ({
    cantidad: Number(s.entradaProducto.cantidad),
    unidad: s.entradaProducto.unidad.unidad,
    producto: s.entradaProducto.producto.nombreProducto,
    categoria: s.entradaProducto.producto.departamento.nombreDepartamento,
    fechaSalida: s.fechaSalida,
    razon: s.razon.razon,
  }))

  return { usuario, data }
}
