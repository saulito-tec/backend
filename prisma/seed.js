import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
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
  ]
  for (const t of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${t}`)
  }
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1')

  const hashedPassword = await bcrypt.hash('alonso', 10)
  const usuario = await prisma.usuario.create({
    data: {
      nombreUsuario: 'alonso',
      apellidoPaterno: 'alarcon',
      apellidoMaterno: 'parra',
      permisoUsuario: 1,
      hashPassword: hashedPassword,
    },
  })

  const departamento = await prisma.departamento.create({
    data: { nombreDepartamento: 'Alimentos' },
  })

  const unidad = await prisma.unidad.create({
    data: { unidad: 'kg' },
  })

  const producto = await prisma.producto.create({
    data: {
      nombreProducto: 'Arroz integral',
      idDepartamento_departamento: departamento.idDepartamento,
    },
  })

  const entrada = await prisma.entrada.create({
    data: {
      idUsuario_usuario: usuario.idUsuario,
      fechaEntrada: new Date('2025-10-16'),
      emisor: 'Proveedor base',
      compra: 1,
    },
  })

  const entradaProducto = await prisma.entradaProducto.create({
    data: {
      idEntrada_entrada: entrada.idEntrada,
      idProducto_producto: producto.idProducto,
      idUnidad_unidad: unidad.idUnidad,
      fechaEstimada: new Date('2025-10-16'),
      cantidad: 10,
    },
  })

  const inventario = await prisma.inventario.create({
    data: {
      idProducto_producto: producto.idProducto,
      idUnidad_unidad: unidad.idUnidad,
      cantidadTotal: 10,
      fechaFinal: new Date('2025-10-16'),
    },
  })

  const razon = await prisma.razon.create({
    data: { razon: 'Consumo diario' },
  })

  console.log('Seed ejecutado correctamente:')
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error('Error ejecutando seed:', err)
    prisma.$disconnect()
  })
