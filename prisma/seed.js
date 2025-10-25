import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Limpiando base de datos...')

  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0')
  const tables = [
    'salidaProducto',
    'entradaProducto',
    'entrada',
    'inventario',
    'producto',
    'razon',
    'unidad',
    'departamento',
    'usuario',
    'logs',
  ]
  for (const t of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${t}`)
  }
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1')

  console.log('✅ Tablas truncadas correctamente')

  // ===== Crear usuario admin =====
  const hashedPassword = await bcrypt.hash('admin', 10)
  const admin = await prisma.usuario.create({
    data: {
      nombreUsuario: 'admin',
      apellidoPaterno: 'root',
      apellidoMaterno: 'system',
      permisoUsuario: 1,
      hashPassword: hashedPassword,
    },
  })
  console.log('👤 Usuario admin creado:', admin.nombreUsuario)

  // ===== Crear departamentos =====
  const departamentos = await prisma.departamento.createMany({
    data: [
      { nombreDepartamento: 'Alimentos' }, // 1
      { nombreDepartamento: 'Limpieza' }, // 2
      { nombreDepartamento: 'Papelería' }, // 3
      { nombreDepartamento: 'Abarrotes' }, // 4
      { nombreDepartamento: 'Bebidas' }, // 5
    ],
  })
  console.log('🏢 Departamentos creados:', departamentos.count)

  // ===== Crear unidades =====
  const unidades = await prisma.unidad.createMany({
    data: [
      { unidad: 'kg' },
      { unidad: 'pieza' },
      { unidad: 'litro' },
      { unidad: 'paquete' },
    ],
  })
  console.log('📏 Unidades creadas:', unidades.count)

  // ===== Crear productos =====
  const productos = await prisma.producto.createMany({
    data: [
      {
        nombreProducto: 'Carne molida',
        idDepartamento_departamento: 1,
        emoji: '🥩',
      },
      {
        nombreProducto: 'Arroz integral',
        idDepartamento_departamento: 4,
        emoji: '🍚',
      },
      {
        nombreProducto: 'Aguacate',
        idDepartamento_departamento: 1,
        emoji: '🥑',
      },
      {
        nombreProducto: 'Cloro multiusos',
        idDepartamento_departamento: 2,
        emoji: '🧴',
      },
      {
        nombreProducto: 'Hojas tamaño carta',
        idDepartamento_departamento: 3,
        emoji: '📄',
      },
      {
        nombreProducto: 'Refresco cola 2L',
        idDepartamento_departamento: 5,
        emoji: '🥤',
      },
      {
        nombreProducto: 'Pan de caja',
        idDepartamento_departamento: 4,
        emoji: '🍞',
      },
      {
        nombreProducto: 'Detergente líquido',
        idDepartamento_departamento: 2,
        emoji: '🧼',
      },
    ],
  })
  console.log('📦 Productos creados: 8')

  // ===== Crear entrada general =====
  const entrada = await prisma.entrada.create({
    data: {
      idUsuario_usuario: admin.idUsuario,
      fechaEntrada: new Date(),
      emisor: 'Proveedor base',
      compra: 1,
    },
  })

  // ===== Crear entradaProducto =====
  const entradaProductos = await prisma.entradaProducto.createMany({
    data: [
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 1,
        idUnidad_unidad: 1,
        fechaEstimada: new Date(),
        cantidad: 15,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 2,
        idUnidad_unidad: 1,
        fechaEstimada: new Date(),
        cantidad: 25,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 3,
        idUnidad_unidad: 1,
        fechaEstimada: new Date(),
        cantidad: 20,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 4,
        idUnidad_unidad: 3,
        fechaEstimada: new Date(),
        cantidad: 10,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 5,
        idUnidad_unidad: 4,
        fechaEstimada: new Date(),
        cantidad: 500,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 6,
        idUnidad_unidad: 3,
        fechaEstimada: new Date(),
        cantidad: 12,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 7,
        idUnidad_unidad: 2,
        fechaEstimada: new Date(),
        cantidad: 30,
      },
      {
        idEntrada_entrada: entrada.idEntrada,
        idProducto_producto: 8,
        idUnidad_unidad: 3,
        fechaEstimada: new Date(),
        cantidad: 8,
      },
    ],
  })
  console.log('📥 Entradas creadas:', entradaProductos.count)

  // ===== Crear inventario =====
  await prisma.inventario.createMany({
    data: [
      {
        idProducto_producto: 1,
        idUnidad_unidad: 1,
        cantidadTotal: 15,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 2,
        idUnidad_unidad: 1,
        cantidadTotal: 25,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 3,
        idUnidad_unidad: 1,
        cantidadTotal: 20,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 4,
        idUnidad_unidad: 3,
        cantidadTotal: 10,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 5,
        idUnidad_unidad: 4,
        cantidadTotal: 500,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 6,
        idUnidad_unidad: 3,
        cantidadTotal: 12,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 7,
        idUnidad_unidad: 2,
        cantidadTotal: 30,
        fechaFinal: new Date(),
      },
      {
        idProducto_producto: 8,
        idUnidad_unidad: 3,
        cantidadTotal: 8,
        fechaFinal: new Date(),
      },
    ],
  })
  console.log('📊 Inventario inicial creado (8 productos)')

  // ===== Crear razones de salida =====
  await prisma.razon.createMany({
    data: [
      { razon: 'Consumo diario' },
      { razon: 'Donación' },
      { razon: 'Pérdida o caducidad' },
    ],
  })
  console.log('📝 Razones creadas')

  console.log('🌱 Seed ejecutado correctamente ✅')
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err)
    prisma.$disconnect()
  })
