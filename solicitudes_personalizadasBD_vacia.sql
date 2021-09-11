-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.14-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ptp
CREATE DATABASE IF NOT EXISTS `ptp` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `ptp`;

-- Volcando estructura para tabla ptp.articulos_solicitud
CREATE TABLE IF NOT EXISTS `articulos_solicitud` (
  `id_art` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_art_web` varchar(90) COLLATE utf8_spanish_ci NOT NULL,
  `alumnos_art` int(11) DEFAULT NULL,
  `obs_art` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `fk_id_solicitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_art`),
  UNIQUE KEY `id_art_UNIQUE` (`id_art`),
  KEY `SOL_ART_fk_di_solicitud_idx` (`fk_id_solicitud`),
  CONSTRAINT `SOL_ART_fk_di_solicitud` FOREIGN KEY (`fk_id_solicitud`) REFERENCES `solicitud` (`id_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=808 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.articulos_solicitud: ~730 rows (aproximadamente)
DELETE FROM `articulos_solicitud`;


-- Volcando estructura para tabla ptp.articulos_solicitud_bb
CREATE TABLE IF NOT EXISTS `articulos_solicitud_bb` (
  `fk_id_art` int(11) NOT NULL,
  `fk_id_licencia_bb` int(11) DEFAULT NULL,
  `ean_bb` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `isbn_bb` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `dto_bb` decimal(8,2) DEFAULT NULL,
  `id_product_bb` int(11) DEFAULT NULL,
  `id_cdkey_group_bb` int(11) DEFAULT NULL,
  `fk_id_libro_bb` int(11) NOT NULL,
  `precio_art` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`fk_id_art`),
  KEY `ART_ART_SOL_fk_id_art_idx` (`fk_id_art`),
  KEY `LIB_BB_ART_SOL_BB_fk_id_lib` (`fk_id_libro_bb`),
  KEY `LIC_BB_ART_SOL_BB_fk_id_lic_bb` (`fk_id_licencia_bb`),
  CONSTRAINT `ART_ART_SOL_fk_id_art` FOREIGN KEY (`fk_id_art`) REFERENCES `articulos_solicitud` (`id_art`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `LIB_BB_ART_SOL_BB_fk_id_lib` FOREIGN KEY (`fk_id_libro_bb`) REFERENCES `libro_bbb` (`id_libro_bb`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `LIC_BB_ART_SOL_BB_fk_id_lic_bb` FOREIGN KEY (`fk_id_licencia_bb`) REFERENCES `licencia_bb` (`id_licencia_bb`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.articulos_solicitud_bb: ~621 rows (aproximadamente)
DELETE FROM `articulos_solicitud_bb`;
/*!40000 ALTER TABLE `articulos_solicitud_bb` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulos_solicitud_bb` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.articulos_solicitud_be
CREATE TABLE IF NOT EXISTS `articulos_solicitud_be` (
  `fk_id_art` int(11) NOT NULL,
  `fk_id_micro` int(11) DEFAULT NULL,
  `fk_id_envio_be` int(11) DEFAULT NULL,
  `fecha_inicio_be` datetime DEFAULT NULL,
  `fecha_fin_be` datetime DEFAULT NULL,
  `fk_id_licencia_be` int(11) DEFAULT NULL,
  PRIMARY KEY (`fk_id_art`),
  KEY `ART_ART_SOL_BE_fk_id_art_idx` (`fk_id_art`),
  KEY `ENVIO_BE_ART_SOL_BE_fk_id_envio_be` (`fk_id_envio_be`),
  KEY `MICRO_ART_SOL_BE_fk_id_micro` (`fk_id_micro`),
  KEY `FK_articulos_solicitud_be_licencia_be` (`fk_id_licencia_be`),
  CONSTRAINT `ART_ART_SOL_BE_fk_id_art` FOREIGN KEY (`fk_id_art`) REFERENCES `articulos_solicitud` (`id_art`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ENVIO_BE_ART_SOL_BE_fk_id_envio_be` FOREIGN KEY (`fk_id_envio_be`) REFERENCES `envio_be` (`id_envio_be`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_articulos_solicitud_be_licencia_be` FOREIGN KEY (`fk_id_licencia_be`) REFERENCES `licencia_be` (`id_licencia_be`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `MICRO_ART_SOL_BE_fk_id_micro` FOREIGN KEY (`fk_id_micro`) REFERENCES `microfono` (`id_micro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.articulos_solicitud_be: ~109 rows (aproximadamente)
DELETE FROM `articulos_solicitud_be`;
/*!40000 ALTER TABLE `articulos_solicitud_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulos_solicitud_be` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.art_sol_be_libro_be
CREATE TABLE IF NOT EXISTS `art_sol_be_libro_be` (
  `pk_fk_id_combinacion` int(11) NOT NULL,
  `pk_fk_id_curso` int(11) NOT NULL,
  PRIMARY KEY (`pk_fk_id_curso`,`pk_fk_id_combinacion`),
  KEY `art_sol_be-art_sol_be_libro_be-pk_fk_id_art` (`pk_fk_id_combinacion`),
  CONSTRAINT `art_sol_be-art_sol_be_libro_be-pk_fk_id_art` FOREIGN KEY (`pk_fk_id_combinacion`) REFERENCES `articulos_solicitud_be` (`fk_id_art`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `curso_be-art_sol_be_libro_be-fk_id_curso` FOREIGN KEY (`pk_fk_id_curso`) REFERENCES `curso_be` (`id_curso_be`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.art_sol_be_libro_be: ~208 rows (aproximadamente)
DELETE FROM `art_sol_be_libro_be`;
/*!40000 ALTER TABLE `art_sol_be_libro_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `art_sol_be_libro_be` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.cambioestado
CREATE TABLE IF NOT EXISTS `cambioestado` (
  `fk_id_solicitud` int(11) NOT NULL,
  `fk_id_estado` int(11) NOT NULL,
  `fecha_cambioestado` datetime NOT NULL,
  PRIMARY KEY (`fk_id_solicitud`,`fk_id_estado`,`fecha_cambioestado`),
  KEY `EST_CE_fk_id_est` (`fk_id_estado`),
  CONSTRAINT `EST_CE_fk_id_est` FOREIGN KEY (`fk_id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SOL_CE_fk_id_sol` FOREIGN KEY (`fk_id_solicitud`) REFERENCES `solicitud` (`id_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla ptp.cambioestado: ~767 rows (aproximadamente)
DELETE FROM `cambioestado`;
/*!40000 ALTER TABLE `cambioestado` DISABLE KEYS */;
/*!40000 ALTER TABLE `cambioestado` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.colegio
CREATE TABLE IF NOT EXISTS `colegio` (
  `id_colegio` int(11) NOT NULL,
  `spain_colegio` int(11) DEFAULT NULL,
  `n_colegio` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cp_colegio` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `num_ofi_colegio` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_shop` int(10) DEFAULT 0,
  `branch` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_colegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.colegio: ~27.910 rows (aproximadamente)
DELETE FROM `colegio`;
/*!40000 ALTER TABLE `colegio` DISABLE KEYS */;
/*!40000 ALTER TABLE `colegio` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.curso_be
CREATE TABLE IF NOT EXISTS `curso_be` (
  `id_curso_be` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso_be` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `fk_id_tipo_curso_be` int(11) NOT NULL,
  `activo_curso_be` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_curso_be`),
  KEY `tipo_curso_be-curso_be-fk_id_tipo_curso_be` (`fk_id_tipo_curso_be`),
  CONSTRAINT `tipo_curso_be-curso_be-fk_id_tipo_curso_be` FOREIGN KEY (`fk_id_tipo_curso_be`) REFERENCES `tipo_curso_be` (`id_tipo_curso_be`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.curso_be: ~93 rows (aproximadamente)
DELETE FROM `curso_be`;
/*!40000 ALTER TABLE `curso_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `curso_be` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.envio_be
CREATE TABLE IF NOT EXISTS `envio_be` (
  `id_envio_be` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_envio_be` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo_tipo_envio_be` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_envio_be`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.envio_be: ~4 rows (aproximadamente)
DELETE FROM `envio_be`;
/*!40000 ALTER TABLE `envio_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio_be` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.estado
CREATE TABLE IF NOT EXISTS `estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_estado` varchar(60) COLLATE utf8_spanish_ci DEFAULT NULL,
  `activo_estado` tinyint(1) NOT NULL DEFAULT 1,
  `orden_estado` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_estado`),
  UNIQUE KEY `id_estado_UNIQUE` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.estado: ~7 rows (aproximadamente)
DELETE FROM `estado`;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.libro_bbb
CREATE TABLE IF NOT EXISTS `libro_bbb` (
  `id_libro_bb` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_libro_bb` varchar(141) DEFAULT NULL,
  `precio_bb` varchar(9) DEFAULT NULL,
  `id_product` int(4) DEFAULT NULL,
  `id_product_attribute` varchar(5) DEFAULT NULL,
  `isbn` varchar(14) DEFAULT NULL,
  `ean` bigint(13) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id_libro_bb`),
  UNIQUE KEY `id_libro_bb` (`id_libro_bb`)
) ENGINE=InnoDB AUTO_INCREMENT=2035 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla ptp.libro_bbb: ~1.945 rows (aproximadamente)
DELETE FROM `libro_bbb`;
/*!40000 ALTER TABLE `libro_bbb` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.licencia_bb
CREATE TABLE IF NOT EXISTS `licencia_bb` (
  `id_licencia_bb` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_licencia_bb` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo_licencia_bb` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_licencia_bb`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.licencia_bb: ~8 rows (aproximadamente)
DELETE FROM `licencia_bb`;
/*!40000 ALTER TABLE `licencia_bb` DISABLE KEYS */;
/*!40000 ALTER TABLE `licencia_bb` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.licencia_be
CREATE TABLE IF NOT EXISTS `licencia_be` (
  `id_licencia_be` int(11) NOT NULL AUTO_INCREMENT,
  `duracion_licencia_be` int(11) NOT NULL,
  `tipo_licencia_be` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `precio_licencia_be` int(11) NOT NULL,
  `componentes_licencia_be` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `partida_licencia_be` tinyint(1) NOT NULL,
  `activo_licencia_be` tinyint(1) NOT NULL DEFAULT 1,
  `privada_licencia_be` tinyint(1) NOT NULL DEFAULT 0,
  `cod_a3_licencia_be` int(10) DEFAULT 0,
  `desc_cod_a3_licencia_be` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_licencia_be`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.licencia_be: ~15 rows (aproximadamente)
DELETE FROM `licencia_be`;
/*!40000 ALTER TABLE `licencia_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `licencia_be` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.microfono
CREATE TABLE IF NOT EXISTS `microfono` (
  `id_micro` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_micro` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo_micro` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_micro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.microfono: ~4 rows (aproximadamente)
DELETE FROM `microfono`;
/*!40000 ALTER TABLE `microfono` DISABLE KEYS */;
/*!40000 ALTER TABLE `microfono` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.negocio
CREATE TABLE IF NOT EXISTS `negocio` (
  `id_area_negocio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_area_negocio` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo_area_negocio` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_area_negocio`),
  UNIQUE KEY `id_area_negocio_UNIQUE` (`id_area_negocio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.negocio: ~2 rows (aproximadamente)
DELETE FROM `negocio`;
/*!40000 ALTER TABLE `negocio` DISABLE KEYS */;
/*!40000 ALTER TABLE `negocio` ENABLE KEYS */;


-- Volcando estructura para tabla ptp.solicitante
CREATE TABLE IF NOT EXISTS `solicitante` (
  `id_sol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_sol` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellidos_sol` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `mail_sol` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fk_id_sucursal` int(11) DEFAULT NULL,
  `activo_sol` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_sol`),
  UNIQUE KEY `id_sol_UNIQUE` (`id_sol`),
  KEY `SUCURSAL_id_SOLICITANTE_fk_id_sucursal_idx` (`fk_id_sucursal`),
  CONSTRAINT `SUCURSAL_id_SOLICITANTE_fk_id_sucursal` FOREIGN KEY (`fk_id_sucursal`) REFERENCES `sucursal` (`id_sucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=swe7;

-- Volcando datos para la tabla ptp.solicitante: ~114 rows (aproximadamente)
DELETE FROM `solicitante`;
/*!40000 ALTER TABLE `solicitante` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitante` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.solicitud
CREATE TABLE IF NOT EXISTS `solicitud` (
  `id_solicitud` int(11) NOT NULL AUTO_INCREMENT,
  `spain_centro` int(11) NOT NULL,
  `fecha_solicitud` datetime NOT NULL,
  `nombre_centro` varchar(90) COLLATE utf8_spanish_ci NOT NULL,
  `numero_oficial_centro` int(11) DEFAULT NULL,
  `fk_id_sol` int(11) DEFAULT NULL,
  `fk_id_estado` int(11) DEFAULT NULL,
  `fk_id_sol_asign` int(11) DEFAULT NULL,
  `fk_id_area_negocio` int(11) DEFAULT NULL,
  `num_tienda` int(11) DEFAULT NULL,
  `web_tienda` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `obs_solicitud` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `urgente_solicitud` tinyint(1) DEFAULT 0,
  `registro_solicitud` text COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`),
  UNIQUE KEY `id_solicitud_UNIQUE` (`id_solicitud`),
  KEY `SOL_SOLI_fk_id_sol_idx` (`fk_id_sol`),
  KEY `EST_SOL_fk_id_estado_idx` (`fk_id_estado`),
  KEY `NEG_SOL_fk_id_area_negocio_idx` (`fk_id_area_negocio`),
  KEY `SOL_SOLI_fk_id_sol_asign` (`fk_id_sol_asign`),
  CONSTRAINT `EST_SOL_fk_id_estado` FOREIGN KEY (`fk_id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `NEG_SOL_fk_id_area_negocio` FOREIGN KEY (`fk_id_area_negocio`) REFERENCES `negocio` (`id_area_negocio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SOL_SOLI_fk_id_sol` FOREIGN KEY (`fk_id_sol`) REFERENCES `solicitante` (`id_sol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SOL_SOLI_fk_id_sol_asign` FOREIGN KEY (`fk_id_sol_asign`) REFERENCES `solicitante` (`id_sol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.solicitud: ~181 rows (aproximadamente)
DELETE FROM `solicitud`;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.sucursal
CREATE TABLE IF NOT EXISTS `sucursal` (
  `id_sucursal` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_sucursal` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  UNIQUE KEY `id_sucursal_UNIQUE` (`id_sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.sucursal: ~10 rows (aproximadamente)
DELETE FROM `sucursal`;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;

-- Volcando estructura para tabla ptp.tipo_curso_be
CREATE TABLE IF NOT EXISTS `tipo_curso_be` (
  `id_tipo_curso_be` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_curso_be` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo_tipo_curso_be` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_tipo_curso_be`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla ptp.tipo_curso_be: ~3 rows (aproximadamente)
DELETE FROM `tipo_curso_be`;
/*!40000 ALTER TABLE `tipo_curso_be` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_curso_be` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
