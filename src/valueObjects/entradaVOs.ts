export interface IEntrada {
  idUsuario: number
  fechaEntrada: Date
  emisor: string
  compra: number
}

export interface IEntradaProducto {
  idEntrada: number
  idProducto: number
  idUnidad: number
  fechaEstimada: Date
  cantidad: number
}
