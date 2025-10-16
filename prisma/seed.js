import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

/**
 * Este archivo nomas fue un seed para poular la bdd con usuarios y productos para poder crear una entrada/salida
 */

async function main() {
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

  const departamento = await prisma.departamento.create({
    data: {
      nombreDepartamento: 'Alimentos',
    },
  })

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
    console.error('err insertando mock:', err)
    prisma.$disconnect()
  })
