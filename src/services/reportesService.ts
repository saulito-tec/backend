import prisma from '../config/db.js'
import { startOfMonth, endOfMonth } from 'date-fns'
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
    // Use UTC methods to avoid timezone shifts
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
  // Use UTC to avoid timezone issues
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

  // Return count for performance - frontend doesn't need to count
  return { count: operaciones.length, data: operaciones }
}

export async function getDetalleEntradaService({
  year,
  month,
  day,
}: IReporteParams): Promise<any> {
  if (!day) throw new Error('Día requerido para reporte de entrada.')

  // Use UTC to avoid timezone issues
  const inicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  const fin = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0))

  console.log('🔍 Querying entrada between:', inicio, 'and', fin)

  // ✅ Query by entrada.fechaEntrada, not entradaProducto.fechaEstimada
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

  console.log('✅ Found entradas:', entradas.length)

  if (entradas.length === 0) {
    return { usuario: null, data: [] }
  }

  // Get usuario from first entrada
  const usuario = entradas[0].usuario

  // Flatten all products from all entradas of this day
  const data: IReportePorDia[] = entradas.flatMap((entrada) =>
    entrada.entradaProducto.map((ep) => ({
      cantidad: Number(ep.cantidad),
      unidad: ep.unidad.unidad,
      producto: ep.producto.nombreProducto,
      categoria: ep.producto.departamento.nombreDepartamento,
      fechaEntrada: entrada.fechaEntrada, // ✅ Use entrada date, not product expiration
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

  // Use UTC to avoid timezone issues
  const inicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  const fin = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0))

  console.log('🔍 Querying salida between:', inicio, 'and', fin)

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

  console.log('✅ Found salidas:', salidas.length)

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
