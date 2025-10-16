export interface ILoginRequest {
  nombreUsuario: string
  password: string
}

export interface IUser {
  idUsuario: number
  nombreUsuario: string
  apellidoPaterno: string
  apellidoMaterno: string
  permisoUsuario: number
  hashPassword: string
}

export interface ILoginResponse {
  token: string
  user: {
    id: number
    nombreUsuario: string
    nombreCompleto: string
    apellidoPaterno: string
    apellidoMaterno: string
    permisoUsuario: number
  }
}
