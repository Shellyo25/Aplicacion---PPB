import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export default function EjerciciosLeccion({ route, navigation }) {
  const { leccionId, nombreLeccion } = route.params;
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEjercicios();
  }, [leccionId]);

  const cargarEjercicios = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        navigation.navigate('InicioSesion');
        return;
      }

      // Por ahora usaremos ejercicios de ejemplo específicos para cada lección
      // En el futuro esto se puede conectar con la API
      const ejerciciosPorLeccion = generarEjerciciosPorLeccion(leccionId);
      
      setTimeout(() => {
        setEjercicios(ejerciciosPorLeccion);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error al cargar ejercicios:', error);
      setLoading(false);
    }
  };

  // Función para generar ejercicios específicos según la lección
  const generarEjerciciosPorLeccion = (leccionId) => {
    console.log('Generando ejercicios para lección ID:', leccionId, 'Nombre:', nombreLeccion);
    
    // Mapeo por nombre de lección para mayor precisión
    const mapeoPorNombre = {
      'Abecedario': 1,
      'Abecedario Básico': 1,
      'Números': 2,
      'Números Básicos': 2,
      'Expresiones de cortesía': 3, // Mapeo alternativo
      'Colores Básicos': 4,
      'Familia Principal': 5,
      'Lugares Comunes': 6,
      'Frutas Básicas': 7,
      'Verduras Básicas': 8,
      'Días de la Semana': 9,

    };
    
    // Usar el mapeo por nombre si está disponible, sino usar el ID directo
    const idEjercicios = mapeoPorNombre[nombreLeccion] || leccionId;
    console.log('ID de ejercicios a usar:', idEjercicios);
    
    const ejerciciosBase = {
      // ABECEDARIO (lecciones 1)
      1: [ // Abecedario (A-z)
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para la letra "A"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760313383/a_npesc9.jpg',
          opciones: [
            { id: 1, texto: 'Seña A', correcta: true },
            { id: 2, texto: 'Seña B', correcta: false },
            { id: 3, texto: 'Seña C', correcta: false },
            { id: 4, texto: 'Seña D', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de la letra "B"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760314589/b_f4wzta.jpg',
          opciones: [
            { id: 2, texto: 'Letra A', correcta: false },
            { id: 1, texto: 'Letra B', correcta: true  },
            { id: 3, texto: 'Letra C', correcta: false },
            { id: 4, texto: 'Letra D', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para la letra "C"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_c.png',
          opciones: [
            { id: 1, texto: 'Seña C', correcta: true  },
            { id: 2, texto: 'Seña A', correcta: false },
            { id: 3, texto: 'Seña B', correcta: false },
            { id: 4, texto: 'Seña D', correcta: false }
          ]
        }
      ],
      // NÚMEROS (lecciones 2)
      2: [ // Números Básicos (0-5)
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para el número "1"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png',
          opciones: [
            { id: 1, texto: 'Número 1', correcta: true },
            { id: 2, texto: 'Número 2', correcta: false },
            { id: 3, texto: 'Número 3', correcta: false },
            { id: 4, texto: 'Número 4', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta del número "3"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png',
          opciones: [
            { id: 1, texto: 'Número 3', correcta: true },
            { id: 2, texto: 'Número 2', correcta: false },
            { id: 3, texto: 'Número 4', correcta: false },
            { id: 4, texto: 'Número 5', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para el número "5"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_5.png',
          opciones: [
            { id: 1, texto: 'Número 5', correcta: true },
            { id: 2, texto: 'Número 4', correcta: false },
            { id: 3, texto: 'Número 6', correcta: false },
            { id: 4, texto: 'Número 7', correcta: false }
          ]
        }
      ],
      3: [ // Expresiones de cortesía
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Hola"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_hola.png',
          opciones: [
            { id: 1, texto: 'Saludo Hola', correcta: true },
            { id: 2, texto: 'Despedida', correcta: false },
            { id: 3, texto: 'Gracias', correcta: false },
            { id: 4, texto: 'Por favor', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Buenos días"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_buenos_dias.png',
          opciones: [
            { id: 1, texto: 'Buenos días', correcta: true },
            { id: 2, texto: 'Buenas tardes', correcta: false },
            { id: 3, texto: 'Buenas noches', correcta: false },
            { id: 4, texto: 'Hasta luego', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Adiós"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo_adios.png',
          opciones: [
            { id: 1, texto: 'Despedida Adiós', correcta: true },
            { id: 2, texto: 'Hola', correcta: false },
            { id: 3, texto: 'Gracias', correcta: false },
            { id: 4, texto: 'Por favor', correcta: false }
          ]
        }
      ],
      // COLORES (lecciones 4)
      4: [ // Colores Primarios
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para el color "Rojo"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rojo.png',
          opciones: [
            { id: 1, texto: 'Color Rojo', correcta: true },
            { id: 2, texto: 'Color Azul', correcta: false },
            { id: 3, texto: 'Color Verde', correcta: false },
            { id: 4, texto: 'Color Amarillo', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta del color "Azul"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_azul.png',
          opciones: [
            { id: 1, texto: 'Color Azul', correcta: true },
            { id: 2, texto: 'Color Rojo', correcta: false },
            { id: 3, texto: 'Color Verde', correcta: false },
            { id: 4, texto: 'Color Amarillo', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para el color "Verde"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_verde.png',
          opciones: [
            { id: 1, texto: 'Color Verde', correcta: true },
            { id: 2, texto: 'Color Rojo', correcta: false },
            { id: 3, texto: 'Color Azul', correcta: false },
            { id: 4, texto: 'Color Amarillo', correcta: false }
          ]
        }
      ],
      11: [ // Colores Secundarios
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para el color "Naranja"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_naranja.png',
          opciones: [
            { id: 1, texto: 'Color Naranja', correcta: true },
            { id: 2, texto: 'Color Morado', correcta: false },
            { id: 3, texto: 'Color Rosa', correcta: false },
            { id: 4, texto: 'Color Café', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta del color "Morado"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_morado.png',
          opciones: [
            { id: 1, texto: 'Color Morado', correcta: true },
            { id: 2, texto: 'Color Naranja', correcta: false },
            { id: 3, texto: 'Color Rosa', correcta: false },
            { id: 4, texto: 'Color Café', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para el color "Rosa"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_rosa.png',
          opciones: [
            { id: 1, texto: 'Color Rosa', correcta: true },
            { id: 2, texto: 'Color Naranja', correcta: false },
            { id: 3, texto: 'Color Morado', correcta: false },
            { id: 4, texto: 'Color Café', correcta: false }
          ]
        }
      ],
      12: [ // Colores Especiales
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para el color "Negro"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_negro.png',
          opciones: [
            { id: 1, texto: 'Color Negro', correcta: true },
            { id: 2, texto: 'Color Blanco', correcta: false },
            { id: 3, texto: 'Color Gris', correcta: false },
            { id: 4, texto: 'Color Dorado', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta del color "Blanco"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_blanco.png',
          opciones: [
            { id: 1, texto: 'Color Blanco', correcta: true },
            { id: 2, texto: 'Color Negro', correcta: false },
            { id: 3, texto: 'Color Gris', correcta: false },
            { id: 4, texto: 'Color Dorado', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para el color "Dorado"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/color_dorado.png',
          opciones: [
            { id: 1, texto: 'Color Dorado', correcta: true },
            { id: 2, texto: 'Color Negro', correcta: false },
            { id: 3, texto: 'Color Blanco', correcta: false },
            { id: 4, texto: 'Color Gris', correcta: false }
          ]
        }
      ],
      // FAMILIA (lecciones 13-15)
      13: [ // Familia Inmediata
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Mamá"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_mama.png',
          opciones: [
            { id: 1, texto: 'Mamá', correcta: true },
            { id: 2, texto: 'Papá', correcta: false },
            { id: 3, texto: 'Hermano', correcta: false },
            { id: 4, texto: 'Hermana', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Papá"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_papa.png',
          opciones: [
            { id: 1, texto: 'Papá', correcta: true },
            { id: 2, texto: 'Mamá', correcta: false },
            { id: 3, texto: 'Hermano', correcta: false },
            { id: 4, texto: 'Hermana', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Hermano"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_hermano.png',
          opciones: [
            { id: 1, texto: 'Hermano', correcta: true },
            { id: 2, texto: 'Hermana', correcta: false },
            { id: 3, texto: 'Mamá', correcta: false },
            { id: 4, texto: 'Papá', correcta: false }
          ]
        }
      ],
      14: [ // Familia Extendida
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Abuela"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuela.png',
          opciones: [
            { id: 1, texto: 'Abuela', correcta: true },
            { id: 2, texto: 'Abuelo', correcta: false },
            { id: 3, texto: 'Tío', correcta: false },
            { id: 4, texto: 'Tía', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Abuelo"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_abuelo.png',
          opciones: [
            { id: 1, texto: 'Abuelo', correcta: true },
            { id: 2, texto: 'Abuela', correcta: false },
            { id: 3, texto: 'Tío', correcta: false },
            { id: 4, texto: 'Tía', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Tío"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_tio.png',
          opciones: [
            { id: 1, texto: 'Tío', correcta: true },
            { id: 2, texto: 'Tía', correcta: false },
            { id: 3, texto: 'Abuela', correcta: false },
            { id: 4, texto: 'Abuelo', correcta: false }
          ]
        }
      ],
      15: [ // Relaciones Familiares
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Primo"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_primo.png',
          opciones: [
            { id: 1, texto: 'Primo', correcta: true },
            { id: 2, texto: 'Prima', correcta: false },
            { id: 3, texto: 'Sobrino', correcta: false },
            { id: 4, texto: 'Sobrina', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Prima"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_prima.png',
          opciones: [
            { id: 1, texto: 'Prima', correcta: true },
            { id: 2, texto: 'Primo', correcta: false },
            { id: 3, texto: 'Sobrino', correcta: false },
            { id: 4, texto: 'Sobrina', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Sobrino"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/familia_sobrino.png',
          opciones: [
            { id: 1, texto: 'Sobrino', correcta: true },
            { id: 2, texto: 'Sobrina', correcta: false },
            { id: 3, texto: 'Primo', correcta: false },
            { id: 4, texto: 'Prima', correcta: false }
          ]
        }
      ],
      // LUGARES (lecciones 16-18)
      16: [ // Lugares Comunes
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Casa"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_casa.png',
          opciones: [
            { id: 1, texto: 'Casa', correcta: true },
            { id: 2, texto: 'Escuela', correcta: false },
            { id: 3, texto: 'Hospital', correcta: false },
            { id: 4, texto: 'Tienda', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Escuela"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_escuela.png',
          opciones: [
            { id: 1, texto: 'Escuela', correcta: true },
            { id: 2, texto: 'Casa', correcta: false },
            { id: 3, texto: 'Hospital', correcta: false },
            { id: 4, texto: 'Tienda', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Hospital"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_hospital.png',
          opciones: [
            { id: 1, texto: 'Hospital', correcta: true },
            { id: 2, texto: 'Casa', correcta: false },
            { id: 3, texto: 'Escuela', correcta: false },
            { id: 4, texto: 'Tienda', correcta: false }
          ]
        }
      ],
      17: [ // Lugares Públicos
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Parque"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_parque.png',
          opciones: [
            { id: 1, texto: 'Parque', correcta: true },
            { id: 2, texto: 'Plaza', correcta: false },
            { id: 3, texto: 'Mercado', correcta: false },
            { id: 4, texto: 'Iglesia', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Plaza"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_plaza.png',
          opciones: [
            { id: 1, texto: 'Plaza', correcta: true },
            { id: 2, texto: 'Parque', correcta: false },
            { id: 3, texto: 'Mercado', correcta: false },
            { id: 4, texto: 'Iglesia', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Mercado"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_mercado.png',
          opciones: [
            { id: 1, texto: 'Mercado', correcta: true },
            { id: 2, texto: 'Parque', correcta: false },
            { id: 3, texto: 'Plaza', correcta: false },
            { id: 4, texto: 'Iglesia', correcta: false }
          ]
        }
      ],
      18: [ // Lugares Especiales
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Iglesia"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_iglesia.png',
          opciones: [
            { id: 1, texto: 'Iglesia', correcta: true },
            { id: 2, texto: 'Museo', correcta: false },
            { id: 3, texto: 'Teatro', correcta: false },
            { id: 4, texto: 'Biblioteca', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Museo"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_museo.png',
          opciones: [
            { id: 1, texto: 'Museo', correcta: true },
            { id: 2, texto: 'Iglesia', correcta: false },
            { id: 3, texto: 'Teatro', correcta: false },
            { id: 4, texto: 'Biblioteca', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Teatro"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lugar_teatro.png',
          opciones: [
            { id: 1, texto: 'Teatro', correcta: true },
            { id: 2, texto: 'Iglesia', correcta: false },
            { id: 3, texto: 'Museo', correcta: false },
            { id: 4, texto: 'Biblioteca', correcta: false }
          ]
        }
      ],
      // FRUTAS (lecciones 19-21)
      19: [ // Frutas Tropicales
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Banana"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_banana.png',
          opciones: [
            { id: 1, texto: 'Banana', correcta: true },
            { id: 2, texto: 'Mango', correcta: false },
            { id: 3, texto: 'Piña', correcta: false },
            { id: 4, texto: 'Papaya', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Mango"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_mango.png',
          opciones: [
            { id: 1, texto: 'Mango', correcta: true },
            { id: 2, texto: 'Banana', correcta: false },
            { id: 3, texto: 'Piña', correcta: false },
            { id: 4, texto: 'Papaya', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Piña"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_pina.png',
          opciones: [
            { id: 1, texto: 'Piña', correcta: true },
            { id: 2, texto: 'Banana', correcta: false },
            { id: 3, texto: 'Mango', correcta: false },
            { id: 4, texto: 'Papaya', correcta: false }
          ]
        }
      ],
      20: [ // Frutas de Temporada
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Manzana"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_manzana.png',
          opciones: [
            { id: 1, texto: 'Manzana', correcta: true },
            { id: 2, texto: 'Naranja', correcta: false },
            { id: 3, texto: 'Uva', correcta: false },
            { id: 4, texto: 'Fresa', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Naranja"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_naranja.png',
          opciones: [
            { id: 1, texto: 'Naranja', correcta: true },
            { id: 2, texto: 'Manzana', correcta: false },
            { id: 3, texto: 'Uva', correcta: false },
            { id: 4, texto: 'Fresa', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Uva"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_uva.png',
          opciones: [
            { id: 1, texto: 'Uva', correcta: true },
            { id: 2, texto: 'Manzana', correcta: false },
            { id: 3, texto: 'Naranja', correcta: false },
            { id: 4, texto: 'Fresa', correcta: false }
          ]
        }
      ],
      21: [ // Frutas Exóticas
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Kiwi"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_kiwi.png',
          opciones: [
            { id: 1, texto: 'Kiwi', correcta: true },
            { id: 2, texto: 'Coco', correcta: false },
            { id: 3, texto: 'Granada', correcta: false },
            { id: 4, texto: 'Maracuyá', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Coco"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_coco.png',
          opciones: [
            { id: 1, texto: 'Coco', correcta: true },
            { id: 2, texto: 'Kiwi', correcta: false },
            { id: 3, texto: 'Granada', correcta: false },
            { id: 4, texto: 'Maracuyá', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Granada"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/fruta_granada.png',
          opciones: [
            { id: 1, texto: 'Granada', correcta: true },
            { id: 2, texto: 'Kiwi', correcta: false },
            { id: 3, texto: 'Coco', correcta: false },
            { id: 4, texto: 'Maracuyá', correcta: false }
          ]
        }
      ],
      // VERDURAS (lecciones 22-24)
      22: [ // Verduras Básicas
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Tomate"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_tomate.png',
          opciones: [
            { id: 1, texto: 'Tomate', correcta: true },
            { id: 2, texto: 'Zanahoria', correcta: false },
            { id: 3, texto: 'Papa', correcta: false },
            { id: 4, texto: 'Cebolla', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Zanahoria"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_zanahoria.png',
          opciones: [
            { id: 1, texto: 'Zanahoria', correcta: true },
            { id: 2, texto: 'Tomate', correcta: false },
            { id: 3, texto: 'Papa', correcta: false },
            { id: 4, texto: 'Cebolla', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Papa"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_papa.png',
          opciones: [
            { id: 1, texto: 'Papa', correcta: true },
            { id: 2, texto: 'Tomate', correcta: false },
            { id: 3, texto: 'Zanahoria', correcta: false },
            { id: 4, texto: 'Cebolla', correcta: false }
          ]
        }
      ],
      23: [ // Verduras de Hoja
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Lechuga"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_lechuga.png',
          opciones: [
            { id: 1, texto: 'Lechuga', correcta: true },
            { id: 2, texto: 'Espinaca', correcta: false },
            { id: 3, texto: 'Col', correcta: false },
            { id: 4, texto: 'Apio', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Espinaca"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_espinaca.png',
          opciones: [
            { id: 1, texto: 'Espinaca', correcta: true },
            { id: 2, texto: 'Lechuga', correcta: false },
            { id: 3, texto: 'Col', correcta: false },
            { id: 4, texto: 'Apio', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Col"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_col.png',
          opciones: [
            { id: 1, texto: 'Col', correcta: true },
            { id: 2, texto: 'Lechuga', correcta: false },
            { id: 3, texto: 'Espinaca', correcta: false },
            { id: 4, texto: 'Apio', correcta: false }
          ]
        }
      ],
      24: [ // Verduras de Raíz
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Cebolla"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_cebolla.png',
          opciones: [
            { id: 1, texto: 'Cebolla', correcta: true },
            { id: 2, texto: 'Ajo', correcta: false },
            { id: 3, texto: 'Rábano', correcta: false },
            { id: 4, texto: 'Remolacha', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Ajo"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_ajo.png',
          opciones: [
            { id: 1, texto: 'Ajo', correcta: true },
            { id: 2, texto: 'Cebolla', correcta: false },
            { id: 3, texto: 'Rábano', correcta: false },
            { id: 4, texto: 'Remolacha', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Rábano"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_rabano.png',
          opciones: [
            { id: 1, texto: 'Rábano', correcta: true },
            { id: 2, texto: 'Cebolla', correcta: false },
            { id: 3, texto: 'Ajo', correcta: false },
            { id: 4, texto: 'Remolacha', correcta: false }
          ]
        }
      ],
      // TIEMPO (lecciones 25-27)
      25: [ // Días Básicos
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Lunes"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_lunes.png',
          opciones: [
            { id: 1, texto: 'Lunes', correcta: true },
            { id: 2, texto: 'Martes', correcta: false },
            { id: 3, texto: 'Miércoles', correcta: false },
            { id: 4, texto: 'Jueves', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Viernes"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_viernes.png',
          opciones: [
            { id: 1, texto: 'Viernes', correcta: true },
            { id: 2, texto: 'Lunes', correcta: false },
            { id: 3, texto: 'Sábado', correcta: false },
            { id: 4, texto: 'Domingo', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Sábado"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_sabado.png',
          opciones: [
            { id: 1, texto: 'Sábado', correcta: true },
            { id: 2, texto: 'Viernes', correcta: false },
            { id: 3, texto: 'Domingo', correcta: false },
            { id: 4, texto: 'Lunes', correcta: false }
          ]
        }
      ],
      26: [ // Meses del Año
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Enero"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_enero.png',
          opciones: [
            { id: 1, texto: 'Enero', correcta: true },
            { id: 2, texto: 'Febrero', correcta: false },
            { id: 3, texto: 'Marzo', correcta: false },
            { id: 4, texto: 'Abril', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Junio"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_junio.png',
          opciones: [
            { id: 1, texto: 'Junio', correcta: true },
            { id: 2, texto: 'Julio', correcta: false },
            { id: 3, texto: 'Agosto', correcta: false },
            { id: 4, texto: 'Septiembre', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Diciembre"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_diciembre.png',
          opciones: [
            { id: 1, texto: 'Diciembre', correcta: true },
            { id: 2, texto: 'Noviembre', correcta: false },
            { id: 3, texto: 'Octubre', correcta: false },
            { id: 4, texto: 'Septiembre', correcta: false }
          ]
        }
      ],
      27: [ // Tiempo y Estaciones
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña correcta para "Mañana"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_manana.png',
          opciones: [
            { id: 1, texto: 'Mañana', correcta: true },
            { id: 2, texto: 'Tarde', correcta: false },
            { id: 3, texto: 'Noche', correcta: false },
            { id: 4, texto: 'Día', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la seña correcta de "Verano"',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_verano.png',
          opciones: [
            { id: 1, texto: 'Verano', correcta: true },
            { id: 2, texto: 'Invierno', correcta: false },
            { id: 3, texto: 'Primavera', correcta: false },
            { id: 4, texto: 'Otoño', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la seña para "Invierno"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/tiempo_invierno.png',
          opciones: [
            { id: 1, texto: 'Invierno', correcta: true },
            { id: 2, texto: 'Verano', correcta: false },
            { id: 3, texto: 'Primavera', correcta: false },
            { id: 4, texto: 'Otoño', correcta: false }
          ]
        }
      ]
    };

    console.log('Ejercicios disponibles para ID', idEjercicios, ':', ejerciciosBase[idEjercicios] ? 'ENCONTRADOS' : 'NO ENCONTRADOS');
    
    if (!ejerciciosBase[idEjercicios]) {
      console.log('IDs disponibles:', Object.keys(ejerciciosBase));
      console.log('Usando fallback para lección:', idEjercicios);
    }
    
    return ejerciciosBase[idEjercicios] || ejerciciosBase[1]; // Fallback a abecedario básico
  };

  const seleccionarRespuesta = (opcion) => {
    if (mostrarResultado) return;
    setRespuestaSeleccionada(opcion);
  };

  const verificarRespuesta = () => {
    if (!respuestaSeleccionada) {
      Alert.alert('Selecciona una respuesta', 'Por favor elige una opción antes de continuar.');
      return;
    }

    setMostrarResultado(true);
    
    if (respuestaSeleccionada.correcta) {
      setPuntuacion(puntuacion + 10);
    }
    
    // Automáticamente pasar al siguiente ejercicio después de 2 segundos
    setTimeout(() => {
      siguienteEjercicio();
    }, 2000);
  };

  const siguienteEjercicio = () => {
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setEjercicioCompletado(true);
      guardarProgreso();
    }
  };

  const guardarProgreso = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // Calcular el porcentaje basado en las respuestas correctas
      const respuestasCorrectas = Math.floor(puntuacion / 10);
      const porcentajeReal = Math.round((respuestasCorrectas / ejercicios.length) * 100);
      
      console.log('Guardando progreso final:', { 
        leccionId, 
        respuestasCorrectas, 
        totalEjercicios: ejercicios.length,
        porcentajeReal 
      });
      
      await fetch(`${API_BASE_URL}/progreso`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leccionId: leccionId,
          porcentaje: porcentajeReal
        }),
      });
      
      console.log(`Progreso final guardado: ${porcentajeReal}% (${respuestasCorrectas}/${ejercicios.length} correctas)`);
    } catch (error) {
      console.error('Error al guardar progreso:', error);
    }
  };

  const reiniciarEjercicios = () => {
    setEjercicioActual(0);
    setRespuestaSeleccionada(null);
    setPuntuacion(0);
    setMostrarResultado(false);
    setEjercicioCompletado(false);
  };

  // Función para obtener la siguiente lección según el orden especificado
  const obtenerSiguienteLeccion = () => {
    const ordenLecciones = [
      'Abecedario Básico',
      'Números Básicos',
      'Expresiones de Cortesía',
      'Colores Básicos',
      'Familia Básica',
      'Lugares Comunes',
      'Frutas Tropicales',
      'Verduras Básicas',
      'Días de la Semana'
    ];

    const indiceActual = ordenLecciones.indexOf(nombreLeccion);
    
    if (indiceActual === -1 || indiceActual === ordenLecciones.length - 1) {
      return null; // No hay siguiente lección
    }
    
    return {
      id: indiceActual + 2, // +2 porque los IDs empiezan en 1
      nombre: ordenLecciones[indiceActual + 1]
    };
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando ejercicios...</Text>
      </View>
    );
  }

  if (ejercicioCompletado) {
    const porcentaje = Math.round((puntuacion / (ejercicios.length * 10)) * 100);
    const respuestasCorrectas = Math.floor(puntuacion / 10);
    
    // Determinar el mensaje según el rendimiento
    let mensajeFelicitacion = '';
    let iconoResultado = '';
    let colorResultado = '#fb8500';
    
    if (porcentaje >= 90) {
      mensajeFelicitacion = '¡Excelente! 🌟';
      iconoResultado = 'star';
      colorResultado = '#4CAF50';
    } else if (porcentaje >= 70) {
      mensajeFelicitacion = '¡Muy bien! 👏';
      iconoResultado = 'thumbs-up';
      colorResultado = '#2196F3';
    } else if (porcentaje >= 50) {
      mensajeFelicitacion = '¡Bien hecho! 👍';
      iconoResultado = 'smile-o';
      colorResultado = '#FF9800';
    } else {
      mensajeFelicitacion = '¡Sigue practicando! 💪';
      iconoResultado = 'refresh';
      colorResultado = '#f44336';
    }
    
    return (
      <View style={estilos.contenedor}>
        <View style={estilos.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
            <FontAwesome name="arrow-left" size={20} color="#023047" />
          </TouchableOpacity>
          <Text style={estilos.titulo}>¡Lección Completada! 🎉</Text>
          <View style={estilos.placeholder} />
        </View>

        <ScrollView style={estilos.contenido}>
          <View style={estilos.resultadoContainer}>
            <FontAwesome name={iconoResultado} size={80} color={colorResultado} />
            <Text style={estilos.tituloResultado}>{mensajeFelicitacion}</Text>
            <Text style={estilos.subtituloResultado}>{nombreLeccion}</Text>
            <Text style={estilos.mensajeCompletado}>
              {porcentaje >= 90 
                ? '¡Has dominado esta lección! 🎓' 
                : porcentaje >= 70 
                ? '¡Buen trabajo en esta lección! 📚' 
                : porcentaje >= 50 
                ? 'Has completado la lección, ¡sigue practicando! 📖'
                : 'Lección completada. Te recomendamos repetirla para mejorar. 💪'}
            </Text>
            
            <View style={estilos.estadisticasContainer}>
              <View style={estilos.estadisticaItem}>
                <Text style={estilos.estadisticaNumero}>{respuestasCorrectas}/{ejercicios.length}</Text>
                <Text style={estilos.estadisticaLabel}>Respuestas Correctas</Text>
              </View>
              
              <View style={estilos.estadisticaItem}>
                <Text style={estilos.estadisticaNumero}>{puntuacion}/{ejercicios.length * 10}</Text>
                <Text style={estilos.estadisticaLabel}>Puntuación Total</Text>
              </View>
              
              <View style={estilos.estadisticaItem}>
                <Text style={[estilos.estadisticaNumero, { color: colorResultado }]}>{porcentaje}%</Text>
                <Text style={estilos.estadisticaLabel}>Porcentaje</Text>
              </View>
            </View>
            
            <View style={estilos.botonesResultado}>
              {(() => {
                const siguienteLeccion = obtenerSiguienteLeccion();
                return (
                  <>
                    {siguienteLeccion ? (
                      <TouchableOpacity 
                        style={[estilos.boton, estilos.botonSiguiente]} 
                        onPress={() => navigation.navigate('ContenidoLecciones', { 
                          leccion: { 
                            Pk_ID_leccion: siguienteLeccion.id, 
                            Nombre: siguienteLeccion.nombre 
                          } 
                        })}
                      >
                        <FontAwesome name="arrow-right" size={20} color="#fff" style={estilos.iconoBoton} />
                        <Text style={estilos.botonTexto}>Siguiente lección: {siguienteLeccion.nombre}</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={[estilos.boton, estilos.botonFinalizado]} 
                        onPress={() => navigation.navigate('Listalecciones')}
                      >
                        <FontAwesome name="trophy" size={20} color="#fff" style={estilos.iconoBoton} />
                        <Text style={estilos.botonTexto}>¡Siguiente Lección! </Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity style={estilos.boton} onPress={reiniciarEjercicios}>
                      <FontAwesome name="refresh" size={20} color="#fff" style={estilos.iconoBoton} />
                      <Text style={estilos.botonTexto}>Repetir ejercicios</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[estilos.boton, estilos.botonSecundario]} 
                      onPress={() => navigation.navigate('ContenidoLecciones', { 
                        leccion: { 
                          Pk_ID_leccion: leccionId, 
                          Nombre: nombreLeccion 
                        } 
                      })}
                    >
                      <FontAwesome name="book" size={20} color="#023047" style={estilos.iconoBoton} />
                      <Text style={[estilos.botonTexto, estilos.botonTextoSecundario]}>Volver a la lección</Text>
                    </TouchableOpacity>
                  </>
                );
              })()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const ejercicio = ejercicios[ejercicioActual];

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
          <FontAwesome name="arrow-left" size={20} color="#023047" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Ejercicios - {nombreLeccion}</Text>
        <View style={estilos.placeholder} />
      </View>

      <ScrollView style={estilos.contenido}>
        {/* Progreso */}
        <View style={estilos.progresoContainer}>
          <Text style={estilos.progresoTexto}>
            Ejercicio {ejercicioActual + 1} de {ejercicios.length}
          </Text>
          <View style={estilos.barraProgreso}>
            <View 
              style={[
                estilos.barraProgresoFill, 
                { width: `${((ejercicioActual + 1) / ejercicios.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Pregunta */}
        <View style={estilos.preguntaContainer}>
          <Text style={estilos.preguntaTexto}>{ejercicio?.pregunta}</Text>
          {ejercicio?.imagen && (
            <Image source={{ uri: ejercicio.imagen }} style={estilos.imagenPregunta} />
          )}
        </View>

        {/* Opciones */}
        <View style={estilos.opcionesContainer}>
          {ejercicio?.opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={[
                estilos.opcion,
                respuestaSeleccionada?.id === opcion.id && estilos.opcionSeleccionada,
                mostrarResultado && opcion.correcta && estilos.opcionCorrecta,
                mostrarResultado && respuestaSeleccionada?.id === opcion.id && !opcion.correcta && estilos.opcionIncorrecta
              ]}
              onPress={() => seleccionarRespuesta(opcion)}
              disabled={mostrarResultado}
            >
              <Text style={[
                estilos.opcionTexto,
                respuestaSeleccionada?.id === opcion.id && estilos.opcionTextoSeleccionada,
                mostrarResultado && opcion.correcta && estilos.opcionTextoCorrecta
              ]}>
                {opcion.texto}
              </Text>
              {mostrarResultado && opcion.correcta && (
                <FontAwesome name="check" size={20} color="#4CAF50" />
              )}
              {mostrarResultado && respuestaSeleccionada?.id === opcion.id && !opcion.correcta && (
                <FontAwesome name="times" size={20} color="#f44336" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback inmediato */}
        {mostrarResultado && (
          <View style={estilos.feedbackContainer}>
            <Text style={[
              estilos.feedbackTexto,
              respuestaSeleccionada?.correcta ? estilos.feedbackCorrecto : estilos.feedbackIncorrecto
            ]}>
              {respuestaSeleccionada?.correcta ? '¡Correcto! 🎉' : 'Incorrecto 😔'}
            </Text>
            <Text style={estilos.feedbackSubtexto}>
              {respuestaSeleccionada?.correcta 
                ? '¡Excelente trabajo! Pasando al siguiente ejercicio...' 
                : 'No te preocupes, sigue practicando. Pasando al siguiente ejercicio...'}
            </Text>
          </View>
        )}

        {/* Botón de verificación */}
        {!mostrarResultado && (
          <TouchableOpacity style={estilos.botonVerificar} onPress={verificarRespuesta}>
            <Text style={estilos.botonVerificarTexto}>Verificar respuesta</Text>
          </TouchableOpacity>
        )}

        {/* Puntuación */}
        <View style={estilos.puntuacionContainer}>
          <Text style={estilos.puntuacionTexto}>Puntuación: {puntuacion}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#8ecae6',
  },
  centrado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  botonAtras: {
    padding: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  contenido: {
    flex: 1,
    padding: 20,
  },
  progresoContainer: {
    marginBottom: 20,
  },
  progresoTexto: {
    fontSize: 16,
    color: '#023047',
    marginBottom: 10,
    textAlign: 'center',
  },
  barraProgreso: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barraProgresoFill: {
    height: '100%',
    backgroundColor: '#fb8500',
    borderRadius: 4,
  },
  preguntaContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preguntaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 15,
  },
  imagenPregunta: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  opcionesContainer: {
    marginBottom: 20,
  },
  opcion: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  opcionSeleccionada: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  opcionCorrecta: {
    backgroundColor: '#e8f5e8',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  opcionIncorrecta: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  opcionTexto: {
    fontSize: 16,
    color: '#023047',
    flex: 1,
  },
  opcionTextoSeleccionada: {
    fontWeight: 'bold',
  },
  opcionTextoCorrecta: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  botonVerificar: {
    backgroundColor: '#fb8500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonVerificarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  puntuacionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  puntuacionTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
  },
  resultadoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tituloResultado: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#023047',
    marginTop: 20,
    marginBottom: 5,
  },
  subtituloResultado: {
    fontSize: 18,
    color: '#023047',
    marginBottom: 15,
    textAlign: 'center',
  },
  mensajeCompletado: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  botonesResultado: {
    width: '100%',
    gap: 15,
  },
  boton: {
    flexDirection: 'row',
    backgroundColor: '#fb8500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonSecundario: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#023047',
  },
  botonSiguiente: {
    backgroundColor: '#4CAF50',
  },
  botonFinalizado: {
    backgroundColor: '#FF9800',
  },
  iconoBoton: {
    marginRight: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonTextoSecundario: {
    color: '#023047',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
  feedbackContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  feedbackCorrecto: {
    color: '#4CAF50',
  },
  feedbackIncorrecto: {
    color: '#f44336',
  },
  feedbackSubtexto: {
    fontSize: 16,
    color: '#023047',
    textAlign: 'center',
    opacity: 0.8,
  },
  estadisticasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estadisticaItem: {
    alignItems: 'center',
    flex: 1,
  },
  estadisticaNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  estadisticaLabel: {
    fontSize: 12,
    color: '#023047',
    textAlign: 'center',
    opacity: 0.7,
  },
});
