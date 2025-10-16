import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

/**
 * Seed completo para inicializar:
 * usuario, departamentos, unidades, productos, entradas y salidas
 * para probar los endpoints de /api/entradas, /api/inventario y /api/reportes
 */

async function main() {
  console.log('Iniciando seed...')

  // --- USUARIO PRINCIPAL ---
  const hashedPassword = await bcrypt.hash('alonso', 10)
  const usuario = await prisma.usuario.create({
    data: {
      nombreUsuario: 'alonso',
      apellidoPaterno: 'Parra',
      apellidoMaterno: 'Lopez',
      permisoUsuario: 1,
      hashPassword: hashedPassword,
    },
  })

  // --- DEPARTAMENTO ---
  const departamento = await prisma.departamento.create({
    data: {
      nombreDepartamento: 'Alimentos',
    },
  })

  // --- UNIDADES ---
  const unidadKg = await prisma.unidad.create({
    data: { unidad: 'kg' },
  })

  const unidadPz = await prisma.unidad.create({
    data: { unidad: 'pz' },
  })

  // --- PRODUCTOS ---
  const productos = await prisma.producto.createMany({
    data: [
      {
        nombreProducto: 'Arroz',
        idDepartamento_departamento: departamento.idDepartamento,
      },
      {
        nombreProducto: 'Frijoles',
        idDepartamento_departamento: departamento.idDepartamento,
      },
      {
        nombreProducto: 'Huevo',
        idDepartamento_departamento: departamento.idDepartamento,
      },
      {
        nombreProducto: 'Leche',
        idDepartamento_departamento: departamento.idDepartamento,
      },
      {
        nombreProducto: 'Plátano',
        idDepartamento_departamento: departamento.idDepartamento,
      },
    ],
  })

  const productosDB = await prisma.producto.findMany()

  // --- ENTRADAS (enero a septiembre 2025, días 1–5) ---
  for (let mes = 1; mes <= 9; mes++) {
    for (let dia = 1; dia <= 5; dia++) {
      const entrada = await prisma.entrada.create({
        data: {
          idUsuario_usuario: usuario.idUsuario,
          fechaEntrada: new Date(2025, mes - 1, dia),
          emisor: `Proveedor ${mes}`,
          compra: 1000 + mes * 10 + dia,
        },
      })

      // Crear productos de esa entrada
      for (const producto of productosDB) {
        await prisma.entradaProducto.create({
          data: {
            idEntrada_entrada: entrada.idEntrada,
            idProducto_producto: producto.idProducto,
            idUnidad_unidad: unidadKg.idUnidad,
            fechaEstimada: new Date(2025, mes - 1, dia),
            cantidad: (Math.random() * 50 + 10).toFixed(2),
          },
        })
      }
    }
  }

  // --- RAZÓN DE SALIDAS ---
  const razonUso = await prisma.razon.create({
    data: { razon: 'Uso diario' },
  })

  // --- SALIDAS (basadas en entradas existentes) ---
  const entradas = await prisma.entradaProducto.findMany()
  for (let i = 0; i < entradas.length; i += 12) {
    const entradaProd = entradas[i]
    await prisma.salidaProducto.create({
      data: {
        idUsuario_usuario: usuario.idUsuario,
        idEntradaProducto_entradaProducto: entradaProd.idEntradaProducto,
        idRazon_razon: razonUso.idRazon,
        fechaSalida: new Date(
          2025,
          Math.floor(Math.random() * 9),
          Math.floor(Math.random() * 25) + 1
        ),
      },
    })
  }

  console.log('Seed completado correctamente.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error('Error ejecutando seed:', err)
    await prisma.$disconnect()
    process.exit(1)
  })
