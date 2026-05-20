-- BD_PPB_FULL.sql - Base de datos completa para LENSEGUA
-- Script completo con todas las lecciones y contenido

DROP DATABASE IF EXISTS lensegua;
CREATE DATABASE lensegua;
USE lensegua;

-- TABLA DE USUARIOS
CREATE TABLE Tbl_usuarios (
    Pk_ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Usuario VARCHAR(50) UNIQUE,
    Correo VARCHAR(100) UNIQUE,
    Contrasena VARCHAR(255),
    Rol ENUM('usuario', 'administrador') DEFAULT 'usuario',
    Estado VARCHAR(10) DEFAULT 'activo',
    Fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE LECCIONES
CREATE TABLE Tbl_lecciones (
    Pk_ID_leccion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Descripcion TEXT,
    Nivel INT DEFAULT 1,
    Orden INT,
    Imagen VARCHAR(255)
);

-- TABLA DE CONTENIDO
CREATE TABLE Tbl_contenido (
    Pk_ID_contenido INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(255),
    Fk_ID_leccion INT,
    Imagen VARCHAR(255),
    Tipo VARCHAR(50),
    FOREIGN KEY (Fk_ID_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);

-- TABLA DE TIPOS DE LECCIÓN
CREATE TABLE Tbl_TipoLeccion (
    Pk_ID_tipo INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(100),
    Preguntas TEXT,
    Puntuacion DECIMAL(5,2) DEFAULT 0
);

-- TABLA DE OPCIONES
CREATE TABLE Tbl_Opciones (
    Pk_ID_opciones INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_ID_tipo INT,
    Fk_ID_leccion INT,
    FOREIGN KEY (Fk_ID_usuario) REFERENCES Tbl_usuarios(Pk_ID_usuario),
    FOREIGN KEY (Fk_ID_tipo) REFERENCES Tbl_TipoLeccion(Pk_ID_tipo),
    FOREIGN KEY (Fk_ID_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);

-- TABLA DE RESPUESTAS
CREATE TABLE Tbl_Respuestas (
    Pk_ID_resp INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_tipo INT,
    respuestaUsuario VARCHAR(255),
    Respuesta VARCHAR(255),
    EsCorrecta BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Fk_ID_tipo) REFERENCES Tbl_TipoLeccion(Pk_ID_tipo)
);

-- TABLA DE PROGRESO
CREATE TABLE Tbl_Progreso (
    Pk_ID_prog INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_leccion INT,
    Porcen_Av DECIMAL(5,2) DEFAULT 0,
    Fecha_completado TIMESTAMP NULL,
    FOREIGN KEY (Fk_ID_usuario) REFERENCES Tbl_usuarios(Pk_ID_usuario),
    FOREIGN KEY (Fk_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);

-- INSERTAR LECCIONES COMPLETAS
INSERT INTO Tbl_lecciones (Nombre, Descripcion, Nivel, Orden, Imagen) VALUES
-- ABECEDARIO (3 lecciones)
('Abecedario', 'Aprende las primeras letras del alfabeto (A-Z) en lengua de señas guatemalteca', 1, 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),
-- ('Abecedario Intermedio', 'Continúa aprendiendo las letras del alfabeto (F-M) en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario2.png'),
-- ('Abecedario Avanzado', 'Completa el alfabeto (N-Z) en lengua de señas guatemalteca', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario3.png'),

-- CORTESÍA (3 lecciones)
('Frases de cortesía', 'Saludos y expresiones básicas de cortesía', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),
-- ('Conversación Diaria', 'Frases para conversaciones cotidianas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia2.png'),
-- ('Expresiones de Cortesía', 'Expresiones avanzadas de cortesía y agradecimiento', 1, 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia3.png'),

-- FAMILIA (3 lecciones)
('Familia Principal', 'Términos familiares básicos en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),
-- ('Familia Extendida', 'Términos de familia extendida en lengua de señas', 1, 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia2.png'),
-- ('Relaciones Familiares', 'Relaciones y parentescos complejos en lengua de señas', 1, 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia3.png'),

-- Pronombres (3 lecciones)
('Pronombres Personales Básicos', 'Frutas tropicales básicas en lengua de señas', 1, 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),
-- ('Frutas de Temporada', 'Frutas de temporada en lengua de señas', 1, 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas2.png'),
-- ('Frutas Exóticas', 'Frutas exóticas y especiales en lengua de señas', 1, 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas3.png'),

-- COLORES (3 lecciones)
('Colores Básicos', 'Aprende los colores básicos en lengua de señas', 1, 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),
-- ('Colores Secundarios', 'Colores intermedios y combinaciones en lengua de señas', 1, 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores2.png'),
-- ('Colores Especiales', 'Colores especiales y matices en lengua de señas', 1, 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores3.png'),

-- LUGARES (3 lecciones)
('Lugares Comunes', 'Nombres de lugares básicos en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),
-- ('Lugares Públicos', 'Lugares públicos y servicios en lengua de señas', 1, 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares2.png'),
-- ('Lugares Especiales', 'Lugares especiales y turísticos en lengua de señas', 1, 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares3.png'),

-- TIEMPO (3 lecciones)
('Días de la semana', 'Los días de la semana en lengua de señas', 1, 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png'),
-- ('Meses del Año', 'Los meses del año en lengua de señas', 1, 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/meses.png'),
-- ('Tiempo y Estaciones', 'Conceptos de tiempo y estaciones en lengua de señas', 1, 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo.png'),

-- NÚMEROS (3 lecciones)
('Números Básicos', 'Números del 0 al 5 en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),
-- ('Números Intermedios', 'Números del 6 al 15 en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros2.png'),
-- ('Números Avanzados', 'Números del 16 al 30 en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros3.png'),

-- VERDURAS (3 lecciones)
('Verduras Básicas', 'Verduras básicas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png');
-- ('Verduras de Hoja', 'Verduras de hoja verde en lengua de señas', 1, 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras2.png'),
-- ('Verduras de Raíz', 'Verduras de raíz y tubérculos en lengua de señas', 1, 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras3.png'),

-- INSERTAR CONTENIDO COMPLETO DE LECCIONES
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
-- ABECEDARIO BÁSICO (Lección 1)
('Letra A', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415292/WhatsApp_Image_2025-10-13_at_9.59.47_PM_vxunhd.jpg', 'imagen'),
('Letra B', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415291/WhatsApp_Image_2025-10-13_at_9.59.47_PM_1_grwfwo.jpg', 'imagen'),
('Letra C', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415291/WhatsApp_Image_2025-10-13_at_9.59.47_PM_2_nuujwr.jpg', 'imagen'),
('Letra D', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415287/WhatsApp_Image_2025-10-13_at_9.59.47_PM_3_bsp5a6.jpg', 'imagen'),
('Letra E', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415286/WhatsApp_Image_2025-10-13_at_9.59.47_PM_4_m2ovyw.jpg', 'imagen'),
('Letra F', 1, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073599/WhatsApp_Video_2026-05-17_at_9.04.06_PM_1_yzrdrx.mp4', 'imagen'),
('Letra G', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415280/WhatsApp_Image_2025-10-13_at_9.59.47_PM_9_u6fpub.jpg', 'imagen'),
('Letra H', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415275/WhatsApp_Image_2025-10-13_at_9.59.47_PM_10_s84bpz.jpg', 'imagen'),
('Letra I', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415275/WhatsApp_Image_2025-10-13_at_9.59.47_PM_11_yyrmfj.jpg', 'imagen'),
('Letra J', 1, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073600/WhatsApp_Video_2026-05-17_at_9.04.06_PM_jlc6lp.mp4', 'imagen'),
('Letra K', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415269/WhatsApp_Image_2025-10-13_at_9.59.47_PM_13_lyb2l0.jpg', 'imagen'),
('Letra L', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415269/WhatsApp_Image_2025-10-13_at_9.59.47_PM_14_t49t27.jpg', 'imagen'),
('Letra LL', 1, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073599/WhatsApp_Video_2026-05-17_at_9.04.06_PM_2_lqotep.mp4', 'imagen'),
('Letra M', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415264/WhatsApp_Image_2025-10-13_at_9.59.47_PM_17_xcg1h2.jpg', 'imagen'),

('Letra N', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415263/WhatsApp_Image_2025-10-13_at_9.59.47_PM_18_fnghwo.jpg', 'imagen'),
('Letra Ñ', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415263/WhatsApp_Image_2025-10-13_at_9.59.47_PM_19_un2mqz.jpg', 'imagen'),
('Letra O', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415259/WhatsApp_Image_2025-10-13_at_9.59.47_PM_20_zll8su.jpg', 'imagen'),
('Letra P', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.47_PM_21_ssa280.jpg', 'imagen'),
('Letra Q', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.48_PM_rbyius.jpg', 'imagen'),
('Letra R', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415257/WhatsApp_Image_2025-10-13_at_9.59.48_PM_1_o4qcxe.jpg', 'imagen'),
('Letra RR', 1, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779073598/WhatsApp_Video_2026-05-17_at_9.04.06_PM_4_qoudyj.mp4', 'imagen'),
('Letra S', 1, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779077249/S_xnbuy1.mp4', 'imagen'),
('Letra T', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779086192/T_yighrx.jpg', 'imagen'),
('Letra U', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415249/WhatsApp_Image_2025-10-13_at_9.59.48_PM_6_bhuhw0.jpg', 'imagen'),
('Letra V', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_7_edrbnm.jpg', 'imagen'),
('Letra W', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_8_glggkq.jpg', 'imagen'),
('Letra X', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_9_ykdmzw.jpg', 'imagen'),
('Letra Y', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_10_evslfp.jpg', 'imagen'),
('Letra Z', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415248/WhatsApp_Image_2025-10-13_at_9.59.48_PM_11_fas1el.jpg', 'imagen'),

-- FRASES DE CORTESÍA (Lección 2)
('Hola', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221330/Hola_sr3wqz.png', 'imagen'),
('Buenos días', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221315/Buenos_dias_sgfyqc.png', 'imagen'),
('Buenas tardes', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221315/Buenas_tardes_ksq6wq.png', 'imagen'),
('Buenas noches', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221313/Buenas_noches_hwxjcq.png', 'imagen'),
('Adiós', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221311/Adios_przgiu.png', 'imagen'),

('Por favor', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221336/Por_favor_bms6do.png', 'imagen'),
-- ('Gracias', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_gracias.png', 'imagen'),
('De nada', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221328/de_nada_pyvkme.png', 'imagen'),
('Sí', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221336/Si_jaeiyj.png', 'imagen'),
('No', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221334/No_e6cbd3.png', 'imagen'),
('¿Necesitas ayuda?', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221333/Necesitas_ayuda_jph12w.png', 'imagen'),
('Mas o menos', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221332/Mas_o_menos_pghq5i.png', 'imagen'),
('Mal', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221331/Mal_t6isxn.png', 'imagen'),
('Bien', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221312/Bien_calanr.png', 'imagen'),
('Excelente', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221329/excelente_sytt3a.png', 'imagen'),
('Cuidado', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221327/cuidado_qx5fyd.png', 'imagen'),
('Calidad', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221327/calidad_vvuwda.png', 'imagen'),
('Bienvenido', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221313/Bienvenido_ig7lxe.png', 'imagen'),
('Te amo', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221338/Te_amo_ueioc5.png', 'imagen'),

-- FAMILIA INMEDIATA (Lección 3)
('Mamá', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221389/Mama_vgjzmn.png', 'imagen'),
('Papá', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221390/Papa_q0z7vu.png', 'imagen'),
('Hermano', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221386/Hermano_sevgyt.png', 'imagen'),
('Hermana', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221385/Hermana_n3l4cm.png', 'imagen'),
('Hijo', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221388/Hijo_wkogra.png', 'imagen'),
('Hija', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221387/Hija_qyggxu.png', 'imagen'),
('Abuelo', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221383/Abuelo_qusoja.png', 'imagen'),
('Abuela', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221382/Abuela_eflxcm.png', 'imagen'),
('Bebé', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221384/Bebe_xy0bnk.png', 'imagen'),
('Tio', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221392/Tio_gzir4d.png', 'imagen'),
('Tia', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221390/Tia_q79toq.png', 'imagen'),

-- Pronombres Personales (Lección 4)
('Yo', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221267/Yo_flckpv.png', 'imagen'),
('Tu', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221265/Tu_hjc2fm.png', 'imagen'),
('ÉL', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221259/El_dxvkhl.png', 'imagen'),
('Ella', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221259/Ella_rdxx49.png', 'imagen'),
('Ellos', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221260/Ellos_jtqatk.png', 'imagen'),
('Ellas', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221260/Ellas_rggqfz.png', 'imagen'),

('Nosotros', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221262/nosotros_b6llug.png', 'imagen'),
('Ustedes', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221266/ustedes_a7ai5f.png', 'imagen'),
('Todos', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221264/todos_pjq06l.png', 'imagen'),
('Mío', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221261/mio_swwxs4.png', 'imagen'),
('Tuyo', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221265/Tuyo_isoqrx.png', 'imagen'),
('Nuestro', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221263/nuestro_v7dcte.png', 'imagen'),
('Este', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221261/este_xzv0xc.png', 'imagen'),

-- COLORES  (Lección 5)
('Rojo', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914178/rojo_oxklqy.png', 'imagen'),
('Azul', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914164/azul_qh5b7x.png', 'imagen'),
('Amarillo', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914161/amarillo_xshhah.png', 'imagen'),
('Verde', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914183/verde.pgn_qjyzrc.png', 'imagen'),
('Negro', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914176/negro_wnukd0.png', 'imagen'),
('Blanco', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914166/blanco_mlenru.png', 'imagen'),
('Naranja', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914163/anaranjado_xgmd4n.png', 'imagen'),
('Morado', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914174/morado_rhylwi.png', 'imagen'),
('Rosa', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914181/rosado_dl0pjc.png', 'imagen'),
('Café', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914169/caf%C3%A9_ph8a0q.png', 'imagen'),
('Celeste', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914171/celeste_qwvvuc.png', 'imagen'),

-- LUGARES COMUNES (Lección 6)
('Restaurante', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928275/restaurante_kbj1gk.png', 'imagen'),
('Iglesia', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928272/iglesia_z4hka3.png', 'imagen'),
('Hotel', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928270/hotel_mbngjn.png', 'imagen'),
('Hospital', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928268/hospital_xa8pv1.png', 'imagen'),
('Escuela', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928266/escuela_taoi8a.png', 'imagen'),
('Dormitorio', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928264/dormitorio_wheli2.png', 'imagen'),
('Cuarto', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928262/cuarto_qahcpf.png', 'imagen'),
('Casa', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928260/casa_jjq0wl.jpg', 'imagen'),
('Baño', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928258/ba%C3%B1o_eetg9c.png', 'imagen'),
('Banco', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928256/banco_qypqwp.png', 'imagen'),

-- DÍAS DE LA SEMANA (Lección 7)
('Lunes', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992875/lunes_xs5lmp.png', 'imagen'),
('Martes', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992878/martes_jk9b36.png', 'imagen'),
('Miércoles', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992880/miercoles_ynvqro.png', 'imagen'),
('Jueves', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992872/jueves_d30v7w.png', 'imagen'),
('Viernes', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992927/viernes_htizgk.png', 'imagen'),
('Sábado', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992882/sabado_aeqgov.png', 'imagen'),
('Domingo', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992870/domingo_eg4cpk.png', 'imagen'),

-- NÚMEROS BÁSICOS (Lección 8)
('Número 0', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075288/cero_h3qny8.jpg', 'imagen'),
('Número 1', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075288/uno_jcbyfb.jpg', 'imagen'),
('Número 2', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075287/dos_v92zfn.jpg', 'imagen'),
('Número 3', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075286/tres_elcp7f.jpg', 'imagen'),
('Número 4', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075286/cuatro_kso4y1.jpg', 'imagen'),
('Número 5', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075285/cinco_itgba0.jpg', 'imagen'),

('Número 6', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075284/seis_fraxsr.jpg', 'imagen'),
('Número 7', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075284/siete_dx7kjm.jpg', 'imagen'),
('Número 8', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075283/ocho_xlqnk9.jpg', 'imagen'),
('Número 9', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075283/nueve_z4qle5.jpg', 'imagen'),
('Número 10', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075282/diez_bw9vdz.jpg', 'imagen'),
('Número 11', 8, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075281/once_xrsuem.mp4', 'imagen'),
('Número 12', 8, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075281/doce_utamjc.mp4', 'imagen'),
('Número 13', 8, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075280/trece_qnv2qb.mp4', 'imagen'),
('Número 14', 8, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075280/catorce_drorma.mp4', 'imagen'),
('Número 15', 8, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779075279/quince_xrqmdx.mp4', 'imagen'),

-- VERDURAS (Lección 9)
('Tomate', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083694/tomate_vktdhr.mp4', 'imagen'),
('Cebolla', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083696/cebolla_xbqeu3.mp4', 'imagen'),
('Papa', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083689/papa_bezhoj.mp4', 'imagen'),
('Zanahoria', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083686/zanahoria_npqwg7.mp4', 'imagen'),
('pepino', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083687/pepino_amlfa9.mp4', 'imagen'),
('Ajo', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083695/ajo_gk82x7.mp4', 'imagen'),

('Lechuga', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083690/lechuga_clruns.mp4', 'imagen'),
('Elote', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083691/elote_mg0p9f.mp4', 'imagen'),
('Rabano', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083688/rabano_famfil.mp4', 'imagen'),
('Repollo', 9, 'https://res.cloudinary.com/dz2qmueau/video/upload/v1779083693/repollo_plgidp.mp4', 'imagen');



-- INSERTAR TIPOS DE LECCIÓN
INSERT INTO Tbl_TipoLeccion (Descripcion, Preguntas, Puntuacion) VALUES
('Verdadero o Falso', 'Selecciona la respuesta correcta', 10.0),
('Opción Múltiple', 'Asocia la imagen con la seña correcta', 15.0),
('Práctica', 'Practica la seña mostrada', 20.0);

-- INSERTAR USUARIO ADMINISTRADOR
INSERT INTO Tbl_usuarios (Nombre, Apellido, Usuario, Correo, Contrasena, Rol, Estado) VALUES
('Administrador', 'Sistema', 'admin', 'admin@lensegua.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador', 'activo');

-- VERIFICACIÓN FINAL
SELECT 'Base de datos LENSEGUA creada exitosamente' as mensaje;
SELECT 'Total de lecciones:' as info, COUNT(*) as total_lecciones FROM Tbl_lecciones;
SELECT 'Total de contenido:' as info, COUNT(*) as total_contenido FROM Tbl_contenido;
SELECT 'Total de usuarios:' as info, COUNT(*) as total_usuarios FROM Tbl_usuarios;

-- RESUMEN POR CATEGORÍA
SELECT 
  CASE 
    WHEN Orden BETWEEN 1 AND 1 THEN 'ABECEDARIO BASICO'
    WHEN Orden BETWEEN 2 AND 2 THEN 'FRASES DE CORTESIA'
    WHEN Orden BETWEEN 3 AND 3 THEN 'FAMILIA'
    WHEN Orden BETWEEN 4 AND 4 THEN 'PRONOMBRES'
    WHEN Orden BETWEEN 5 AND 5 THEN 'COLORES'
    WHEN Orden BETWEEN 6 AND 6 THEN 'LUGARES'
    WHEN Orden BETWEEN 7 AND 7 THEN 'DIAS DE LA SEMANA'
    WHEN Orden BETWEEN 8 AND 8 THEN 'NUMEROS'
    WHEN Orden BETWEEN 9 AND 9 THEN 'VERDURAS'
  END as categoria,
  COUNT(*) as cantidad_lecciones
FROM Tbl_lecciones 
GROUP BY 
  CASE 
    WHEN Orden BETWEEN 1 AND 1 THEN 'ABECEDARIO BASICO'
    WHEN Orden BETWEEN 2 AND 2 THEN 'FRASES DE CORTESIA'
    WHEN Orden BETWEEN 3 AND 3 THEN 'FAMILIA'
    WHEN Orden BETWEEN 4 AND 4 THEN 'PRONOMBRES'
    WHEN Orden BETWEEN 5 AND 5 THEN 'COLORES'
    WHEN Orden BETWEEN 6 AND 6 THEN 'LUGARES'
    WHEN Orden BETWEEN 7 AND 7 THEN 'DIAS DE LA SEMANA'
    WHEN Orden BETWEEN 8 AND 8 THEN 'NUMEROS'
    WHEN Orden BETWEEN 9 AND 9 THEN 'VERDURAS'
  END
ORDER BY MIN(Orden);

select *from Tbl_usuarios;


