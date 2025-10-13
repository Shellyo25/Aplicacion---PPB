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
('Abecedario Básico', 'Aprende las primeras letras del alfabeto (A-Z) en lengua de señas guatemalteca', 1, 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),
-- ('Abecedario Intermedio', 'Continúa aprendiendo las letras del alfabeto (F-M) en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario2.png'),
-- ('Abecedario Avanzado', 'Completa el alfabeto (N-Z) en lengua de señas guatemalteca', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario3.png'),

-- NÚMEROS (3 lecciones)
('Números Básicos', 'Números del 0 al 5 en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),
-- ('Números Intermedios', 'Números del 6 al 15 en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros2.png'),
-- ('Números Avanzados', 'Números del 16 al 30 en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros3.png'),

-- CORTESÍA (3 lecciones)
('Expresiones de cortesía', 'Saludos y expresiones básicas de cortesía', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),
-- ('Conversación Diaria', 'Frases para conversaciones cotidianas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia2.png'),
-- ('Expresiones de Cortesía', 'Expresiones avanzadas de cortesía y agradecimiento', 1, 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia3.png'),

-- COLORES (3 lecciones)
('Colores Básicos', 'Aprende los colores básicos en lengua de señas', 1, 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),
-- ('Colores Secundarios', 'Colores intermedios y combinaciones en lengua de señas', 1, 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores2.png'),
-- ('Colores Especiales', 'Colores especiales y matices en lengua de señas', 1, 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores3.png'),

-- FAMILIA (3 lecciones)
('Familia Principal', 'Términos familiares básicos en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),
-- ('Familia Extendida', 'Términos de familia extendida en lengua de señas', 1, 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia2.png'),
-- ('Relaciones Familiares', 'Relaciones y parentescos complejos en lengua de señas', 1, 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia3.png'),

-- LUGARES (3 lecciones)
('Lugares Comunes', 'Nombres de lugares básicos en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),
-- ('Lugares Públicos', 'Lugares públicos y servicios en lengua de señas', 1, 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares2.png'),
-- ('Lugares Especiales', 'Lugares especiales y turísticos en lengua de señas', 1, 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares3.png'),

-- FRUTAS (3 lecciones)
('Frutas Básicas', 'Frutas tropicales básicas en lengua de señas', 1, 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),
-- ('Frutas de Temporada', 'Frutas de temporada en lengua de señas', 1, 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas2.png'),
-- ('Frutas Exóticas', 'Frutas exóticas y especiales en lengua de señas', 1, 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas3.png'),

-- VERDURAS (3 lecciones)
('Verduras Básicas', 'Verduras básicas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png'),
-- ('Verduras de Hoja', 'Verduras de hoja verde en lengua de señas', 1, 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras2.png'),
-- ('Verduras de Raíz', 'Verduras de raíz y tubérculos en lengua de señas', 1, 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras3.png'),

-- TIEMPO (3 lecciones)
('Días de la semana', 'Los días de la semana en lengua de señas', 1, 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png');
-- ('Meses del Año', 'Los meses del año en lengua de señas', 1, 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/meses.png'),
-- ('Tiempo y Estaciones', 'Conceptos de tiempo y estaciones en lengua de señas', 1, 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo.png');

-- INSERTAR CONTENIDO COMPLETO DE LECCIONES
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
-- ABECEDARIO BÁSICO (Lección 1)
('Letra A', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760313383/a_npesc9.jpg', 'imagen'),
('Letra B', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_b.png', 'imagen'),
('Letra C', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_c.png', 'imagen'),
('Letra D', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_d.png', 'imagen'),
('Letra E', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_e.png', 'imagen'),
('Letra F', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_f.png', 'imagen'),
('Letra G', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_g.png', 'imagen'),
('Letra H', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_h.png', 'imagen'),
('Letra I', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_i.png', 'imagen'),
('Letra J', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_j.png', 'imagen'),
('Letra K', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_k.png', 'imagen'),
('Letra L', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_l.png', 'imagen'),
('Letra M', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_m.png', 'imagen'),

('Letra N', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_n.png', 'imagen'),
('Letra Ñ', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_ñ.png', 'imagen'),
('Letra O', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_o.png', 'imagen'),
('Letra P', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_p.png', 'imagen'),
('Letra Q', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_q.png', 'imagen'),
('Letra R', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_r.png', 'imagen'),
('Letra S', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_s.png', 'imagen'),
('Letra T', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_t.png', 'imagen'),
('Letra U', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_u.png', 'imagen'),
('Letra V', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_v.png', 'imagen'),
('Letra W', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_w.png', 'imagen'),
('Letra X', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_x.png', 'imagen'),
('Letra Y', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_y.png', 'imagen'),
('Letra Z', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_z.png', 'imagen'),

-- NÚMEROS BÁSICOS (Lección 4)
('Número 0', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_0.png', 'imagen'),
('Número 1', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png', 'imagen'),
('Número 2', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_2.png', 'imagen'),
('Número 3', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png', 'imagen'),
('Número 4', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_4.png', 'imagen'),
('Número 5', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_5.png', 'imagen'),

('Número 6', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_6.png', 'imagen'),
('Número 7', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_7.png', 'imagen'),
('Número 8', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_8.png', 'imagen'),
('Número 9', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_9.png', 'imagen'),
('Número 10', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_10.png', 'imagen'),
('Número 11', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_11.png', 'imagen'),
('Número 12', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_12.png', 'imagen'),
('Número 13', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_13.png', 'imagen'),
('Número 14', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_14.png', 'imagen'),
('Número 15', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_15.png', 'imagen'),

-- SALUDOS BÁSICOS (Lección 7)
('Hola', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_hola.png', 'imagen'),
('Buenos días', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenos_dias.png', 'imagen'),
('Buenas tardes', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenas_tardes.png', 'imagen'),
('Buenas noches', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenas_noches.png', 'imagen'),
('Adiós', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_adios.png', 'imagen'),

('Por favor', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_por_favor.png', 'imagen'),
('Gracias', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_gracias.png', 'imagen'),
('De nada', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_de_nada.png', 'imagen'),
('Perdón', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_perdon.png', 'imagen'),
('Con permiso', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_con_permiso.png', 'imagen'),

-- COLORES  (Lección 10)
('Rojo', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rojo.png', 'imagen'),
('Azul', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_azul.png', 'imagen'),
('Amarillo', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_amarillo.png', 'imagen'),
('Verde', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_verde.png', 'imagen'),
('Negro', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_negro.png', 'imagen'),
('Blanco', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_blanco.png', 'imagen'),

('Naranja', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_naranja.png', 'imagen'),
('Morado', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_morado.png', 'imagen'),
('Rosa', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rosa.png', 'imagen'),
('Café', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_cafe.png', 'imagen'),
('Gris', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_gris.png', 'imagen'),
('Celeste', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_celeste.png', 'imagen'),


-- FAMILIA INMEDIATA (Lección 13)
('Mamá', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_mama.png', 'imagen'),
('Papá', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_papa.png', 'imagen'),
('Hermano', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hermano.png', 'imagen'),
('Hermana', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hermana.png', 'imagen'),
('Hijo', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hijo.png', 'imagen'),
('Hija', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hija.png', 'imagen'),
('Abuelo', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuelo.png', 'imagen'),
('Abuela', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuela.png', 'imagen'),

-- LUGARES COMUNES (Lección 16)
('Casa', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_casa.png', 'imagen'),
('Escuela', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_escuela.png', 'imagen'),
('Trabajo', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_trabajo.png', 'imagen'),
('Parque', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_parque.png', 'imagen'),
('Tienda', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_tienda.png', 'imagen'),
('Mercado', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_mercado.png', 'imagen'),

('Hospital', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_hospital.png', 'imagen'),
('Iglesia', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_iglesia.png', 'imagen'),
('Biblioteca', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_biblioteca.png', 'imagen'),

-- FRUTAS TROPICALES (Lección 19)
('Plátano', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_platano.png', 'imagen'),
('Mango', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_mango.png', 'imagen'),
('Piña', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_pina.png', 'imagen'),
('Papaya', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_papaya.png', 'imagen'),
('Coco', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_coco.png', 'imagen'),
('Guayaba', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_guayaba.png', 'imagen'),

-- FRUTAS DE TEMPORADA (Lección 20)
('Manzana', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_manzana.png', 'imagen'),
('Pera', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_pera.png', 'imagen'),
('Uva', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_uva.png', 'imagen'),
('Fresa', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_fresa.png', 'imagen'),
('Durazno', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_durazno.png', 'imagen'),
('Cereza', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_cereza.png', 'imagen'),

-- VERDURAS BÁSICAS (Lección 22)
('Tomate', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_tomate.png', 'imagen'),
('Cebolla', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_cebolla.png', 'imagen'),
('Papa', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_papa.png', 'imagen'),
('Zanahoria', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_zanahoria.png', 'imagen'),
('Chile', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_chile.png', 'imagen'),
('Ajo', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_ajo.png', 'imagen'),

('Lechuga', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_lechuga.png', 'imagen'),
('Repollo', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_repollo.png', 'imagen'),


-- DÍAS DE LA SEMANA (Lección 25)
('Lunes', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_lunes.png', 'imagen'),
('Martes', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_martes.png', 'imagen'),
('Miércoles', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_miercoles.png', 'imagen'),
('Jueves', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_jueves.png', 'imagen'),
('Viernes', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_viernes.png', 'imagen'),
('Sábado', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_sabado.png', 'imagen'),
('Domingo', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_domingo.png', 'imagen');

-- INSERTAR TIPOS DE LECCIÓN
INSERT INTO Tbl_TipoLeccion (Descripcion, Preguntas, Puntuacion) VALUES
('Opción Múltiple', 'Selecciona la respuesta correcta', 10.0),
('Asociación', 'Asocia la imagen con la seña correcta', 15.0),
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
    WHEN Orden BETWEEN 1 AND 1 THEN 'ABECEDARIO'
    WHEN Orden BETWEEN 2 AND 2 THEN 'NÚMEROS'
    WHEN Orden BETWEEN 3 AND 3 THEN 'CORTESÍA'
    WHEN Orden BETWEEN 4 AND 4 THEN 'COLORES'
    WHEN Orden BETWEEN 5 AND 5 THEN 'FAMILIA'
    WHEN Orden BETWEEN 6 AND 6 THEN 'LUGARES'
    WHEN Orden BETWEEN 7 AND 7 THEN 'FRUTAS'
    WHEN Orden BETWEEN 8 AND 8 THEN 'VERDURAS'
    WHEN Orden BETWEEN 9 AND 9 THEN 'DIAS DE LA SEMANA'
  END as categoria,
  COUNT(*) as cantidad_lecciones
FROM Tbl_lecciones 
GROUP BY 
  CASE 
    WHEN Orden BETWEEN 1 AND 1 THEN 'ABECEDARIO'
    WHEN Orden BETWEEN 2 AND 2 THEN 'NÚMEROS'
    WHEN Orden BETWEEN 3 AND 3 THEN 'CORTESÍA'
    WHEN Orden BETWEEN 4 AND 4 THEN 'COLORES'
    WHEN Orden BETWEEN 5 AND 5 THEN 'FAMILIA'
    WHEN Orden BETWEEN 6 AND 6 THEN 'LUGARES'
    WHEN Orden BETWEEN 7 AND 7 THEN 'FRUTAS'
    WHEN Orden BETWEEN 8 AND 8 THEN 'VERDURAS'
    WHEN Orden BETWEEN 9 AND 9 THEN 'DIAS DE LA SEMANA'
  END
ORDER BY MIN(Orden);

