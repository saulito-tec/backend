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
    const year = fecha.getFullYear()
    const month = fecha.toLocaleString('es-MX', { month: 'long' })
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
): Promise<IReportePorMes[]> {
  const inicio = startOfMonth(new Date(year, month - 1))
  const fin = endOfMonth(inicio)

  const entradas = await prisma.entrada.findMany({
    where: { fechaEntrada: { gte: inicio, lte: fin } },
    select: { idEntrada: true, fechaEntrada: true },
  })

  const salidas = await prisma.salidaProducto.findMany({
    where: { fechaSalida: { gte: inicio, lte: fin } },
    select: { idSalidaProducto: true, fechaSalida: true },
  })

  const operaciones: IReportePorMes[] = []

  const formatearDia = (date: Date): string => {
    const dia = date.getDate()
    const mes = date.toLocaleString('es-MX', { month: 'long' })
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
  return operaciones
}

export async function getDetalleEntradaService({
  year,
  month,
  day,
}: IReporteParams): Promise<IReportePorDia[]> {
  if (!day) throw new Error('Día requerido para reporte de entrada.')

  const inicio = new Date(year, month - 1, day)
  const fin = new Date(year, month - 1, day + 1)

  const entradas = await prisma.entradaProducto.findMany({
    where: {
      fechaEstimada: { gte: inicio, lt: fin },
    },
    select: {
      cantidad: true,
      producto: {
        select: {
          nombreProducto: true,
          departamento: { select: { nombreDepartamento: true } },
        },
      },
      unidad: { select: { unidad: true } },
      fechaEstimada: true,
    },
  })

  const resultado: IReportePorDia[] = entradas.map((e) => ({
    cantidad: Number(e.cantidad),
    producto: e.producto.nombreProducto,
    categoria: e.producto.departamento.nombreDepartamento,
    fechaEntrada: e.fechaEstimada,
  }))

  return resultado
}

export async function getDetalleSalidaService({
  year,
  month,
  day,
}: IReporteParams): Promise<IReportePorDia[]> {
  if (!day) throw new Error('Día requerido para reporte de salida.')

  const inicio = new Date(year, month - 1, day)
  const fin = new Date(year, month - 1, day + 1)

  const salidas = await prisma.salidaProducto.findMany({
    where: {
      fechaSalida: { gte: inicio, lt: fin },
    },
    select: {
      entradaProducto: {
        select: {
          cantidad: true,
          producto: {
            select: {
              nombreProducto: true,
              departamento: { select: { nombreDepartamento: true } },
            },
          },
          unidad: { select: { unidad: true } },
          fechaEstimada: true,
        },
      },
      fechaSalida: true,
    },
  })

  const resultado: IReportePorDia[] = salidas.map((s) => ({
    cantidad: Number(s.entradaProducto.cantidad),
    producto: s.entradaProducto.producto.nombreProducto,
    categoria: s.entradaProducto.producto.departamento.nombreDepartamento,
    fechaEntrada: s.entradaProducto.fechaEstimada,
  }))

  return resultado
}
