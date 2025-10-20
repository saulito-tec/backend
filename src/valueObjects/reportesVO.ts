export interface IReportePorAño {
  year: number
  months: string[]
}

export interface IReportePorMes {
  tipo: 'entrada' | 'salida'
  fecha: Date
  titulo: string
}

export interface IReportePorDia {
  cantidad: number
  unidad: string
  producto: string
  categoria: string
  fechaEntrada?: Date
  fechaSalida?: Date
  razon?: string
}

export interface IReporteParams {
  year: number
  month: number
  day?: number
  tipo?: 'entrada' | 'salida'
}
