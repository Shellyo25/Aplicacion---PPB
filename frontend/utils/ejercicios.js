export const esRespuestaCorrecta = (respuesta) => {
  return respuesta.correcta === true;
};

export const generarEjerciciosPorLeccion = (id) => {
  const ejercicios = {
    1: [
      { pregunta: 'Ejemplo', correcta: true }
    ],
    2: [
      { pregunta: 'Otro ejemplo', correcta: true }
    ]
  };

  return ejercicios[id] || ejercicios[1];
};