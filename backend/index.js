require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use(limiter);

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'lensegua',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Configuración OAuth2 para Gmail
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

if (process.env.GMAIL_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });
}

// Configuración de nodemailer con OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER || 'tu-correo@gmail.com',
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: async () => {
      const { token } = await oauth2Client.getAccessToken();
      return token;
    }
  }
});

// Middleware de autenticación
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

// Validaciones
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
};

// Función para generar HTML del correo de confirmación
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
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #8ecae6, #219ebc);
                padding: 30px 20px;
                text-align: center;
            }
            .logo {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                color: #023047;
            }
            .title {
                color: #023047;
                font-size: 28px;
                font-weight: bold;
                margin: 0;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .welcome-text {
                font-size: 18px;
                color: #023047;
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .success-message {
                background-color: #e8f5e8;
                border: 2px solid #4CAF50;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .success-icon {
                font-size: 48px;
                color: #4CAF50;
                margin-bottom: 10px;
            }
            .features {
                text-align: left;
                margin: 30px 0;
            }
            .feature {
                display: flex;
                align-items: center;
                margin: 15px 0;
                font-size: 16px;
                color: #023047;
            }
            .feature-icon {
                width: 30px;
                height: 30px;
                background-color: #fb8500;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                color: white;
                font-weight: bold;
            }
            .footer {
                background-color: #023047;
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #fb8500;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">L</div>
                <h1 class="title">¡Bienvenido a LENSEGUA!</h1>
            </div>
            
            <div class="content">
                <div class="success-message">
                    <div class="success-icon">✓</div>
                    <h2 style="color: #4CAF50; margin: 0;">¡Usuario creado exitosamente!</h2>
                </div>
                
                <p class="welcome-text">
                    Hola <strong>${nombre}</strong>,<br><br>
                    ¡Tu cuenta ha sido creada exitosamente! Ahora puedes comenzar tu viaje de aprendizaje de la lengua de señas guatemalteca.
                </p>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">1</div>
                        <span>Lecciones interactivas y divertidas</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">2</div>
                        <span>Ejercicios prácticos para reforzar tu aprendizaje</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">3</div>
                        <span>Seguimiento de tu progreso personalizado</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">4</div>
                        <span>Logros y certificaciones</span>
                    </div>
                </div>
                
                <p style="color: #023047; font-size: 16px; margin: 30px 0;">
                    ¡Que tengas un excelente aprendizaje y bienvenido a nuestra comunidad!
                </p>
            </div>
            
            <div class="footer">
                <p>© 2024 LENSEGUA - Aprendiendo lengua de señas guatemalteca</p>
                <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Rutas

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor LENSEGUA funcionando correctamente' });
});

// Registro de usuario
app.post('/api/registro', async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, contrasena } = req.body;

    // Validaciones
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

    // Verificar si el correo ya existe
    const [existingEmail] = await pool.execute(
      'SELECT Pk_ID_usuario FROM Tbl_usuarios WHERE Correo = ?',
      [correo]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Verificar si el usuario ya existe
    const [existingUser] = await pool.execute(
      'SELECT Pk_ID_usuario FROM Tbl_usuarios WHERE Usuario = ?',
      [usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar usuario
    const [result] = await pool.execute(
      'INSERT INTO Tbl_usuarios (Nombre, Usuario, Correo, Contrasena, Estado) VALUES (?, ?, ?, ?, ?)',
      [`${nombre} ${apellido}`, usuario, correo, hashedPassword, 'activo']
    );

    // Enviar correo de confirmación
    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-correo@gmail.com',
      to: correo,
      subject: '¡Bienvenido a LENSEGUA! - Usuario creado exitosamente',
      html: generarHTMLConfirmacion(`${nombre} ${apellido}`)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar correo:', error);
      } else {
        console.log('Correo enviado exitosamente');
      }
    });

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    // Buscar usuario
    const [users] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre, Usuario, Correo, Contrasena, Estado FROM Tbl_usuarios WHERE Usuario = ?',
      [usuario]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = users[0];

    if (user.Estado !== 'activo') {
      return res.status(401).json({ error: 'Cuenta desactivada' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.Contrasena);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { 
        userId: user.Pk_ID_usuario, 
        usuario: user.Usuario,
        nombre: user.Nombre 
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
        correo: user.Correo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener perfil del usuario
app.get('/api/perfil', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT Pk_ID_usuario, Nombre, Usuario, Correo FROM Tbl_usuarios WHERE Pk_ID_usuario = ?',
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

// Obtener lecciones
app.get('/api/lecciones', authenticateToken, async (req, res) => {
  try {
    const [lecciones] = await pool.execute(
      'SELECT Pk_ID_leccion, Nombre, Descripcion FROM Tbl_lecciones ORDER BY Pk_ID_leccion'
    );

    // Obtener progreso del usuario
    const [progreso] = await pool.execute(
      'SELECT Fk_leccion, Porcen_Av FROM Tbl_Progreso WHERE Fk_ID_usuario = ?',
      [req.user.userId]
    );

    const progresoMap = {};
    progreso.forEach(p => {
      progresoMap[p.Fk_leccion] = p.Porcen_Av;
    });

    const leccionesConProgreso = lecciones.map(leccion => ({
      ...leccion,
      progreso: progresoMap[leccion.Pk_ID_leccion] || 0,
      desbloqueada: leccion.Pk_ID_leccion === 1 || progresoMap[leccion.Pk_ID_leccion - 1] >= 80
    }));

    res.json({ lecciones: leccionesConProgreso });
  } catch (error) {
    console.error('Error al obtener lecciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener contenido de una lección
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

// Guardar progreso
app.post('/api/progreso', authenticateToken, async (req, res) => {
  try {
    const { leccionId, porcentaje } = req.body;

    if (!leccionId || porcentaje < 0 || porcentaje > 100) {
      return res.status(400).json({ error: 'Datos de progreso inválidos' });
    }

    // Verificar si ya existe progreso para esta lección
    const [existing] = await pool.execute(
      'SELECT Pk_ID_prog FROM Tbl_Progreso WHERE Fk_ID_usuario = ? AND Fk_leccion = ?',
      [req.user.userId, leccionId]
    );

    if (existing.length > 0) {
      // Actualizar progreso existente
      await pool.execute(
        'UPDATE Tbl_Progreso SET Porcen_Av = ? WHERE Fk_ID_usuario = ? AND Fk_leccion = ?',
        [porcentaje, req.user.userId, leccionId]
      );
    } else {
      // Crear nuevo progreso
      await pool.execute(
        'INSERT INTO Tbl_Progreso (Fk_ID_usuario, Fk_leccion, Porcen_Av) VALUES (?, ?, ?)',
        [req.user.userId, leccionId, porcentaje]
      );
    }

    res.json({ message: 'Progreso guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener estadísticas del usuario
app.get('/api/estadisticas', authenticateToken, async (req, res) => {
  try {
    const [progreso] = await pool.execute(
      `SELECT l.Nombre, p.Porcen_Av 
       FROM Tbl_Progreso p 
       JOIN Tbl_lecciones l ON p.Fk_leccion = l.Pk_ID_leccion 
       WHERE p.Fk_ID_usuario = ? 
       ORDER BY l.Pk_ID_leccion`,
      [req.user.userId]
    );

    const totalLecciones = await pool.execute('SELECT COUNT(*) as total FROM Tbl_lecciones');
    const leccionesCompletadas = progreso.filter(p => p.Porcen_Av >= 80).length;
    const progresoGeneral = totalLecciones[0][0].total > 0 ? 
      (leccionesCompletadas / totalLecciones[0][0].total) * 100 : 0;

    res.json({
      progresoGeneral: Math.round(progresoGeneral),
      leccionesCompletadas,
      totalLecciones: totalLecciones[0][0].total,
      detalleProgreso: progreso
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Recuperar contraseña
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

    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-correo@gmail.com',
      to: correo,
      subject: 'Recuperación de contraseña - LENSEGUA',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Hola ${user.Nombre},</p>
        <p>Has solicitado recuperar tu contraseña. Usa el siguiente enlace para crear una nueva contraseña:</p>
        <p><a href="https://tu-app.com/reset-password?token=${resetToken}">Restablecer contraseña</a></p>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
        <br>
        <p>El equipo de LENSEGUA</p>
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

  } catch (error) {
    console.error('Error en recuperación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor LENSEGUA corriendo en el puerto ${PORT}`);
});