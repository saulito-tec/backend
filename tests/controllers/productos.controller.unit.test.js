/* eslint-disable */
import request from 'supertest'
import app from '../../src/app.js'
import * as productoService from '../../src/services/productoService.ts'

jest.mock('../../src/services/productoService.ts', () => ({
  getAllProductosService: jest.fn(),
  getProductoByIdService: jest.fn(),
  createProductoService: jest.fn(),
  updateProductoService: jest.fn(),
  deleteProductoService: jest.fn(),
  getAllCategoriesService: jest.fn(),
}))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Productos Controller - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks())

  test('GET /api/productos devuelve lista de productos', async () => {
    const mockProductos = [{ idProducto: 1, nombreProducto: 'Cloro' }]
    productoService.getAllProductosService.mockResolvedValue(mockProductos)

    const res = await request(app).get('/api/productos').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(1)
  })

  test('GET /api/productos devuelve 404 si no hay productos', async () => {
    productoService.getAllProductosService.mockResolvedValue([])
    const res = await request(app).get('/api/productos').expect(404)
    expect(res.body.message).toBe('No se encontraron productos')
  })

  test('GET /api/productos/:id devuelve un producto', async () => {
    const mockProducto = { idProducto: 1, nombreProducto: 'Pinol' }
    productoService.getProductoByIdService.mockResolvedValue(mockProducto)

    const res = await request(app).get('/api/productos/1').expect(200)
    expect(res.body.data).toEqual(mockProducto)
  })

  test('GET /api/productos/:id devuelve 404 si no existe', async () => {
    productoService.getProductoByIdService.mockResolvedValue(null)
    const res = await request(app).get('/api/productos/999').expect(404)
    expect(res.body.message).toBe('Producto no encontrado')
  })

  test('POST /api/productos crea un producto', async () => {
    const mockProducto = { idProducto: 1, nombreProducto: 'Nuevo' }
    productoService.createProductoService.mockResolvedValue(mockProducto)

    const payload = { nombreProducto: 'Nuevo', idDepartamento_departamento: 1 }

    const res = await request(app)
      .post('/api/productos')
      .send(payload)
      .expect(201)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Producto creado exitosamente')
  })

  test('POST /api/productos devuelve 400 si faltan campos', async () => {
    const res = await request(app).post('/api/productos').send({}).expect(400)
    expect(res.body.message).toBe(
      'nombreProducto e idDepartamento_departamento son requeridos'
    )
  })

  test('PUT /api/productos/:id actualiza producto', async () => {
    const mockUpdated = { idProducto: 1, nombreProducto: 'Actualizado' }
    productoService.updateProductoService.mockResolvedValue(mockUpdated)

    const payload = {
      nombreProducto: 'Actualizado',
      idDepartamento_departamento: 1,
    }

    const res = await request(app)
      .put('/api/productos/1')
      .send(payload)
      .expect(200)
    expect(res.body.success).toBe(true)
  })

  test('DELETE /api/productos/:id elimina producto', async () => {
    productoService.deleteProductoService.mockResolvedValue()

    const res = await request(app).delete('/api/productos/1').expect(200)
    expect(res.body.message).toBe('Producto eliminado exitosamente')
  })

  test('GET /api/productos/categorias devuelve lista de categorías', async () => {
    productoService.getAllCategoriesService.mockResolvedValue([
      { idDepartamento: 1, nombreDepartamento: 'Limpieza' },
    ])

    const res = await request(app).get('/api/productos/categorias').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(1)
  })
})
