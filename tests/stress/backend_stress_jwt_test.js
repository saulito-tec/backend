import http from 'k6/http'
import { sleep, check, group } from 'k6'

// =========================
// Configuración general
// =========================
export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '30s', target: 100 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.05'],
  },
}

const BASE_URL = 'http://localhost:3000/api'
const credentials = {
  nombreUsuario: 'admin',
  password: 'admin',
}

// =========================
// 1. Función para autenticarse
// =========================
function login() {
  const res = http.post(`${BASE_URL}/auth/login`, JSON.stringify(credentials), {
    headers: { 'Content-Type': 'application/json' },
  })

  check(res, {
    'login status 200': (r) => r.status === 200,
    'recibió token JWT': (r) => !!r.json('token'),
  })

  return res.json('token')
}

// =========================
// 2. Flujo principal del usuario
// =========================
export default function () {
  group('Login', () => {
    const token = login()

    if (!token) {
      console.error('No se obtuvo token, abortando flujo.')
      return
    }

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    group('Productos', () => {
      const res = http.get(`${BASE_URL}/productos`, authHeaders)
      check(res, {
        'productos 200': (r) => r.status === 200,
        'productos <800ms': (r) => r.timings.duration < 800,
      })
    })

    group('Inventario', () => {
      const res = http.get(`${BASE_URL}/inventario`, authHeaders)
      check(res, {
        'inventario 200': (r) => r.status === 200,
      })
    })

    group('Reportes por mes', () => {
      const res = http.get(`${BASE_URL}/reportes/2025/10`, authHeaders)
      check(res, {
        'reportes mes 200': (r) => r.status === 200,
      })
    })

    group('Reporte detallado (día)', () => {
      const res = http.get(
        `${BASE_URL}/reportes/2025/10/25/entrada`,
        authHeaders
      )
      check(res, {
        'reporte día 200': (r) => r.status === 200,
      })
    })

    sleep(1)
  })
}
