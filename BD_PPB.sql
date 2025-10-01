DROP DATABASE IF EXISTS lensegua;
CREATE DATABASE lensegua;
use lensegua;

CREATE TABLE Tbl_usuarios (
    Pk_ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Usuario VARCHAR(50),
    Correo VARCHAR(50),
    Contrasena VARCHAR(50),
    Estado VARCHAR(5)
    );
    
CREATE TABLE Tbl_lecciones (
    Pk_ID_leccion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Descripcion VARCHAR(50)
    );

CREATE TABLE Tbl_contenido (
    Pk_ID_contenido INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion INT,
    Fk_ID_leccion VARCHAR(50),
    Imagen VARCHAR(50)
    );

CREATE TABLE Tbl_TipoLeccion (
    Pk_ID_tipo INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion INT,
    Preguntas VARCHAR(50),
    Puntuacion decimal
    );

CREATE TABLE Tbl_Opciones (
    Pk_ID_opciones INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_ID_tipo INT,
    Fk_ID_leccion INT
    );
    
CREATE TABLE Tbl_Respuestas (
    Pk_ID_resp INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_tipo INT,
    respuestaUsuario VARCHAR(50),
    Respuesta VARCHAR(50)
    );
    
CREATE TABLE Tbl_Progreso (
    Pk_ID_prog INT PRIMARY KEY AUTO_INCREMENT,
    Fk_ID_usuario INT,
    Fk_leccion INT,
    Porcen_Av decimal
    );
    

    
    
    