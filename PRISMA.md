# Configuración de Prisma

Guía paso a paso para configurar Prisma en tu proyecto.

## Instalación

### 1. Instalar dependencias
```bash
npm install prisma @prisma/client
```

### 2. Configurar variables de entorno
Crear/editar archivo `.env`:
```env
DATABASE_URL="mysql://usuario:contraseña@host:puerto/basededatos"
```

### 3. Generar cliente de Prisma
```bash
npx prisma generate
```

### 4. Sincronizar base de datos
```bash
npx prisma db push
```

## Comandos esenciales

```bash
# Regenerar cliente después de cambios en schema
npx prisma generate

# Abrir interfaz visual de la base de datos
npx prisma studio

# Resetear base de datos (⚠️ borra todos los datos)
npx prisma db push --force-reset
```

## Uso básico

```javascript
import prisma from '../config/db.js';

// Buscar usuario
const usuario = await prisma.usuario.findFirst({
  where: { nombreUsuario: "testuser" }
});

// Crear usuario
const nuevoUsuario = await prisma.usuario.create({
  data: { nombreUsuario, hashPassword }
});
```

## Importante

- Ejecutar `npx prisma generate` después de cambios en `schema.prisma`
- NO subir carpeta `src/generated/prisma/` a Git
- SÍ subir archivo `prisma/schema.prisma` a Git
- Cambiar esta linea del schema.prisma a esto:
```javascript
  datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
