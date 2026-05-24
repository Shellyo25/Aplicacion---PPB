const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
};

async function main() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    console.log('=== TODOS LOS USUARIOS ===');
    const [usuarios] = await connection.execute('SELECT Pk_ID_usuario, Nombre, Usuario, Rol, Estado FROM Tbl_usuarios');
    console.log(JSON.stringify(usuarios, null, 2));

    console.log('\n=== TODO EL PROGRESO ===');
    const [progreso] = await connection.execute('SELECT * FROM Tbl_Progreso');
    console.log(JSON.stringify(progreso, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

main();
