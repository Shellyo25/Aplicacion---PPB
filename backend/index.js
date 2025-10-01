require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//const express = require('express');
const nodemailer = require('nodemailer');
//const app = express();
//app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-correo@gmail.com',
    pass: 'tu-contraseña',
  },
});

app.post('/registro', async (req, res) => {
  const { Usuario, correo, contrasena } = req.body;

  
  const mensaje = {
    from: 'tu-correo@gmail.com',
    to: correo,
    subject: '¡Bienvenida a Lensegua!',
    text: `Hola ${Usuario}, tu cuenta ha sido creada exitosamente. ¡Gracias por unirte a Lensegua!`,
  };

  transporter.sendMail(mensaje, (error, info) => {
    if (error) {
      console.log('Error al enviar correo:', error);
      return res.status(500).json({ mensaje: 'Error al enviar correo' });
    } else {
      console.log('Correo enviado:', info.response);
      return res.status(200).json({ mensaje: 'Usuario registrado y correo enviado' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});