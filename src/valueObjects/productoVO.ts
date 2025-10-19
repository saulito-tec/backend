export interface IProducto {
  idProducto: number
  nombreProducto: string
  idDepartamento_departamento: number
  emoji?: string | null
  departamento: {
    idDepartamento: number
    nombreDepartamento: string
  }
}

export interface ICreateProductoRequest {
  nombreProducto: string
  idDepartamento_departamento: number
  idUnidad_unidad?: number
  emoji?: string
}

export interface IUpdateProductoRequest {
  nombreProducto?: string
  idDepartamento_departamento?: number
  emoji?: string
}

export interface IDepartamento {
  idDepartamento: number
  nombreDepartamento: string
}
