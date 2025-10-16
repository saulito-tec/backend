import { loginService } from '../services/authService.ts'

export const login = async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body

    const result = await loginService({ nombreUsuario, password })

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token: result.token,
      user: result.user,
    })
  } catch (error) {
    console.error('Error en login:', error)

    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ success: false, message: error.message })
    }

    if (error.message === 'Nombre de usuario y contraseña son requeridos') {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
