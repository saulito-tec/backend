export interface ISalida {
  idUsuario_usuario: number
  idEntradaProducto_entradaProducto: number
  idRazon_razon: number
  fechaSalida: Date
  cantidadSalida: number
}

export interface ISalidaResponse {
  idSalidaProducto: number
  idUsuario_usuario: number
  idEntradaProducto_entradaProducto: number
  idRazon_razon: number
  fechaSalida: Date
  cantidadSalida: number
}
