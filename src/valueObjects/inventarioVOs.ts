export interface IInventario {
  idInventario: number
  idProducto_producto: number
  cantidadTotal: number
  idUnidad_unidad: number
  fechaFinal: Date
}

export interface IInventarioUpdateRequest {
  idProducto_producto: number
  cantidadTotal: number
  idUnidad_unidad: number
  fechaFinal: Date
}
