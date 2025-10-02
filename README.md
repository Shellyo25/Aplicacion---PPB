# LENSEGUA - Aplicación de Aprendizaje de Lengua de Señas Guatemalteca

Una aplicación móvil desarrollada con React Native y Expo para enseñar lengua de señas guatemalteca de manera interactiva, similar a Duolingo.

## 🚀 Características

### ✅ Requerimientos Implementados

#### REQ1 - Registro de Usuario
- ✅ Formulario completo con validaciones
- ✅ Validación de correo único
- ✅ Contraseña segura (mínimo 8 caracteres con números y letras)
- ✅ Envío de correo de confirmación
- ✅ Validación de campos obligatorios

#### REQ2 - Login
- ✅ Autenticación con JWT
- ✅ Validación de credenciales
- ✅ Mensajes de error personalizados
- ✅ Recuperación de contraseña por correo
- ✅ Redirección automática al menú principal

#### REQ3 - Pantalla de Inicio
- ✅ Mensaje de bienvenida personalizado
- ✅ Acceso rápido a lecciones
- ✅ Estadísticas de progreso
- ✅ Recomendaciones personalizadas

#### REQ4 - Menú Principal
- ✅ Navegación clara con íconos
- ✅ Acceso a lecciones y estadísticas
- ✅ Diseño intuitivo y accesible

#### REQ5 - Lecciones Progresivas
- ✅ Sistema de desbloqueo progresivo
- ✅ Organización por niveles
- ✅ Contenido estructurado por temas

#### REQ6 - Contenido Basado en Imágenes
- ✅ Material audiovisual optimizado
- ✅ Imágenes de alta calidad
- ✅ Optimizado para dispositivos móviles

#### REQ7 - Ejercicios Interactivos
- ✅ Opción múltiple
- ✅ Actividades de asociación
- ✅ Retroalimentación inmediata
- ✅ Guardado de resultados

#### REQ8 - Estadísticas de Progreso
- ✅ Porcentaje de avance por lección
- ✅ Historial de lecciones completadas
- ✅ Sistema de logros
- ✅ Progreso general

#### REQ9 - Base de Datos
- ✅ Almacenamiento de usuarios
- ✅ Registro de actividades
- ✅ Estadísticas detalladas
- ✅ Progreso por usuario

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación
- **AsyncStorage** - Almacenamiento local
- **FontAwesome** - Iconografía

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Nodemailer** - Envío de correos
- **Helmet** - Seguridad
- **Rate Limiting** - Protección contra spam

## 📦 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- Expo CLI
- Git

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Aplicacion---PPB
```

### 2. Configurar la Base de Datos
```bash
# Importar el esquema de la base de datos
mysql -u root -p < BD_PPB.sql
```

### 3. Configurar el Backend
```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env
# Editar .env con tus credenciales de base de datos y correo
```

### 4. Configurar el Frontend
```bash
cd frontend
npm install
```

### 5. Ejecutar la aplicación

#### Backend
```bash
cd backend
npm run dev
# El servidor estará disponible en http://localhost:3000
```

#### Frontend
```bash
cd frontend
npm start
# Escanear el código QR con Expo Go
```

## 🔧 Configuración

### Variables de Entorno (.env)
```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=lensegua

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro

# Correo
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# Puerto
PORT=3000
```

## 📱 Funcionalidades de la App

### Pantallas Principales
1. **Bienvenida** - Pantalla inicial con opciones de registro/login
2. **Registro** - Formulario de creación de cuenta
3. **Inicio de Sesión** - Autenticación de usuarios
4. **Inicio** - Dashboard personalizado con estadísticas
5. **Menú** - Navegación principal
6. **Lecciones** - Lista de lecciones disponibles
7. **Contenido** - Material de aprendizaje por lección
8. **Ejercicios** - Actividades interactivas
9. **Estadísticas** - Progreso y logros del usuario

### Características Técnicas
- **Autenticación JWT** con tokens seguros
- **Validaciones robustas** en frontend y backend
- **Encriptación de contraseñas** con bcrypt
- **Rate limiting** para prevenir ataques
- **Manejo de errores** comprehensivo
- **Interfaz responsive** y accesible
- **Navegación fluida** entre pantallas

## 🎯 Estructura del Proyecto

```
Aplicacion---PPB/
├── backend/
│   ├── index.js          # Servidor principal
│   ├── package.json      # Dependencias del backend
│   └── .env              # Variables de entorno
├── frontend/
│   ├── App.js            # Navegación principal
│   ├── pantallas/        # Pantallas de la aplicación
│   │   ├── Bienvenida.js
│   │   ├── Registro.js
│   │   ├── InicioSesion.js
│   │   ├── Inicio.js
│   │   ├── menu.js
│   │   ├── Listalecciones.js
│   │   ├── ContenidoLecciones.js
│   │   ├── Ejercicios.js
│   │   └── Estadisticas.js
│   └── package.json      # Dependencias del frontend
├── BD_PPB.sql           # Esquema de base de datos
└── README.md            # Este archivo
```

## 🔒 Seguridad

- **Autenticación JWT** con expiración
- **Encriptación de contraseñas** con bcrypt
- **Rate limiting** para prevenir ataques
- **Validación de entrada** en todas las rutas
- **Headers de seguridad** con Helmet
- **CORS** configurado apropiadamente

## 📊 Base de Datos

### Tablas Principales
- `Tbl_usuarios` - Información de usuarios
- `Tbl_lecciones` - Lecciones disponibles
- `Tbl_contenido` - Contenido de cada lección
- `Tbl_Progreso` - Progreso por usuario
- `Tbl_TipoLeccion` - Tipos de ejercicios
- `Tbl_Respuestas` - Respuestas de ejercicios

## 🚀 Despliegue

### Backend (Heroku/Railway/DigitalOcean)
1. Configurar variables de entorno en la plataforma
2. Conectar con base de datos MySQL en la nube
3. Desplegar código del backend

### Frontend (Expo/EAS Build)
1. Configurar EAS Build
2. Actualizar URL del backend en el código
3. Generar APK/IPA para distribución

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal** - Implementación completa del sistema
- **Encargada del PPB** - Requerimientos y validación

## 📞 Soporte

Para soporte técnico o preguntas sobre la aplicación, contactar al equipo de desarrollo.

---

**LENSEGUA** - Aprendiendo lengua de señas guatemalteca de manera interactiva 🇬🇹