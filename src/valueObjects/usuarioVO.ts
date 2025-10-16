export interface IUsuario {
  idUsuario?: number
  nombreUsuario: string
  apellidoPaterno: string
  apellidoMaterno: string
  permisoUsuario: number
  hashPassword?: string
}

export interface ICreateUsuario {
  nombreUsuario: string
  apellidoPaterno: string
  apellidoMaterno: string
  permisoUsuario: number
  password: string
}

export interface IUpdateUsuario {
  idUsuario: number
  nombreUsuario?: string
  apellidoPaterno?: string
  apellidoMaterno?: string
  permisoUsuario?: number
  password?: string
}
