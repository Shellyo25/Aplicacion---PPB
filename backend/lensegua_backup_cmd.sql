-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: lensegua
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_contenido`
--

DROP TABLE IF EXISTS `tbl_contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contenido` (
  `Pk_ID_contenido` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Fk_ID_leccion` int(11) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Pk_ID_contenido`),
  KEY `Fk_ID_leccion` (`Fk_ID_leccion`),
  CONSTRAINT `tbl_contenido_ibfk_1` FOREIGN KEY (`Fk_ID_leccion`) REFERENCES `tbl_lecciones` (`Pk_ID_leccion`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contenido`
--

LOCK TABLES `tbl_contenido` WRITE;
/*!40000 ALTER TABLE `tbl_contenido` DISABLE KEYS */;
INSERT INTO `tbl_contenido` VALUES (1,'Letra A',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415292/WhatsApp_Image_2025-10-13_at_9.59.47_PM_vxunhd.jpg','imagen'),(2,'Letra B',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415291/WhatsApp_Image_2025-10-13_at_9.59.47_PM_1_grwfwo.jpg','imagen'),(3,'Letra C',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415291/WhatsApp_Image_2025-10-13_at_9.59.47_PM_2_nuujwr.jpg','imagen'),(4,'Letra D',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415287/WhatsApp_Image_2025-10-13_at_9.59.47_PM_3_bsp5a6.jpg','imagen'),(5,'Letra E',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415286/WhatsApp_Image_2025-10-13_at_9.59.47_PM_4_m2ovyw.jpg','imagen'),(6,'Letra F',1,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073599/WhatsApp_Video_2026-05-17_at_9.04.06_PM_1_yzrdrx.mp4','imagen'),(7,'Letra G',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415280/WhatsApp_Image_2025-10-13_at_9.59.47_PM_9_u6fpub.jpg','imagen'),(8,'Letra H',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415275/WhatsApp_Image_2025-10-13_at_9.59.47_PM_10_s84bpz.jpg','imagen'),(9,'Letra I',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415275/WhatsApp_Image_2025-10-13_at_9.59.47_PM_11_yyrmfj.jpg','imagen'),(10,'Letra J',1,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073600/WhatsApp_Video_2026-05-17_at_9.04.06_PM_jlc6lp.mp4','imagen'),(11,'Letra K',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415269/WhatsApp_Image_2025-10-13_at_9.59.47_PM_13_lyb2l0.jpg','imagen'),(12,'Letra L',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415269/WhatsApp_Image_2025-10-13_at_9.59.47_PM_14_t49t27.jpg','imagen'),(13,'Letra LL',1,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073599/WhatsApp_Video_2026-05-17_at_9.04.06_PM_2_lqotep.mp4','imagen'),(14,'Letra M',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415264/WhatsApp_Image_2025-10-13_at_9.59.47_PM_17_xcg1h2.jpg','imagen'),(15,'Letra N',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415263/WhatsApp_Image_2025-10-13_at_9.59.47_PM_18_fnghwo.jpg','imagen'),(16,'Letra Ñ',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415263/WhatsApp_Image_2025-10-13_at_9.59.47_PM_19_un2mqz.jpg','imagen'),(17,'Letra O',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415259/WhatsApp_Image_2025-10-13_at_9.59.47_PM_20_zll8su.jpg','imagen'),(18,'Letra P',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.47_PM_21_ssa280.jpg','imagen'),(19,'Letra Q',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.48_PM_rbyius.jpg','imagen'),(20,'Letra R',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.48_PM_1_o4qcxe.jpg','imagen'),(21,'Letra RR',1,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073598/WhatsApp_Video_2026-05-17_at_9.04.06_PM_4_qoudyj.mp4','imagen'),(22,'Letra S',1,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779077249/S_xnbuy1.mp4','imagen'),(23,'Letra T',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779086192/T_yighrx.jpg','imagen'),(24,'Letra U',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415249/WhatsApp_Image_2025-10-13_at_9.59.48_PM_6_bhuhw0.jpg','imagen'),(25,'Letra V',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_7_edrbnm.jpg','imagen'),(26,'Letra W',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_8_glggkq.jpg','imagen'),(27,'Letra X',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_9_ykdmzw.jpg','imagen'),(28,'Letra Y',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_10_evslfp.jpg','imagen'),(29,'Letra Z',1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_11_fas1el.jpg','imagen'),(30,'Hola',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221330/Hola_sr3wqz.png','imagen'),(31,'Buenos días',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221315/Buenos_dias_sgfyqc.png','imagen'),(32,'Buenas tardes',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221315/Buenas_tardes_ksq6wq.png','imagen'),(33,'Buenas noches',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221313/Buenas_noches_hwxjcq.png','imagen'),(34,'Adiós',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221311/Adios_przgiu.png','imagen'),(35,'Por favor',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221336/Por_favor_bms6do.png','imagen'),(36,'De nada',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221328/de_nada_pyvkme.png','imagen'),(37,'Sí',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221336/Si_jaeiyj.png','imagen'),(38,'No',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221334/No_e6cbd3.png','imagen'),(39,'¿Necesitas ayuda?',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221333/Necesitas_ayuda_jph12w.png','imagen'),(40,'Mas o menos',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221332/Mas_o_menos_pghq5i.png','imagen'),(41,'Mal',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221331/Mal_t6isxn.png','imagen'),(42,'Bien',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221312/Bien_calanr.png','imagen'),(43,'Excelente',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221329/excelente_sytt3a.png','imagen'),(44,'Cuidado',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221327/cuidado_qx5fyd.png','imagen'),(45,'Calidad',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221327/calidad_vvuwda.png','imagen'),(46,'Bienvenido',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221313/Bienvenido_ig7lxe.png','imagen'),(47,'Te amo',2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221338/Te_amo_ueioc5.png','imagen'),(48,'Mamá',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221389/Mama_vgjzmn.png','imagen'),(49,'Papá',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221390/Papa_q0z7vu.png','imagen'),(50,'Hermano',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221386/Hermano_sevgyt.png','imagen'),(51,'Hermana',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221385/Hermana_n3l4cm.png','imagen'),(52,'Hijo',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221388/Hijo_wkogra.png','imagen'),(53,'Hija',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221387/Hija_qyggxu.png','imagen'),(54,'Abuelo',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221383/Abuelo_qusoja.png','imagen'),(55,'Abuela',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221382/Abuela_eflxcm.png','imagen'),(56,'Bebé',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221384/Bebe_xy0bnk.png','imagen'),(57,'Tio',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221392/Tio_gzir4d.png','imagen'),(58,'Tia',3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221390/Tia_q79toq.png','imagen'),(59,'Yo',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221267/Yo_flckpv.png','imagen'),(60,'Tu',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221265/Tu_hjc2fm.png','imagen'),(61,'ÉL',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221259/El_dxvkhl.png','imagen'),(62,'Ella',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221259/Ella_rdxx49.png','imagen'),(63,'Ellos',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221260/Ellos_jtqatk.png','imagen'),(64,'Ellas',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221260/Ellas_rggqfz.png','imagen'),(65,'Nosotros',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221262/nosotros_b6llug.png','imagen'),(66,'Ustedes',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221266/ustedes_a7ai5f.png','imagen'),(67,'Todos',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221264/todos_pjq06l.png','imagen'),(68,'Mío',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221261/mio_swwxs4.png','imagen'),(69,'Tuyo',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221265/Tuyo_isoqrx.png','imagen'),(70,'Nuestro',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221263/nuestro_v7dcte.png','imagen'),(71,'Este',4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221261/este_xzv0xc.png','imagen'),(72,'Rojo',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914178/rojo_oxklqy.png','imagen'),(73,'Azul',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914164/azul_qh5b7x.png','imagen'),(74,'Amarillo',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914161/amarillo_xshhah.png','imagen'),(75,'Verde',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914183/verde.pgn_qjyzrc.png','imagen'),(76,'Negro',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914176/negro_wnukd0.png','imagen'),(77,'Blanco',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914166/blanco_mlenru.png','imagen'),(78,'Naranja',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914163/anaranjado_xgmd4n.png','imagen'),(79,'Morado',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914174/morado_rhylwi.png','imagen'),(80,'Rosa',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914181/rosado_dl0pjc.png','imagen'),(81,'Café',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914169/caf%C3%A9_ph8a0q.png','imagen'),(82,'Celeste',5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914171/celeste_qwvvuc.png','imagen'),(83,'Restaurante',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928275/restaurante_kbj1gk.png','imagen'),(84,'Iglesia',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928272/iglesia_z4hka3.png','imagen'),(85,'Hotel',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928270/hotel_mbngjn.png','imagen'),(86,'Hospital',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928268/hospital_xa8pv1.png','imagen'),(87,'Escuela',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928266/escuela_taoi8a.png','imagen'),(88,'Dormitorio',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928264/dormitorio_wheli2.png','imagen'),(89,'Cuarto',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928262/cuarto_qahcpf.png','imagen'),(90,'Casa',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928260/casa_jjq0wl.jpg','imagen'),(91,'Baño',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928258/ba%C3%B1o_eetg9c.png','imagen'),(92,'Banco',6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928256/banco_qypqwp.png','imagen'),(93,'Lunes',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992875/lunes_xs5lmp.png','imagen'),(94,'Martes',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992878/martes_jk9b36.png','imagen'),(95,'Miércoles',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992880/miercoles_ynvqro.png','imagen'),(96,'Jueves',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992872/jueves_d30v7w.png','imagen'),(97,'Viernes',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992927/viernes_htizgk.png','imagen'),(98,'Sábado',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992882/sabado_aeqgov.png','imagen'),(99,'Domingo',7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992870/domingo_eg4cpk.png','imagen'),(100,'Número 0',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075288/cero_h3qny8.jpg','imagen'),(101,'Número 1',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075288/uno_jcbyfb.jpg','imagen'),(102,'Número 2',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075287/dos_v92zfn.jpg','imagen'),(103,'Número 3',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075286/tres_elcp7f.jpg','imagen'),(104,'Número 4',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075286/cuatro_kso4y1.jpg','imagen'),(105,'Número 5',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075285/cinco_itgba0.jpg','imagen'),(106,'Número 6',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075284/seis_fraxsr.jpg','imagen'),(107,'Número 7',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075284/siete_dx7kjm.jpg','imagen'),(108,'Número 8',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075283/ocho_xlqnk9.jpg','imagen'),(109,'Número 9',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075283/nueve_z4qle5.jpg','imagen'),(110,'Número 10',8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075282/diez_bw9vdz.jpg','imagen'),(111,'Número 11',8,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075281/once_xrsuem.mp4','imagen'),(112,'Número 12',8,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075281/doce_utamjc.mp4','imagen'),(113,'Número 13',8,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075280/trece_qnv2qb.mp4','imagen'),(114,'Número 14',8,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075280/catorce_drorma.mp4','imagen'),(115,'Número 15',8,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075279/quince_xrqmdx.mp4','imagen'),(116,'Tomate',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083694/tomate_vktdhr.mp4','imagen'),(117,'Cebolla',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083696/cebolla_xbqeu3.mp4','imagen'),(118,'Papa',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083689/papa_bezhoj.mp4','imagen'),(119,'Zanahoria',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083686/zanahoria_npqwg7.mp4','imagen'),(120,'pepino',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083687/pepino_amlfa9.mp4','imagen'),(121,'Ajo',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083695/ajo_gk82x7.mp4','imagen'),(122,'Lechuga',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083690/lechuga_clruns.mp4','imagen'),(123,'Elote',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083691/elote_mg0p9f.mp4','imagen'),(124,'Rabano',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083688/rabano_famfil.mp4','imagen'),(125,'Repollo',9,'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083693/repollo_plgidp.mp4','imagen');
/*!40000 ALTER TABLE `tbl_contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_lecciones`
--

DROP TABLE IF EXISTS `tbl_lecciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_lecciones` (
  `Pk_ID_leccion` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `Descripcion` text,
  `Nivel` int(11) DEFAULT '1',
  `Orden` int(11) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Pk_ID_leccion`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_lecciones`
--

LOCK TABLES `tbl_lecciones` WRITE;
/*!40000 ALTER TABLE `tbl_lecciones` DISABLE KEYS */;
INSERT INTO `tbl_lecciones` VALUES (1,'Abecedario','Aprende las primeras letras del alfabeto (A-Z) en lengua de señas guatemalteca',1,1,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),(2,'Frases de cortesía','Saludos y expresiones básicas de cortesía',1,3,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),(3,'Familia Principal','Términos familiares básicos en lengua de señas',1,5,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),(4,'Pronombres Personales Básicos','Frutas tropicales básicas en lengua de señas',1,7,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),(5,'Colores Básicos','Aprende los colores básicos en lengua de señas',1,4,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),(6,'Lugares Comunes','Nombres de lugares básicos en lengua de señas',1,6,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),(7,'Días de la semana','Los días de la semana en lengua de señas',1,25,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png'),(8,'Números Básicos','Números del 0 al 5 en lengua de señas',1,2,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),(9,'Verduras Básicas','Verduras básicas en lengua de señas',1,8,'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png');
/*!40000 ALTER TABLE `tbl_lecciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_opciones`
--

DROP TABLE IF EXISTS `tbl_opciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_opciones` (
  `Pk_ID_opciones` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_ID_usuario` int(11) DEFAULT NULL,
  `Fk_ID_tipo` int(11) DEFAULT NULL,
  `Fk_ID_leccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`Pk_ID_opciones`),
  KEY `Fk_ID_usuario` (`Fk_ID_usuario`),
  KEY `Fk_ID_tipo` (`Fk_ID_tipo`),
  KEY `Fk_ID_leccion` (`Fk_ID_leccion`),
  CONSTRAINT `tbl_opciones_ibfk_1` FOREIGN KEY (`Fk_ID_usuario`) REFERENCES `tbl_usuarios` (`Pk_ID_usuario`),
  CONSTRAINT `tbl_opciones_ibfk_2` FOREIGN KEY (`Fk_ID_tipo`) REFERENCES `tbl_tipoleccion` (`Pk_ID_tipo`),
  CONSTRAINT `tbl_opciones_ibfk_3` FOREIGN KEY (`Fk_ID_leccion`) REFERENCES `tbl_lecciones` (`Pk_ID_leccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_opciones`
--

LOCK TABLES `tbl_opciones` WRITE;
/*!40000 ALTER TABLE `tbl_opciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_opciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_progreso`
--

DROP TABLE IF EXISTS `tbl_progreso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_progreso` (
  `Pk_ID_prog` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_ID_usuario` int(11) DEFAULT NULL,
  `Fk_leccion` int(11) DEFAULT NULL,
  `Porcen_Av` decimal(5,2) DEFAULT '0.00',
  `Fecha_completado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Pk_ID_prog`),
  KEY `Fk_ID_usuario` (`Fk_ID_usuario`),
  KEY `Fk_leccion` (`Fk_leccion`),
  CONSTRAINT `tbl_progreso_ibfk_1` FOREIGN KEY (`Fk_ID_usuario`) REFERENCES `tbl_usuarios` (`Pk_ID_usuario`),
  CONSTRAINT `tbl_progreso_ibfk_2` FOREIGN KEY (`Fk_leccion`) REFERENCES `tbl_lecciones` (`Pk_ID_leccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_progreso`
--

LOCK TABLES `tbl_progreso` WRITE;
/*!40000 ALTER TABLE `tbl_progreso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_progreso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_respuestas`
--

DROP TABLE IF EXISTS `tbl_respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_respuestas` (
  `Pk_ID_resp` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_ID_tipo` int(11) DEFAULT NULL,
  `respuestaUsuario` varchar(255) DEFAULT NULL,
  `Respuesta` varchar(255) DEFAULT NULL,
  `EsCorrecta` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Pk_ID_resp`),
  KEY `Fk_ID_tipo` (`Fk_ID_tipo`),
  CONSTRAINT `tbl_respuestas_ibfk_1` FOREIGN KEY (`Fk_ID_tipo`) REFERENCES `tbl_tipoleccion` (`Pk_ID_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_respuestas`
--

LOCK TABLES `tbl_respuestas` WRITE;
/*!40000 ALTER TABLE `tbl_respuestas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipoleccion`
--

DROP TABLE IF EXISTS `tbl_tipoleccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipoleccion` (
  `Pk_ID_tipo` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Preguntas` text,
  `Puntuacion` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`Pk_ID_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipoleccion`
--

LOCK TABLES `tbl_tipoleccion` WRITE;
/*!40000 ALTER TABLE `tbl_tipoleccion` DISABLE KEYS */;
INSERT INTO `tbl_tipoleccion` VALUES (1,'Verdadero o Falso','Selecciona la respuesta correcta',10.00),(2,'Opción Múltiple','Asocia la imagen con la seña correcta',15.00),(3,'Práctica','Practica la seña mostrada',20.00);
/*!40000 ALTER TABLE `tbl_tipoleccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuarios`
--

DROP TABLE IF EXISTS `tbl_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuarios` (
  `Pk_ID_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `Apellido` varchar(100) DEFAULT NULL,
  `Usuario` varchar(50) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Rol` enum('usuario','administrador') DEFAULT 'usuario',
  `Estado` varchar(10) DEFAULT 'activo',
  `Fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Pk_ID_usuario`),
  UNIQUE KEY `Usuario` (`Usuario`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuarios`
--

LOCK TABLES `tbl_usuarios` WRITE;
/*!40000 ALTER TABLE `tbl_usuarios` DISABLE KEYS */;
INSERT INTO `tbl_usuarios` VALUES (1,'Administrador','Sistema','admin','admin@lensegua.com','$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','administrador','activo','2026-05-18 13:12:39');
/*!40000 ALTER TABLE `tbl_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-18  7:21:02
