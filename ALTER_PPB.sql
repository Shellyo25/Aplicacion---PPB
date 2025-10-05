-- =====================================================
-- ALTER_PPB.sql - Script de actualización para LENSEGUA
-- =====================================================
-- Este script actualiza la base de datos original BD_PPB.sql

USE lensegua;

-- =====================================================
-- 1. SISTEMA DE ROLES
-- =====================================================

-- Agregar columna Rol a la tabla de usuarios
ALTER TABLE Tbl_usuarios 
ADD COLUMN Rol ENUM('usuario', 'administrador') DEFAULT 'usuario' AFTER Contrasena;

-- Actualizar usuarios existentes para que tengan rol 'usuario'
UPDATE Tbl_usuarios 
SET Rol = 'usuario' 
WHERE Pk_ID_usuario > 0;

-- Crear usuario administrador por defecto
-- Contraseña: admin123 (hasheada con bcrypt)
INSERT INTO Tbl_usuarios (Nombre, Apellido, Usuario, Correo, Contrasena, Rol, Estado) VALUES
('Administrador', 'Sistema', 'admin', 'admin@lensegua.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador', 'activo');

-- =====================================================
-- 2. LECCIONES AMPLIADAS (27 lecciones en total)
-- =====================================================

-- Limpiar lecciones existentes (para empezar de cero)
-- DELETE FROM Tbl_contenido;
-- DELETE FROM Tbl_lecciones;

-- Insertar las nuevas lecciones ampliadas
INSERT INTO Tbl_lecciones (Nombre, Descripcion, Nivel, Orden, Imagen) VALUES
-- ABECEDARIO (3 lecciones)
('Abecedario Básico', 'Aprende las primeras letras del alfabeto (A-E) en lengua de señas guatemalteca', 1, 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario.png'),
('Abecedario Intermedio', 'Continúa aprendiendo las letras del alfabeto (F-M) en lengua de señas', 1, 2, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario2.png'),
('Abecedario Avanzado', 'Completa el alfabeto (N-Z) en lengua de señas guatemalteca', 1, 3, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/abecedario3.png'),

-- NÚMEROS (3 lecciones)
('Números Básicos', 'Números del 0 al 5 en lengua de señas', 1, 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros.png'),
('Números Intermedios', 'Números del 6 al 15 en lengua de señas', 1, 5, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros2.png'),
('Números Avanzados', 'Números del 16 al 30 en lengua de señas', 1, 6, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numeros3.png'),

-- FRASES DE CORTESÍA (3 lecciones)
('Saludos Básicos', 'Saludos y expresiones básicas de cortesía', 1, 7, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia.png'),
('Conversación Diaria', 'Frases para conversaciones cotidianas en lengua de señas', 1, 8, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia2.png'),
('Expresiones de Cortesía', 'Expresiones avanzadas de cortesía y agradecimiento', 1, 9, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/cortesia3.png'),

-- COLORES (3 lecciones)
('Colores Primarios', 'Aprende los colores básicos en lengua de señas', 1, 10, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores.png'),
('Colores Secundarios', 'Colores intermedios y combinaciones en lengua de señas', 1, 11, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores2.png'),
('Colores Especiales', 'Colores especiales y matices en lengua de señas', 1, 12, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/colores3.png'),

-- FAMILIA (3 lecciones)
('Familia Inmediata', 'Términos familiares básicos en lengua de señas', 1, 13, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia.png'),
('Familia Extendida', 'Términos de familia extendida en lengua de señas', 1, 14, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia2.png'),
('Relaciones Familiares', 'Relaciones y parentescos complejos en lengua de señas', 1, 15, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia3.png'),

-- LUGARES (3 lecciones)
('Lugares Comunes', 'Nombres de lugares básicos en lengua de señas', 1, 16, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares.png'),
('Lugares Públicos', 'Lugares públicos y servicios en lengua de señas', 1, 17, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares2.png'),
('Lugares Especiales', 'Lugares especiales y turísticos en lengua de señas', 1, 18, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugares3.png'),

-- FRUTAS (3 lecciones)
('Frutas Tropicales', 'Frutas tropicales básicas en lengua de señas', 1, 19, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas.png'),
('Frutas de Temporada', 'Frutas de temporada en lengua de señas', 1, 20, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas2.png'),
('Frutas Exóticas', 'Frutas exóticas y especiales en lengua de señas', 1, 21, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/frutas3.png'),

-- VERDURAS (3 lecciones)
('Verduras Básicas', 'Verduras básicas en lengua de señas', 1, 22, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras.png'),
('Verduras de Hoja', 'Verduras de hoja verde en lengua de señas', 1, 23, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras2.png'),
('Verduras de Raíz', 'Verduras de raíz y tubérculos en lengua de señas', 1, 24, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verduras3.png'),

-- TIEMPO (3 lecciones)
('Días Básicos', 'Los días de la semana en lengua de señas', 1, 25, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/dias.png'),
('Meses del Año', 'Los meses del año en lengua de señas', 1, 26, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/meses.png'),
('Tiempo y Estaciones', 'Conceptos de tiempo y estaciones en lengua de señas', 1, 27, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo.png');

-- =====================================================
-- 3. CONTENIDO DE LECCIONES (ejemplos básicos)
-- =====================================================

-- Contenido para Abecedario Básico (Lección 1)
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
('Letra A', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_a.png', 'imagen'),
('Letra B', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_b.png', 'imagen'),
('Letra C', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_c.png', 'imagen'),
('Letra D', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_d.png', 'imagen'),
('Letra E', 1, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_e.png', 'imagen');

-- Contenido para Números Básicos (Lección 4)
INSERT INTO Tbl_contenido (Descripcion, Fk_ID_leccion, Imagen, Tipo) VALUES
('Número 0', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_0.png', 'imagen'),
('Número 1', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png', 'imagen'),
('Número 2', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_2.png', 'imagen'),
('Número 3', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png', 'imagen'),
('Número 4', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_4.png', 'imagen'),
('Número 5', 4, 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_5.png', 'imagen');

-- =====================================================
-- 4. VERIFICACIÓN FINAL
-- =====================================================

-- Verificar usuarios con roles
SELECT 'Usuarios con roles:' as info;
SELECT Pk_ID_usuario, Nombre, Usuario, Rol, Estado FROM Tbl_usuarios;

-- Verificar total de lecciones
SELECT 'Total de lecciones:' as info;
SELECT COUNT(*) as total_lecciones FROM Tbl_lecciones;

-- Verificar lecciones por categoría
SELECT 'Lecciones por categoría:' as info;
SELECT 
  CASE 
    WHEN Orden BETWEEN 1 AND 3 THEN 'ABECEDARIO'
    WHEN Orden BETWEEN 4 AND 6 THEN 'NÚMEROS'
    WHEN Orden BETWEEN 7 AND 9 THEN 'CORTESÍA'
    WHEN Orden BETWEEN 10 AND 12 THEN 'COLORES'
    WHEN Orden BETWEEN 13 AND 15 THEN 'FAMILIA'
    WHEN Orden BETWEEN 16 AND 18 THEN 'LUGARES'
    WHEN Orden BETWEEN 19 AND 21 THEN 'FRUTAS'
    WHEN Orden BETWEEN 22 AND 24 THEN 'VERDURAS'
    WHEN Orden BETWEEN 25 AND 27 THEN 'TIEMPO'
  END as categoria,
  COUNT(*) as cantidad
FROM Tbl_lecciones 
GROUP BY 
  CASE 
    WHEN Orden BETWEEN 1 AND 3 THEN 'ABECEDARIO'
    WHEN Orden BETWEEN 4 AND 6 THEN 'NÚMEROS'
    WHEN Orden BETWEEN 7 AND 9 THEN 'CORTESÍA'
    WHEN Orden BETWEEN 10 AND 12 THEN 'COLORES'
    WHEN Orden BETWEEN 13 AND 15 THEN 'FAMILIA'
    WHEN Orden BETWEEN 16 AND 18 THEN 'LUGARES'
    WHEN Orden BETWEEN 19 AND 21 THEN 'FRUTAS'
    WHEN Orden BETWEEN 22 AND 24 THEN 'VERDURAS'
    WHEN Orden BETWEEN 25 AND 27 THEN 'TIEMPO'
  END
ORDER BY MIN(Orden);

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
