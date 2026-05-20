import { validarRegistro } from '../utils/registro.js';

console.log("---- REGISTRO TEST 1 ----");
console.log(validarRegistro("Juan", "Perez", "juan123", "correo@gmail.com", "abc12345") === "ok" ? "OK" : "ERROR");

console.log("---- REGISTRO TEST 2 ----");
console.log(validarRegistro("", "Perez", "juan123", "correo@gmail.com", "abc12345") === "nombre" ? "OK" : "ERROR");

console.log("---- REGISTRO TEST 3 ----");
console.log(validarRegistro("Juan", "", "juan123", "correo@gmail.com", "abc12345") === "apellido" ? "OK" : "ERROR");

console.log("---- REGISTRO TEST 4 ----");
console.log(validarRegistro("Juan", "Perez", "juan123", "correo@gmail.com", "123") === "longitud" ? "OK" : "ERROR");

console.log("---- REGISTRO TEST 5 ----");
console.log(validarRegistro("Juan", "Perez", "juan123", "correo@gmail.com", "abcdefg") === "formato" ? "OK" : "ERROR");