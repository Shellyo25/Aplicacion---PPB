DROP DATABASE IF EXISTS lensegua;
CREATE DATABASE lensegua;
USE lensegua;

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
    
CREATE TABLE Tbl_lecciones (
    Pk_ID_leccion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Descripcion TEXT,
    Nivel INT DEFAULT 1,
    Orden INT,
    Imagen VARCHAR(255)
);

CREATE TABLE Tbl_contenido (
    Pk_ID_contenido INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(255),
    Fk_ID_leccion INT,
    Imagen VARCHAR(255),
    Tipo VARCHAR(50),
    FOREIGN KEY (Fk_ID_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);

CREATE TABLE Tbl_TipoLeccion (
    Pk_ID_tipo INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(100),
    Preguntas TEXT,
    Puntuacion DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE Tbl_Opciones (
    Pk_ID_opciones INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_ID_tipo INT,
    Fk_ID_leccion INT,
    FOREIGN KEY (Fk_ID_usuario) REFERENCES Tbl_usuarios(Pk_ID_usuario),
    FOREIGN KEY (Fk_ID_tipo) REFERENCES Tbl_TipoLeccion(Pk_ID_tipo),
    FOREIGN KEY (Fk_ID_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);
    
CREATE TABLE Tbl_Respuestas (
    Pk_ID_resp INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_tipo INT,
    respuestaUsuario VARCHAR(255),
    Respuesta VARCHAR(255),
    EsCorrecta BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Fk_ID_tipo) REFERENCES Tbl_TipoLeccion(Pk_ID_tipo)
);
    
CREATE TABLE Tbl_Progreso (
    Pk_ID_prog INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_leccion INT,
    Porcen_Av DECIMAL(5,2) DEFAULT 0,
    Fecha_completado TIMESTAMP NULL,
    FOREIGN KEY (Fk_ID_usuario) REFERENCES Tbl_usuarios(Pk_ID_usuario),
    FOREIGN KEY (Fk_leccion) REFERENCES Tbl_lecciones(Pk_ID_leccion)
);

INSERT INTO Tbl_usuarios (Nombre, Apellido, Usuario, Correo, Contrasena, Rol, Estado) VALUES
('Administrador', 'Sistema', 'admin', 'admin@lensegua.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador', 'activo');

INSERT INTO Tbl_lecciones (Nombre, Descripcion, Nivel, Orden, Imagen) VALUES
('Abecedario Básico', 'Aprende las primeras letras del alfabeto (A-E) en lengua de señas guatemalteca', 1, 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),
('Abecedario Intermedio', 'Continúa aprendiendo las letras del alfabeto (F-M) en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario2.png'),
('Abecedario Avanzado', 'Completa el alfabeto (N-Z) en lengua de señas guatemalteca', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario3.png'),

('Números Básicos', 'Números del 0 al 5 en lengua de señas', 1, 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),
('Números Intermedios', 'Números del 6 al 15 en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros2.png'),
('Números Avanzados', 'Números del 16 al 30 en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros3.png'),

('Saludos Básicos', 'Saludos y expresiones básicas de cortesía', 1, 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),
('Conversación Diaria', 'Frases para conversaciones cotidianas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia2.png'),
('Expresiones de Cortesía', 'Expresiones avanzadas de cortesía y agradecimiento', 1, 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia3.png'),

('Colores Primarios', 'Aprende los colores básicos en lengua de señas', 1, 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),
('Colores Secundarios', 'Colores intermedios y combinaciones en lengua de señas', 1, 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores2.png'),
('Colores Especiales', 'Colores especiales y matices en lengua de señas', 1, 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores3.png'),

('Familia Inmediata', 'Términos familiares básicos en lengua de señas', 1, 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),
('Familia Extendida', 'Términos de familia extendida en lengua de señas', 1, 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia2.png'),
('Relaciones Familiares', 'Relaciones y parentescos complejos en lengua de señas', 1, 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia3.png'),

('Lugares Comunes', 'Nombres de lugares básicos en lengua de señas', 1, 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),
('Lugares Públicos', 'Lugares públicos y servicios en lengua de señas', 1, 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares2.png'),
('Lugares Especiales', 'Lugares especiales y turísticos en lengua de señas', 1, 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares3.png'),

('Frutas Tropicales', 'Frutas tropicales básicas en lengua de señas', 1, 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),
('Frutas de Temporada', 'Frutas de temporada en lengua de señas', 1, 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas2.png'),
('Frutas Exóticas', 'Frutas exóticas y especiales en lengua de señas', 1, 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas3.png'),

('Verduras Básicas', 'Verduras básicas en lengua de señas', 1, 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png'),
('Verduras de Hoja', 'Verduras de hoja verde en lengua de señas', 1, 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras2.png'),
('Verduras de Raíz', 'Verduras de raíz y tubérculos en lengua de señas', 1, 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras3.png'),

('Días Básicos', 'Los días de la semana en lengua de señas', 1, 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png'),
('Meses del Año', 'Los meses del año en lengua de señas', 1, 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/meses.png'),
('Tiempo y Estaciones', 'Conceptos de tiempo y estaciones en lengua de señas', 1, 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo.png');

INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
('Letra A', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_a.png', 'imagen'),
('Letra B', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_b.png', 'imagen'),
('Letra C', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_c.png', 'imagen'),
('Letra D', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_d.png', 'imagen'),
('Letra E', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_e.png', 'imagen'),

('Letra F', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_f.png', 'imagen'),
('Letra G', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_g.png', 'imagen'),
('Letra H', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_h.png', 'imagen'),
('Letra I', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_i.png', 'imagen'),
('Letra J', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_j.png', 'imagen'),
('Letra K', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_k.png', 'imagen'),
('Letra L', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_l.png', 'imagen'),
('Letra M', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_m.png', 'imagen'),

('Letra N', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_n.png', 'imagen'),
('Letra Ñ', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_ñ.png', 'imagen'),
('Letra O', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_o.png', 'imagen'),
('Letra P', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_p.png', 'imagen'),
('Letra Q', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_q.png', 'imagen'),
('Letra R', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_r.png', 'imagen'),
('Letra S', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_s.png', 'imagen'),
('Letra T', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_t.png', 'imagen'),
('Letra U', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_u.png', 'imagen'),
('Letra V', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_v.png', 'imagen'),
('Letra W', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_w.png', 'imagen'),
('Letra X', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_x.png', 'imagen'),
('Letra Y', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_y.png', 'imagen'),
('Letra Z', 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_z.png', 'imagen'),

('Número 0', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_0.png', 'imagen'),
('Número 1', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png', 'imagen'),
('Número 2', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_2.png', 'imagen'),
('Número 3', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png', 'imagen'),
('Número 4', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_4.png', 'imagen'),
('Número 5', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_5.png', 'imagen'),

('Número 6', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_6.png', 'imagen'),
('Número 7', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_7.png', 'imagen'),
('Número 8', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_8.png', 'imagen'),
('Número 9', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_9.png', 'imagen'),
('Número 10', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_10.png', 'imagen'),
('Número 11', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_11.png', 'imagen'),
('Número 12', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_12.png', 'imagen'),
('Número 13', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_13.png', 'imagen'),
('Número 14', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_14.png', 'imagen'),
('Número 15', 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_15.png', 'imagen'),

('Número 16', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_16.png', 'imagen'),
('Número 17', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_17.png', 'imagen'),
('Número 18', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_18.png', 'imagen'),
('Número 19', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_19.png', 'imagen'),
('Número 20', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_20.png', 'imagen'),
('Número 25', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_25.png', 'imagen'),
('Número 30', 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_30.png', 'imagen'),

('Hola', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_hola.png', 'imagen'),
('Buenos días', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenos_dias.png', 'imagen'),
('Buenas tardes', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenas_tardes.png', 'imagen'),
('Buenas noches', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenas_noches.png', 'imagen'),
('Adiós', 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_adios.png', 'imagen'),

('¿Cómo estás?', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_como_estas.png', 'imagen'),
('Muy bien', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_muy_bien.png', 'imagen'),
('¿Qué tal?', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_que_tal.png', 'imagen'),
('¿Cómo te llamas?', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_como_te_llamas.png', 'imagen'),
('Me llamo...', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_me_llamo.png', 'imagen'),
('Mucho gusto', 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/conversacion_mucho_gusto.png', 'imagen'),

('Por favor', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_por_favor.png', 'imagen'),
('Gracias', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_gracias.png', 'imagen'),
('De nada', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_de_nada.png', 'imagen'),
('Disculpe', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_disculpe.png', 'imagen'),
('Perdón', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_perdon.png', 'imagen'),
('Con permiso', 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia_con_permiso.png', 'imagen'),

('Rojo', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rojo.png', 'imagen'),
('Azul', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_azul.png', 'imagen'),
('Amarillo', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_amarillo.png', 'imagen'),
('Verde', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_verde.png', 'imagen'),
('Negro', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_negro.png', 'imagen'),
('Blanco', 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_blanco.png', 'imagen'),

('Naranja', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_naranja.png', 'imagen'),
('Morado', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_morado.png', 'imagen'),
('Rosa', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rosa.png', 'imagen'),
('Café', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_cafe.png', 'imagen'),
('Gris', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_gris.png', 'imagen'),
('Celeste', 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_celeste.png', 'imagen'),

('Dorado', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_dorado.png', 'imagen'),
('Plateado', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_plateado.png', 'imagen'),
('Turquesa', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_turquesa.png', 'imagen'),
('Magenta', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_magenta.png', 'imagen'),
('Beige', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_beige.png', 'imagen'),
('Coral', 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_coral.png', 'imagen'),

('Mamá', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_mama.png', 'imagen'),
('Papá', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_papa.png', 'imagen'),
('Hermano', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hermano.png', 'imagen'),
('Hermana', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hermana.png', 'imagen'),
('Hijo', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hijo.png', 'imagen'),
('Hija', 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hija.png', 'imagen'),

('Abuelo', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuelo.png', 'imagen'),
('Abuela', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuela.png', 'imagen'),
('Tío', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_tio.png', 'imagen'),
('Tía', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_tia.png', 'imagen'),
('Primo', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_primo.png', 'imagen'),
('Prima', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_prima.png', 'imagen'),
('Sobrino', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_sobrino.png', 'imagen'),
('Sobrina', 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_sobrina.png', 'imagen'),

('Suegro', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_suegro.png', 'imagen'),
('Suegra', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_suegra.png', 'imagen'),
('Yerno', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_yerno.png', 'imagen'),
('Nuera', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_nuera.png', 'imagen'),
('Cuñado', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_cunado.png', 'imagen'),
('Cuñada', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_cunada.png', 'imagen'),
('Padrastro', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_padrastro.png', 'imagen'),
('Madrastra', 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_madrastra.png', 'imagen'),

('Casa', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_casa.png', 'imagen'),
('Escuela', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_escuela.png', 'imagen'),
('Trabajo', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_trabajo.png', 'imagen'),
('Parque', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_parque.png', 'imagen'),
('Tienda', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_tienda.png', 'imagen'),
('Mercado', 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_mercado.png', 'imagen'),

('Hospital', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_hospital.png', 'imagen'),
('Policía', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_policia.png', 'imagen'),
('Banco', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_banco.png', 'imagen'),
('Oficina', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_oficina.png', 'imagen'),
('Iglesia', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_iglesia.png', 'imagen'),
('Biblioteca', 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_biblioteca.png', 'imagen'),

('Antigua Guatemala', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_antigua.png', 'imagen'),
('Tikal', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_tikal.png', 'imagen'),
('Lago de Atitlán', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_atitlan.png', 'imagen'),
('Volcán de Agua', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_volcan_agua.png', 'imagen'),
('Zoológico', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_zoologico.png', 'imagen'),
('Museo', 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_museo.png', 'imagen'),

('Plátano', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_platano.png', 'imagen'),
('Mango', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_mango.png', 'imagen'),
('Piña', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_pina.png', 'imagen'),
('Papaya', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_papaya.png', 'imagen'),
('Coco', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_coco.png', 'imagen'),
('Guayaba', 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_guayaba.png', 'imagen'),

('Manzana', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_manzana.png', 'imagen'),
('Pera', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_pera.png', 'imagen'),
('Uva', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_uva.png', 'imagen'),
('Fresa', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_fresa.png', 'imagen'),
('Durazno', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_durazno.png', 'imagen'),
('Cereza', 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_cereza.png', 'imagen'),

('Rambután', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_rambutan.png', 'imagen'),
('Lichi', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_lichi.png', 'imagen'),
('Carambola', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_carambola.png', 'imagen'),
('Granadilla', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_granadilla.png', 'imagen'),
('Maracuyá', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_maracuya.png', 'imagen'),
('Tamarindo', 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_tamarindo.png', 'imagen'),

('Tomate', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_tomate.png', 'imagen'),
('Cebolla', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_cebolla.png', 'imagen'),
('Papa', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_papa.png', 'imagen'),
('Zanahoria', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_zanahoria.png', 'imagen'),
('Chile', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_chile.png', 'imagen'),
('Ajo', 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_ajo.png', 'imagen'),

('Lechuga', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_lechuga.png', 'imagen'),
('Espinaca', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_espinaca.png', 'imagen'),
('Repollo', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_repollo.png', 'imagen'),
('Acelga', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_acelga.png', 'imagen'),
('Apio', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_apio.png', 'imagen'),
('Perejil', 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_perejil.png', 'imagen'),

('Rábano', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_rabano.png', 'imagen'),
('Remolacha', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_remolacha.png', 'imagen'),
('Nabo', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_nabo.png', 'imagen'),
('Yuca', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_yuca.png', 'imagen'),
('Camote', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_camote.png', 'imagen'),
('Jengibre', 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_jengibre.png', 'imagen'),

('Lunes', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_lunes.png', 'imagen'),
('Martes', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_martes.png', 'imagen'),
('Miércoles', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_miercoles.png', 'imagen'),
('Jueves', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_jueves.png', 'imagen'),
('Viernes', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_viernes.png', 'imagen'),
('Sábado', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_sabado.png', 'imagen'),
('Domingo', 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dia_domingo.png', 'imagen'),

('Enero', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_enero.png', 'imagen'),
('Febrero', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_febrero.png', 'imagen'),
('Marzo', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_marzo.png', 'imagen'),
('Abril', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_abril.png', 'imagen'),
('Mayo', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_mayo.png', 'imagen'),
('Junio', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_junio.png', 'imagen'),
('Julio', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_julio.png', 'imagen'),
('Agosto', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_agosto.png', 'imagen'),
('Septiembre', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_septiembre.png', 'imagen'),
('Octubre', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_octubre.png', 'imagen'),
('Noviembre', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_noviembre.png', 'imagen'),
('Diciembre', 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/mes_diciembre.png', 'imagen'),

('Primavera', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_primavera.png', 'imagen'),
('Verano', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_verano.png', 'imagen'),
('Otoño', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_otono.png', 'imagen'),
('Invierno', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_invierno.png', 'imagen'),
('Hoy', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_hoy.png', 'imagen'),
('Ayer', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_ayer.png', 'imagen'),
('Mañana', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_manana.png', 'imagen'),
('Tarde', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_tarde.png', 'imagen'),
('Noche', 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_noche.png', 'imagen');

INSERT INTO Tbl_TipoLeccion (Descripcion, Preguntas, Puntuacion) VALUES
('Opción Múltiple', 'Selecciona la respuesta correcta', 10.0),
('Asociación', 'Asocia la imagen con la seña correcta', 15.0),
('Práctica', 'Practica la seña mostrada', 20.0);

