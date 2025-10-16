export interface IProducto {
  idProducto: number
  nombreProducto: string
  idDepartamento_departamento: number
}

export interface ICreateProductoRequest {
  nombreProducto: string
  idDepartamento_departamento: number
}

export interface IUpdateProductoRequest {
  nombreProducto: string
  idDepartamento_departamento: number
}
