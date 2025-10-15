import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1️⃣ Usuario mock
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const usuario = await prisma.usuario.create({
    data: {
      nombreUsuario: 'admin',
      apellidoPaterno: 'Perez',
      apellidoMaterno: 'Lopez',
      permisoUsuario: 1,
      hashPassword: hashedPassword,
    },
  })

  // 2️⃣ Departamento mock
  const departamento = await prisma.departamento.create({
    data: {
      nombreDepartamento: 'Alimentos',
    },
  })

  // 3️⃣ Unidades mock
  const unidad = await prisma.unidad.create({
    data: {
      unidad: 'kg',
    },
  })

  const unidad2 = await prisma.unidad.create({
    data: {
      unidad: 'pz',
    },
  })

  // 4️⃣ Productos mock
  const producto1 = await prisma.producto.create({
    data: {
      nombreProducto: 'Arroz',
      idDepartamento_departamento: departamento.idDepartamento,
    },
  })

  const producto2 = await prisma.producto.create({
    data: {
      nombreProducto: 'Frijoles',
      idDepartamento_departamento: departamento.idDepartamento,
    },
  })

  console.log('✅ Datos de prueba insertados:')
  console.log({
    usuario,
    departamento,
    unidad,
    unidad2,
    producto1,
    producto2,
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error('❌ Error insertando datos mock:', err)
    prisma.$disconnect()
  })
