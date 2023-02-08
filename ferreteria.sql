CREATE DATABASE  IF NOT EXISTS `ferreteria`;
USE `ferreteria`;

DROP TABLE IF EXISTS `ferreteria`.`producto_categoria`;
DROP TABLE IF EXISTS `ferreteria`.`categorias`;
DROP TABLE IF EXISTS `ferreteria`.`carritos`;
DROP TABLE IF EXISTS `ferreteria`.`detalle_venta`;
DROP TABLE IF EXISTS `ferreteria`.`productos`;
DROP TABLE IF EXISTS `ferreteria`.`ventas`;
DROP TABLE IF EXISTS `ferreteria`.`usuarios`;
DROP TABLE IF EXISTS `ferreteria`.`categoria_usuario`;


CREATE TABLE `ferreteria`.`categorias` (
  `categoria_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoria_id`));



CREATE TABLE `ferreteria`.`categoria_usuario` (
  `categoria_usuario_id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoria_usuario_id`));



CREATE TABLE `ferreteria`.`usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `localidad` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `edad` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `usuariocol` VARCHAR(45) NULL,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `ferreteria`.`categoria_usuario` (`categoria_usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




CREATE TABLE `ferreteria`.`ventas` (
  `venta_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `total` DECIMAL(2) NOT NULL,
  PRIMARY KEY (`venta_id`),
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ferreteria`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




CREATE TABLE `ferreteria`.`productos` (
  `producto_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  `tamanio` VARCHAR(30) NOT NULL,
  `color` VARCHAR(30) NULL,
  `precio` DECIMAL NOT NULL,
  `fabricante` VARCHAR(45) NULL,
  `modelo` VARCHAR(45) NULL,
  `stock` INT NULL,
  `descuento` INT NULL,
  `imagen` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(300) NULL,
  PRIMARY KEY (`producto_id`));




CREATE TABLE `ferreteria`.`detalle_venta` (
  `detalle_venta_id` INT NOT NULL AUTO_INCREMENT,
  `venta_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL NOT NULL,
  `precio_total` DECIMAL(2) NOT NULL,
  PRIMARY KEY (`detalle_venta_id`),
  CONSTRAINT `venta_id`
    FOREIGN KEY (`venta_id`)
    REFERENCES `ferreteria`.`ventas` (`venta_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `ferreteria`.`productos` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE `ferreteria`.`carritos` (
  `carrito_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `estado` BINARY NULL,
  `precio` DECIMAL NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`carrito_id`),
  CONSTRAINT `producto_id_fk`
    FOREIGN KEY (`producto_id`)
    REFERENCES `ferreteria`.`productos` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usuario_id_fk`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ferreteria`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    
    CREATE TABLE `ferreteria`.`producto_categoria` (
  `producto_categoria_id` INT NOT NULL AUTO_INCREMENT,
  `producto_fk` INT NOT NULL,
  `categoria_fk` INT NOT NULL,
  PRIMARY KEY (`producto_categoria_id`),
  CONSTRAINT `producto_fk`
    FOREIGN KEY (`producto_fk`)
    REFERENCES `ferreteria`.`productos` (`producto_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `categoria_fk`
    FOREIGN KEY (`categoria_fk`)
    REFERENCES `ferreteria`.`categorias` (`categoria_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
    
INSERT INTO `productos` VALUES 	(1,'Taladro','Forest','2500w','Azul',7500,'Pedrito','6ksv',5,20,'/images/taladro.jpg','El mejor taladro'),
(2, "Pintura", "Alba", '20Ls', 'Blanco', 19800, 'Ind. Argentina', 'wer', 12, 10, "/images/pintura-alba.png", "Su exclusiva FORMULA AVANZADA, única en el mercado, utiliza la tecnología más moderna en desarrollo y elaboración de pinturas; permite obtener un producto: Con excelente poder cubriente, nivelación y gran lavabilidad, de óptimo poder antihongo, fácil de aplicar y de rápido secado. No salpica. No deja olor."),
(4,'Cortadora de ceramicos', 'Zonta', '64cm', 'Rojo', 61200, 'Ind. Arg', 'mlo', 6, 20, "/images/cortadoraderamica.jpg", "Cortadora de cerámicos con regla de aluminio para una mejor graduación de cortes en ángulo y con carrito trazador. Consta de un tronzador para lograr cortes perfectos en materiales duros. Su corte máximo es de 64 cm. Su pieza de corte es una rueda de tungsteno y posee como superficie de apoyo una almohadilla de goma eva. Corta materiales como porcelanatos y cerámicos blandos, duros y semiduros. Con diseño moderno y ergonómico y de gran durabilidad."),
(5, 'Taladro', 'Omaha', '1800w', 'Rojo', 28000, 'Ind. Argentina', "RM-32PLUS", 6, 0, "/images/taladro.jpg", "Este rotomartillo Omaha  es lo que necesitás para encarar trabajos pesados, seas una persona aficionada o un profesional. Su funcionamiento es muy similar al de un taladro, solo que esta herramienta es más potente y permite trabajar en materiales más firmes.Ahora edición limitada con sierra copa de 65mm y su respecto eje de 300mm, ideal para trabajos de instalación de equipos de refrigeración.");

INSERT INTO `categorias` VALUES (1,'herramientas'), (2,'pintura'), (3,'jardineria'), (4,'piletas'), (5,'griferia');

INSERT INTO `categoria_usuario` VALUES (1,'administrador'), (2,'cliente');

INSERT INTO `producto_categoria` VALUES (1,1,1), (2,1,2), (3,4,1);
INSERT INTO `producto_categoria` VALUES (4,2,2), (5,2,4), (6,4,1), (7,5,1);

