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
  producto: string
  categoria: string
  fechaEntrada: Date
}

export interface IReporteParams {
  year: number
  month: number
  day?: number
  tipo?: 'entrada' | 'salida'
}
