const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SHELLY\\Proyecto Final\\Aplicacion---PPB\\frontend\\pantallas';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('http://192.168.1.20:3000/api')) {
      content = content.replace(/http:\/\/192\.168\.1\.20:3000\/api/g, 'https://aplicacion-lensegua-backend.onrender.com/api');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Actualizado: ${file}`);
    }
  }
});

console.log('¡Todas las IPs han sido actualizadas!');
