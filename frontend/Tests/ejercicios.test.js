import { esRespuestaCorrecta, generarEjerciciosPorLeccion } from '../utils/ejercicios.js';

console.log("---- PRUEBA 1 ----");
console.log(esRespuestaCorrecta({ correcta: true }) ? "OK" : "ERROR");

console.log("---- PRUEBA 2 ----");
console.log(!esRespuestaCorrecta({ correcta: false }) ? "OK" : "ERROR");

console.log("---- PRUEBA 3 ----");
const ejercicios = generarEjerciciosPorLeccion(1);
console.log(ejercicios.length > 0 ? "OK" : "ERROR");