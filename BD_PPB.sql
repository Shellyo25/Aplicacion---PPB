DROP DATABASE IF EXISTS lensegua;
CREATE DATABASE lensegua;
use lensegua;

CREATE TABLE Tbl_usuarios (
    Pk_ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Usuario VARCHAR(50) UNIQUE,
    Correo VARCHAR(100) UNIQUE,
    Contrasena VARCHAR(255),
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

-- Insertar lecciones de ejemplo
INSERT INTO Tbl_lecciones (Nombre, Descripcion, Nivel, Orden, Imagen) VALUES
('Abecedario', 'Aprende las letras del alfabeto en lengua de señas guatemalteca', 1, 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),
('Números', 'Números del 0 al 10 en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),
('Frases de cortesía', 'Saludos y expresiones básicas de cortesía', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),
('Colores', 'Aprende los colores básicos en lengua de señas', 1, 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),
('Familia', 'Términos familiares en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),
('Lugares', 'Nombres de lugares comunes', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),
('Frutas', 'Nombres de frutas en lengua de señas', 1, 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),
('Verduras', 'Nombres de verduras en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png'),
('Días de la semana', 'Los días de la semana en lengua de señas', 1, 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png');

-- Insertar contenido 
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
('Letra A', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_a.png', 'imagen'),
('Letra B', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_b.png', 'imagen'),
('Letra C', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_c.png', 'imagen'),
('Letra D', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_d.png', 'imagen'),
('Letra E', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_e.png', 'imagen');

-- Insertar contenido 
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
('Número 0', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_0.png', 'imagen'),
('Número 1', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png', 'imagen'),
('Número 2', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_2.png', 'imagen'),
('Número 3', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png', 'imagen'),
('Número 4', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_4.png', 'imagen'),
('Número 5', 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_5.png', 'imagen');

-- Insertar tipos de lección
INSERT INTO Tbl_TipoLeccion (Descripcion, Preguntas, Puntuacion) VALUES
('Opción Múltiple', 'Selecciona la respuesta correcta', 10.0),
('Asociación', 'Asocia la imagen con la seña correcta', 15.0),
('Práctica', 'Practica la seña mostrada', 20.0);