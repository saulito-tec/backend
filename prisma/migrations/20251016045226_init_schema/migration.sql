-- CreateTable
CREATE TABLE `departamento` (
    `idDepartamento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreDepartamento` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`idDepartamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrada` (
    `idEntrada` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario_usuario` INTEGER NOT NULL,
    `fechaEntrada` DATETIME(0) NOT NULL,
    `emisor` VARCHAR(30) NOT NULL,
    `compra` INTEGER NOT NULL,

    INDEX `idUsuario_usuario`(`idUsuario_usuario`),
    PRIMARY KEY (`idEntrada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entradaProducto` (
    `idEntradaProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `idEntrada_entrada` INTEGER NOT NULL,
    `idProducto_producto` INTEGER NOT NULL,
    `idUnidad_unidad` INTEGER NOT NULL,
    `fechaEstimada` DATETIME(0) NOT NULL,
    `cantidad` DECIMAL(12, 3) NOT NULL,

    INDEX `idEntrada_entrada`(`idEntrada_entrada`),
    INDEX `idProducto_producto`(`idProducto_producto`),
    INDEX `idUnidad_unidad`(`idUnidad_unidad`),
    PRIMARY KEY (`idEntradaProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventario` (
    `idInventario` INTEGER NOT NULL,
    `idProducto_producto` INTEGER NOT NULL,
    `cantidadTotal` DECIMAL(12, 3) NOT NULL,
    `idUnidad_unidad` INTEGER NOT NULL,
    `fechaFinal` DATETIME(0) NOT NULL,

    INDEX `idProducto_producto`(`idProducto_producto`),
    INDEX `idUnidad_unidad`(`idUnidad_unidad`),
    PRIMARY KEY (`idInventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `idLogs` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario_usuario` INTEGER NOT NULL,
    `fechaLogin` DATETIME(0) NOT NULL,
    `fechaLogout` DATETIME(0) NOT NULL,

    INDEX `idUsuario_usuario`(`idUsuario_usuario`),
    PRIMARY KEY (`idLogs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreProducto` VARCHAR(120) NOT NULL,
    `idDepartamento_departamento` INTEGER NOT NULL,

    INDEX `idDepartamento_departamento`(`idDepartamento_departamento`),
    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `razon` (
    `idRazon` INTEGER NOT NULL AUTO_INCREMENT,
    `razon` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idRazon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salidaProducto` (
    `idSalidaProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario_usuario` INTEGER NOT NULL,
    `idEntradaProducto_entradaProducto` INTEGER NOT NULL,
    `idRazon_razon` INTEGER NOT NULL,
    `fechaSalida` DATETIME(0) NOT NULL,

    INDEX `idEntradaProducto_entradaProducto`(`idEntradaProducto_entradaProducto`),
    INDEX `idRazon_razon`(`idRazon_razon`),
    INDEX `idUsuario_usuario`(`idUsuario_usuario`),
    PRIMARY KEY (`idSalidaProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidad` (
    `idUnidad` INTEGER NOT NULL AUTO_INCREMENT,
    `unidad` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`idUnidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreUsuario` VARCHAR(30) NOT NULL,
    `apellidoPaterno` VARCHAR(30) NOT NULL,
    `apellidoMaterno` VARCHAR(30) NOT NULL,
    `permisoUsuario` INTEGER NOT NULL,
    `hashPassword` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entrada` ADD CONSTRAINT `entrada_ibfk_1` FOREIGN KEY (`idUsuario_usuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradaProducto` ADD CONSTRAINT `entradaProducto_ibfk_1` FOREIGN KEY (`idEntrada_entrada`) REFERENCES `entrada`(`idEntrada`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradaProducto` ADD CONSTRAINT `entradaProducto_ibfk_2` FOREIGN KEY (`idProducto_producto`) REFERENCES `producto`(`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `entradaProducto` ADD CONSTRAINT `entradaProducto_ibfk_3` FOREIGN KEY (`idUnidad_unidad`) REFERENCES `unidad`(`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`idProducto_producto`) REFERENCES `producto`(`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`idUnidad_unidad`) REFERENCES `unidad`(`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`idUsuario_usuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idDepartamento_departamento`) REFERENCES `departamento`(`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salidaProducto` ADD CONSTRAINT `salidaProducto_ibfk_1` FOREIGN KEY (`idUsuario_usuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salidaProducto` ADD CONSTRAINT `salidaProducto_ibfk_2` FOREIGN KEY (`idEntradaProducto_entradaProducto`) REFERENCES `entradaProducto`(`idEntradaProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salidaProducto` ADD CONSTRAINT `salidaProducto_ibfk_3` FOREIGN KEY (`idRazon_razon`) REFERENCES `razon`(`idRazon`) ON DELETE NO ACTION ON UPDATE NO ACTION;
