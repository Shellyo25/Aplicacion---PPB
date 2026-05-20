import { validarLogin } from '../utils/login.js';

console.log("---- LOGIN TEST 1 ----");
console.log(validarLogin("admin", "1234") ? "OK" : "ERROR");

console.log("---- LOGIN TEST 2 ----");
console.log(!validarLogin("", "") ? "OK" : "ERROR");

console.log("---- LOGIN TEST 3 ----");
console.log(!validarLogin("admin", "") ? "OK" : "ERROR");

console.log("---- LOGIN TEST 4 ----");
console.log(!validarLogin("", "1234") ? "OK" : "ERROR");