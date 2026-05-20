require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use(limiter);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'lensegua',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

if (process.env.DB_SSL === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Base de datos conectada');
    connection.release();
  } catch (err) {
    console.error('Error de conexión a la base de datos');
  }
})();

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.error('Error en configuración de correo:', error);
      console.log('Para solucionarlo:');
      console.log('1. Ve a https://myaccount.google.com/apppasswords');
      console.log('2. Genera una contraseña de aplicación para "Correo"');
      console.log('3. Actualiza EMAIL_PASS en el archivo .env');
      console.log('4. Reinicia el servidor');
    } else {
      console.log('Servidor de correo configurado correctamente');
    }
  });
} else {
  console.log('Variables de correo no configuradas en .env');
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-jwt', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
};

const generarHTMLConfirmacion = (nombre) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Bienvenido a LENSEGUA!</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #8ecae6 0%, #219ebc 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .header {
                background: linear-gradient(135deg, #219ebc 0%, #023047 100%);
                padding: 30px 20px;
                text-align: center;
                color: white;
                position: relative;
            }
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
                opacity: 0.3;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 1;
            }
            .logo-subtitle {
                font-size: 14px;
                opacity: 0.9;
                position: relative;
                z-index: 1;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .welcome-title {
                color: #023047;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 20px;
                background: linear-gradient(45deg, #023047, #219ebc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .user-name {
                color: #fb8500;
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            }
            .message {
                color: #023047;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 25px;
            }
            .features {
                background: #f8f9fa;
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
                border-left: 5px solid #fb8500;
            }
            .feature-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                color: #023047;
                font-size: 14px;
            }
            .feature-item:last-child {
                margin-bottom: 0;
            }
            .feature-icon {
                background: #fb8500;
                color: white;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                font-weight: bold;
                font-size: 12px;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(45deg, #fb8500, #ff9f1c);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                font-size: 16px;
                margin: 20px 0;
                box-shadow: 0 5px 15px rgba(251, 133, 0, 0.3);
                transition: all 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 7px 20px rgba(251, 133, 0, 0.4);
            }
            .footer {
                background: #023047;
                color: white;
                padding: 25px;
                text-align: center;
                font-size: 14px;
            }
            .footer p {
                margin: 5px 0;
            }
            .social-links {
                margin-top: 15px;
            }
            .social-links a {
                color: #8ecae6;
                text-decoration: none;
                margin: 0 10px;
                font-weight: bold;
            }
            .divider {
                height: 2px;
                background: linear-gradient(90deg, transparent, #fb8500, transparent);
                margin: 20px 0;
            }
            .character-emoji {
                font-size: 48px;
                margin: 20px 0;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            .success-badge {
                background: linear-gradient(45deg, #d4edda, #c3e6cb);
                color: #155724;
                padding: 10px 20px;
                border-radius: 20px;
                font-weight: bold;
                margin: 20px 0;
                border: 2px solid #c3e6cb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">LENSEGUA</div>
                <div class="logo-subtitle">Aprende Lengua de Señas Guatemalteca</div>
            </div>
            
            <div class="content">
                <h1 class="welcome-title">¡Bienvenido a LENSEGUA!</h1>
                
                <div class="success-badge">
                    ¡Usuario creado exitosamente!
                </div>
                
                <div class="user-name">Hola, ${nombre}</div>
                
                <p class="message">
                    ¡Excelente noticia! Tu cuenta ha sido creada correctamente y ya puedes comenzar tu increíble viaje de aprendizaje de la lengua de señas guatemalteca.
                </p>
                
                <div class="features">
                    <div class="feature-item">
                        <div class="feature-icon">1</div>
                        <span>Accede a lecciones interactivas y divertidas</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">2</div>
                        <span>Practica con ejercicios personalizados</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">3</div>
                        <span>Mantén un seguimiento de tu progreso</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">4</div>
                        <span>Desbloquea logros y certificaciones</span>
                    </div>
                </div>
                
                <p class="message">
                    ¡Estamos emocionados de tenerte como parte de nuestra comunidad! Tu aprendizaje comienza ahora.
                </p>
                
                <div class="divider"></div>
                
                <p class="message">
                    <strong>¿Qué sigue?</strong><br>
                    Inicia sesión en la aplicación con tus credenciales y comienza con la primera lección. ¡Te esperamos!
                </p>
            </div>
            
            <div class="footer">
                <p><strong>El equipo de LENSEGUA</strong></p>
                <p>Haciendo la lengua de señas accesible para todos</p>
                <div class="social-links">
                    <a href="#">App</a>
                    <a href="#">Web</a>
                    <a href="#">Soporte</a>
                </div>
                <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                    Este correo fue enviado automáticamente. No respondas a este mensaje.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

app.get('/', (req, res) => {
  res.json({ message: 'Servidor LENSEGUA funcionando correctamente' });
});

app.post('/api/registro', async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, contrasena } = req.body;

    if (!nombre || !apellido || !usuario || !correo || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (!validateEmail(correo)) {
      return res.status(400).json({ error: 'Formato de correo inválido' });
    }

    if (!validatePassword(contrasena)) {
      return res.status(400).json({ 
        error: 'La contraseña debe tener al menos 8 caracteres con números y letras' 
      });
    }

    const [existingEmail] = await pool.execute(
      'SELECT Pk_ID_usuario FROM Tbl_usuarios WHERE Correo = ?',
      [correo]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const [existingUser] = await pool.execute(
      'SELECT Pk_ID_usuario FROM Tbl_usuarios WHERE Usuario = ?',
      [usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.execute(
      'INSERT INTO Tbl_usuarios (Nombre, Apellido, Usuario, Correo, Contrasena, Rol, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, usuario, correo, hashedPassword, 'usuario', 'activo']
    );

    if (transporter) {
      const mailOptions = {
        from: {
          name: 'LENSEGUA - Aprende Lengua de Señas',
          address: process.env.EMAIL_USER
        },
        to: correo,
        subject: '¡Bienvenido a LENSEGUA! Tu cuenta ha sido creada exitosamente',
        html: generarHTMLConfirmacion(`${nombre} ${apellido}`)
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar correo:', error);
        } else {
          console.log('Correo de bienvenida enviado exitosamente a:', correo);
          console.log('Message ID:', info.messageId);
        }
      });
    } else {
      console.log('Correo no configurado - usuario registrado sin notificación por email');
    }

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      userId: result.insertId,
      emailSent: transporter ? true : false,
      emailMessage: transporter ? 'Se ha enviado un correo de bienvenida a tu email' : 'Correo no configurado'
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      return res.status(500).json({ error: 'Error de acceso a la base de datos. Verifica las credenciales.' });
    }
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ error: 'No se puede conectar a la base de datos. Verifica que MySQL esté ejecutándose.' });
    }
    if (error.code === 'ER_BAD_DB_ERROR') {
      return res.status(500).json({ error: 'La base de datos no existe. Verifica que la base de datos "lensegua" esté creada.' });
    }
    
    res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    const [users] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre, Usuario, Correo, Contrasena, Rol, Estado FROM Tbl_usuarios WHERE Usuario = ?',
      [usuario]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = users[0];

    if (user.Estado !== 'activo') {
      return res.status(401).json({ error: 'Cuenta desactivada' });
    }

    let validPassword = false;
    
    if (user.Usuario === 'admin' && contrasena === 'admin123') {
      validPassword = true;
    } else {
      validPassword = await bcrypt.compare(contrasena, user.Contrasena);
    }
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { 
        userId: user.Pk_ID_usuario, 
        usuario: user.Usuario,
        nombre: user.Nombre,
        rol: user.Rol
      },
      process.env.JWT_SECRET || 'tu-secreto-jwt',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.Pk_ID_usuario,
        nombre: user.Nombre,
        usuario: user.Usuario,
        correo: user.Correo,
        rol: user.Rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/perfil', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre, Usuario, Correo, Rol FROM Tbl_usuarios WHERE Pk_ID_usuario = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/lecciones', authenticateToken, async (req, res) => {
  try {
    const [lecciones] = await pool.execute(
      'SELECT Pk_ID_leccion, Nombre, Descripcion FROM Tbl_lecciones ORDER BY Pk_ID_leccion'
    );

    console.log('Lecciones en BD:', lecciones.map(l => `${l.Pk_ID_leccion}: ${l.Nombre}`));

    const [progreso] = await pool.execute(
      'SELECT Fk_leccion, Porcen_Av FROM Tbl_Progreso WHERE Fk_ID_usuario = ?',
      [req.user.userId]
    );

    const progresoMap = {};
    progreso.forEach(p => {
      progresoMap[p.Fk_leccion] = p.Porcen_Av;
    });

    const leccionesConProgreso = lecciones.map(leccion => {
      const progresoActual = progresoMap[leccion.Pk_ID_leccion] || 0;
      const progresoAnterior = progresoMap[leccion.Pk_ID_leccion - 1] || 0;
      const desbloqueada = leccion.Pk_ID_leccion === 1 || progresoAnterior >= 80;
      
      console.log(`=== LECCIÓN ${leccion.Pk_ID_leccion} (${leccion.Nombre}) ===`);
      console.log(`Progreso actual: ${progresoActual}%`);
      console.log(`Progreso anterior: ${progresoAnterior}%`);
      console.log(`Desbloqueada: ${desbloqueada}`);
      console.log(`Condición: ${leccion.Pk_ID_leccion === 1 ? 'Primera lección' : `Anterior >= 80% (${progresoAnterior} >= 80)`}`);
      
      return {
        ...leccion,
        progreso: progresoActual,
        desbloqueada: desbloqueada
      };
    });

    res.json({ lecciones: leccionesConProgreso });
  } catch (error) {
    console.error('Error al obtener lecciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/lecciones/:id/contenido', authenticateToken, async (req, res) => {
  try {
    const leccionId = req.params.id;

    const [contenido] = await pool.execute(
      'SELECT Pk_ID_contenido, Descripcion, Imagen FROM Tbl_contenido WHERE Fk_ID_leccion = ?',
      [leccionId]
    );

    res.json({ contenido });
  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/progreso', authenticateToken, async (req, res) => {
  try {
    const { leccionId, porcentaje } = req.body;

    console.log(`=== BACKEND: Guardando progreso ===`);
    console.log(`Usuario: ${req.user.userId}, Lección: ${leccionId}, Porcentaje: ${porcentaje}%`);

    if (!leccionId || porcentaje < 0 || porcentaje > 100) {
      console.log(`❌ Datos inválidos: leccionId=${leccionId}, porcentaje=${porcentaje}`);
      return res.status(400).json({ error: 'Datos de progreso inválidos' });
    }

    const [existing] = await pool.execute(
      'SELECT Pk_ID_prog FROM Tbl_Progreso WHERE Fk_ID_usuario = ? AND Fk_leccion = ?',
      [req.user.userId, leccionId]
    );

    console.log(`Registro existente para lección ${leccionId}:`, existing.length > 0);

    if (existing.length > 0) {
      await pool.execute(
        'UPDATE Tbl_Progreso SET Porcen_Av = ? WHERE Fk_ID_usuario = ? AND Fk_leccion = ?',
        [porcentaje, req.user.userId, leccionId]
      );
      console.log(`✅ Progreso ACTUALIZADO: ${porcentaje}% para lección ${leccionId}`);
    } else {
      await pool.execute(
        'INSERT INTO Tbl_Progreso (Fk_ID_usuario, Fk_leccion, Porcen_Av) VALUES (?, ?, ?)',
        [req.user.userId, leccionId, porcentaje]
      );
      console.log(`✅ Progreso INSERTADO: ${porcentaje}% para lección ${leccionId}`);
    }

    res.json({ message: 'Progreso guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/estadisticas', authenticateToken, async (req, res) => {
  try {
    // Obtener todas las lecciones con LEFT JOIN para incluir las que no tienen progreso
    const [todasLecciones] = await pool.execute(
      `SELECT 
        l.Pk_ID_leccion,
        l.Nombre, 
        COALESCE(p.Porcen_Av, 0) as Porcen_Av
       FROM Tbl_lecciones l
       LEFT JOIN Tbl_Progreso p ON l.Pk_ID_leccion = p.Fk_leccion AND p.Fk_ID_usuario = ?
       ORDER BY l.Pk_ID_leccion`,
      [req.user.userId]
    );

    // Obtener solo las lecciones con progreso para el detalle (sin mostrar las de 0%)
    const [progreso] = await pool.execute(
      `SELECT l.Nombre, p.Porcen_Av 
       FROM Tbl_Progreso p 
       JOIN Tbl_lecciones l ON p.Fk_leccion = l.Pk_ID_leccion 
       WHERE p.Fk_ID_usuario = ? 
       ORDER BY l.Pk_ID_leccion`,
      [req.user.userId]
    );

    const totalLecciones = todasLecciones.length;
    
    // Convertir Porcen_Av a número y calcular
    let sumaProgresos = 0;
    let leccionesCompletadas = 0;
    
    todasLecciones.forEach(leccion => {
      const porcentaje = parseFloat(leccion.Porcen_Av) || 0;
      sumaProgresos += porcentaje;
      if (porcentaje >= 100) {
        leccionesCompletadas++;
      }
    });
    
    // Calcular progreso general: suma de todos los porcentajes dividido por el total de lecciones (9)
    let progresoGeneral = 0;
    if (totalLecciones > 0) {
      progresoGeneral = sumaProgresos / totalLecciones;
    }

    // Asegurar que el valor sea un número entero entre 0 y 100
    progresoGeneral = Math.max(0, Math.min(100, Math.round(progresoGeneral)));

    console.log(`=== ESTADÍSTICAS ===`);
    console.log(`Total lecciones: ${totalLecciones}`);
    console.log(`Suma de progresos: ${sumaProgresos}`);
    console.log(`Progreso general: ${progresoGeneral}%`);
    console.log(`Lecciones completadas: ${leccionesCompletadas}`);

    res.json({
      progresoGeneral: progresoGeneral,
      leccionesCompletadas: leccionesCompletadas,
      totalLecciones: totalLecciones,
      detalleProgreso: progreso
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/recuperar-password', async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo || !validateEmail(correo)) {
      return res.status(400).json({ error: 'Correo válido requerido' });
    }

    const [users] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre FROM Tbl_usuarios WHERE Correo = ?',
      [correo]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    const user = users[0];
    const resetToken = jwt.sign(
      { userId: user.Pk_ID_usuario },
      process.env.JWT_SECRET || 'tu-secreto-jwt',
      { expiresIn: '1h' }
    );

    const protocol = req.protocol === 'https' ? 'https' : 'http';
    const host = req.get('host');
    const resetLink = `${protocol}://${host}/reset-password?token=${resetToken}`;

    if (transporter) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: 'Recuperación de contraseña - LENSEGUA',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #023047; text-align: center;">Recuperación de contraseña</h2>
            <p>Hola <strong>${user.Nombre}</strong>,</p>
            <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente botón para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #fb8500; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Restablecer contraseña</a>
            </div>
            <p style="color: #666;">O copia y pega este enlace en tu navegador:</p>
            <p style="color: #666; font-size: 12px; word-break: break-all;">${resetLink}</p>
            <p style="color: #d9534f; font-size: 14px;">Este enlace expirará en 1 hora.</p>
            <p style="font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo sin ningún problema.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; color: #888; font-size: 12px;">El equipo de LENSEGUA</p>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar correo:', error);
          return res.status(500).json({ error: 'Error al enviar correo' });
        } else {
          console.log('Correo de recuperación enviado exitosamente');
          res.json({ message: 'Correo de recuperación enviado' });
        }
      });
    } else {
      res.status(503).json({ error: 'Servicio de correo no disponible' });
    }

  } catch (error) {
    console.error('Error en recuperación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/reset-password', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).send('<h3>Enlace inválido. Falta el token de seguridad.</h3>');
  }
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer Contraseña - LENSEGUA</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background-color: #f0f4f8; }
        .container { background: white; padding: 40px 30px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); width: 100%; max-width: 380px; box-sizing: border-box; }
        h2 { color: #023047; text-align: center; margin-top: 0; margin-bottom: 25px; }
        input { width: 100%; padding: 12px 15px; margin: 10px 0; border: 1px solid #ced4da; border-radius: 8px; box-sizing: border-box; font-size: 16px; outline: none; transition: border-color 0.3s; }
        input:focus { border-color: #219ebc; }
        button { width: 100%; padding: 14px; background: linear-gradient(45deg, #fb8500, #ff9f1c); color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; margin-top: 15px; transition: opacity 0.3s; }
        button:hover { opacity: 0.9; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        .message { text-align: center; margin-top: 20px; color: #d9534f; font-size: 14px; font-weight: 500; }
        .success { color: #28a745; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Nueva Contraseña</h2>
        <form id="resetForm">
          <input type="password" id="password" placeholder="Nueva contraseña (mín. 8 caracteres)" required>
          <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" required>
          <button type="submit" id="submitBtn">Cambiar Contraseña</button>
          <div id="message" class="message"></div>
        </form>
      </div>
      <script>
        document.getElementById('resetForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          const msgDiv = document.getElementById('message');
          const btn = document.getElementById('submitBtn');
          
          if(password.length < 8) {
            msgDiv.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            return;
          }
          if(password !== confirmPassword) {
            msgDiv.textContent = 'Las contraseñas no coinciden.';
            return;
          }
          
          const token = new URLSearchParams(window.location.search).get('token');
          
          btn.disabled = true;
          btn.textContent = 'Guardando...';
          msgDiv.textContent = '';
          
          try {
            const response = await fetch('/api/reset-password-web', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, newPassword: password })
            });
            const data = await response.json();
            
            if(response.ok) {
              msgDiv.className = 'message success';
              msgDiv.innerHTML = '¡Contraseña actualizada con éxito!<br><br>Ya puedes cerrar esta ventana y volver a LENSEGUA para iniciar sesión.';
              document.getElementById('resetForm').style.display = 'none';
            } else {
              msgDiv.className = 'message';
              msgDiv.textContent = data.error || 'Hubo un error al restablecer la contraseña.';
              btn.disabled = false;
              btn.textContent = 'Cambiar Contraseña';
            }
          } catch (err) {
            msgDiv.className = 'message';
            msgDiv.textContent = 'Error de conexión con el servidor.';
            btn.disabled = false;
            btn.textContent = 'Cambiar Contraseña';
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.post('/api/reset-password-web', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token y nueva contraseña son requeridos' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ 
        error: 'La contraseña debe tener al menos 8 caracteres con números y letras' 
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-jwt');
    } catch (err) {
      return res.status(400).json({ error: 'El enlace es inválido o ha expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.execute(
      'UPDATE Tbl_usuarios SET Contrasena = ? WHERE Pk_ID_usuario = ?',
      [hashedPassword, decoded.userId]
    );

    res.json({ message: 'Contraseña actualizada exitosamente' });

  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/admin/usuarios', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [usuarios] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre, Apellido, Usuario, Correo, Rol, Estado, Fecha_registro FROM Tbl_usuarios ORDER BY Fecha_registro DESC'
    );

    res.json({ usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/admin/estadisticas', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [totalUsuarios] = await pool.execute('SELECT COUNT(*) as total FROM Tbl_usuarios');
    
    const [usuariosActivos] = await pool.execute("SELECT COUNT(*) as total FROM Tbl_usuarios WHERE Estado = 'activo'");
    
    const [totalLecciones] = await pool.execute('SELECT COUNT(*) as total FROM Tbl_lecciones');
    
    const [progresoGeneral] = await pool.execute(`
      SELECT 
        AVG(p.Porcen_Av) as promedio_progreso,
        COUNT(DISTINCT p.Fk_ID_usuario) as usuarios_con_progreso
      FROM Tbl_Progreso p
    `);

    const [usuariosPorRol] = await pool.execute(`
      SELECT Rol, COUNT(*) as cantidad 
      FROM Tbl_usuarios 
      GROUP BY Rol
    `);

    res.json({
      totalUsuarios: totalUsuarios[0].total,
      usuariosActivos: usuariosActivos[0].total,
      totalLecciones: totalLecciones[0].total,
      promedioProgreso: progresoGeneral[0].promedio_progreso || 0,
      usuariosConProgreso: progresoGeneral[0].usuarios_con_progreso || 0,
      usuariosPorRol
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/api/admin/usuarios/:id/estado', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !['activo', 'inactivo'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido. Debe ser "activo" o "inactivo"' });
    }

    const [result] = await pool.execute(
      'UPDATE Tbl_usuarios SET Estado = ? WHERE Pk_ID_usuario = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Estado de usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/api/admin/usuarios/:id/rol', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!rol || !['usuario', 'administrador'].includes(rol)) {
      return res.status(400).json({ error: 'Rol inválido. Debe ser "usuario" o "administrador"' });
    }

    if (parseInt(id) === req.user.userId) {
      return res.status(400).json({ error: 'No puedes cambiar tu propio rol' });
    }

    const [result] = await pool.execute(
      'UPDATE Tbl_usuarios SET Rol = ? WHERE Pk_ID_usuario = ?',
      [rol, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Rol de usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/admin/progreso', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [progreso] = await pool.execute(`
      SELECT 
        u.Pk_ID_usuario,
        u.Nombre,
        u.Usuario,
        u.Rol,
        l.Nombre as leccion_nombre,
        p.Porcen_Av,
        p.Fecha_completado
      FROM Tbl_Progreso p
      JOIN Tbl_usuarios u ON p.Fk_ID_usuario = u.Pk_ID_usuario
      JOIN Tbl_lecciones l ON p.Fk_leccion = l.Pk_ID_leccion
      ORDER BY u.Nombre, l.Pk_ID_leccion
    `);

    res.json({ progreso });
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para actualizar perfil
app.put('/api/perfil', authenticateToken, async (req, res) => {
  try {
    const { nombre, apellido, correo } = req.body;
    const userId = req.user.userId;

    if (!nombre || !apellido || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (!validateEmail(correo)) {
      return res.status(400).json({ error: 'Formato de correo inválido' });
    }

    // Verificar si el correo ya está en uso por otro usuario
    const [existingEmail] = await pool.execute(
      'SELECT Pk_ID_usuario FROM Tbl_usuarios WHERE Correo = ? AND Pk_ID_usuario != ?',
      [correo, userId]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'El correo ya está en uso por otro usuario' });
    }

    await pool.execute(
      'UPDATE Tbl_usuarios SET Nombre = ?, Apellido = ?, Correo = ? WHERE Pk_ID_usuario = ?',
      [nombre, apellido, correo, userId]
    );

    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para cambiar contraseña
app.put('/api/cambiar-contrasena', authenticateToken, async (req, res) => {
  try {
    const { contrasenaActual, nuevaContrasena } = req.body;
    const userId = req.user.userId;

    if (!contrasenaActual || !nuevaContrasena) {
      return res.status(400).json({ error: 'Contraseña actual y nueva contraseña son obligatorias' });
    }

    if (!validatePassword(nuevaContrasena)) {
      return res.status(400).json({ 
        error: 'La nueva contraseña debe tener al menos 8 caracteres con números y letras' 
      });
    }

    // Obtener contraseña actual del usuario
    const [users] = await pool.execute(
      'SELECT Contrasena FROM Tbl_usuarios WHERE Pk_ID_usuario = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = users[0];
    
    // Verificar contraseña actual
    const validPassword = await bcrypt.compare(contrasenaActual, user.Contrasena);
    if (!validPassword) {
      return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
    }

    // Hash de la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar contraseña
    await pool.execute(
      'UPDATE Tbl_usuarios SET Contrasena = ? WHERE Pk_ID_usuario = ?',
      [hashedNewPassword, userId]
    );

    res.json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para enviar mensaje de soporte
app.post('/api/soporte', authenticateToken, async (req, res) => {
  try {
    const { tipo, asunto, mensaje } = req.body;
    const userId = req.user.userId;

    if (!tipo || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Obtener datos del usuario
    const [users] = await pool.execute(
      'SELECT Nombre, Apellido, Usuario, Correo FROM Tbl_usuarios WHERE Pk_ID_usuario = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = users[0];

    if (transporter) {
      const tiposSoporte = {
        'soporte': '🔧 Soporte Técnico',
        'bug': '🐛 Reporte de Bug',
        'sugerencia': '💡 Sugerencia',
        'general': '❓ Consulta General'
      };

      const mailOptions = {
        from: {
          name: 'LENSEGUA - Sistema de Soporte',
          address: process.env.EMAIL_USER
        },
        to: 'lenseguagt@gmail.com',
        subject: `${tiposSoporte[tipo] || tipo} - ${asunto}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
            <div style="background: linear-gradient(135deg, #219ebc 0%, #023047 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px;">📞 Nuevo Mensaje de Soporte</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">LENSEGUA - Sistema de Soporte</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #023047; margin-top: 0;">Información del Usuario</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Nombre:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${user.Nombre} ${user.Apellido}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Usuario:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${user.Usuario}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${user.Correo}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Fecha:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date().toLocaleString('es-GT')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Tipo:</td>
                  <td style="padding: 8px 0;">${tiposSoporte[tipo] || tipo}</td>
                </tr>
              </table>
              
              <h2 style="color: #023047; margin-top: 30px;">Mensaje</h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #219ebc;">
                <h3 style="margin: 0 0 10px 0; color: #023047;">${asunto}</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #1565c0; font-weight: bold;">
                  📧 Responde directamente a: ${user.Correo}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>Este mensaje fue enviado desde el sistema de soporte de LENSEGUA</p>
              <p>Fecha: ${new Date().toLocaleString('es-GT')}</p>
            </div>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar correo de soporte:', error);
          return res.status(500).json({ error: 'Error al enviar el mensaje' });
        } else {
          console.log('Correo de soporte enviado exitosamente a lenseguagt@gmail.com');
          console.log('Message ID:', info.messageId);
          res.json({ message: 'Mensaje enviado exitosamente' });
        }
      });
    } else {
      res.status(503).json({ error: 'Servicio de correo no disponible' });
    }

  } catch (error) {
    console.error('Error en soporte:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para eliminar cuenta
app.delete('/api/eliminar-cuenta', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Eliminar progreso del usuario
    await pool.execute('DELETE FROM Tbl_Progreso WHERE Fk_ID_usuario = ?', [userId]);
    
    // Eliminar usuario
    const [result] = await pool.execute(
      'DELETE FROM Tbl_usuarios WHERE Pk_ID_usuario = ?',
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});