import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator, Vibration } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'https://aplicacion-lensegua-backend.onrender.com/api';

export default function EjerciciosLeccion({ route, navigation }) {
  const { leccionId, nombreLeccion } = route.params;
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('LECCION ID RECIBIDO:', leccionId);

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
      'Frases de cortesía': 2,
      'Familia Principal': 3,
      'Pronombres Personales Básicas': 4,
      'Colores Básicos': 5,
      'Lugares Comunes': 6,
      'Días de la Semana': 7,
      'Números': 8,
      'Números Básicos': 8,
      'Verduras Básicas': 9,

    };

    // Usar el mapeo por nombre si está disponible, sino usar el ID directo
    const idEjercicios = mapeoPorNombre[nombreLeccion] || leccionId;
    console.log('ID de ejercicios a usar:', idEjercicios);

    const ejerciciosBase = {
      // ABECEDARIO (lecciones 1)
      1: [ // Abecedario (A–Z)
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/w_300,h_300,c_fill/v1760415292/WhatsApp_Image_2025-10-13_at_9.59.47_PM_vxunhd.jpg', // Letra A
          opciones: [
            { id: 1, texto: 'Letra A', correcta: true },
            { id: 2, texto: 'Letra B', correcta: false },
            { id: 3, texto: 'Letra C', correcta: false },
            { id: 4, texto: 'Letra D', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde a la letra "LL"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762308684/rr_wfhdy9.png', // Letra RR
          opciones: [
            { id: 1, texto: 'Falso', correcta: true },
            { id: 2, texto: 'Verdadero', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760415275/WhatsApp_Image_2025-10-13_at_9.59.47_PM_10_s84bpz.jpg', // Letra H
          opciones: [
            { id: 1, texto: 'Letra G', correcta: false },
            { id: 2, texto: 'Letra J', correcta: false },
            { id: 3, texto: 'Letra H', correcta: true },
            { id: 4, texto: 'Letra I', correcta: false }
          ]
        }
      ],
      // FRASES DE CORTESÍA (Lección 2)
      2: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221315/Buenos_dias_sgfyqc.png', // Buenos días
          opciones: [
            { id: 1, texto: 'Buenas noches', correcta: false },
            { id: 2, texto: 'Hola', correcta: false },
            { id: 3, texto: 'Buenos días', correcta: true },
            { id: 4, texto: 'Buenas tardes', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde a "Por favor"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221336/Por_favor_bms6do.png', // Por favor
          opciones: [
            { id: 1, texto: 'Falso', correcta: false },
            { id: 2, texto: 'Verdadero', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221338/Te_amo_ueioc5.png', // Te amo
          opciones: [
            { id: 1, texto: 'Bien', correcta: false },
            { id: 2, texto: 'Cuidado', correcta: false },
            { id: 3, texto: 'Te amo', correcta: true },
            { id: 4, texto: 'Adiós', correcta: false }
          ]
        }
      ],
      // FAMILIA (Lección 3)
      3: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221389/Mama_vgjzmn.png', // Mamá
          opciones: [
            { id: 1, texto: 'Papá', correcta: false },
            { id: 2, texto: 'Hermana', correcta: false },
            { id: 3, texto: 'Mamá', correcta: true },
            { id: 4, texto: 'Abuela', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde a "Tío"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221386/Hermano_sevgyt.png', // Hermano
          opciones: [
            { id: 1, texto: 'Verdadero', correcta: false },
            { id: 2, texto: 'Falso', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221383/Abuelo_qusoja.png', // Abuelo
          opciones: [
            { id: 1, texto: 'Abuela', correcta: false },
            { id: 2, texto: 'Tío', correcta: false },
            { id: 3, texto: 'Abuelo', correcta: true },
            { id: 4, texto: 'Papá', correcta: false }
          ]
        }
      ],
      // PRONOMBRES PERSONALES (Lección 4)
      4: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221267/Yo_flckpv.png', // Yo
          opciones: [
            { id: 1, texto: 'Tú', correcta: false },
            { id: 2, texto: 'Él', correcta: false },
            { id: 3, texto: 'Yo', correcta: true },
            { id: 4, texto: 'Ella', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde a "Nosotros"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221262/nosotros_b6llug.png', // Nosotros
          opciones: [
            { id: 1, texto: 'Falso', correcta: false },
            { id: 2, texto: 'Verdadero', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1762221265/Tuyo_isoqrx.png', // Tuyo
          opciones: [
            { id: 1, texto: 'Mío', correcta: false },
            { id: 2, texto: 'Tuyo', correcta: true },
            { id: 3, texto: 'Nuestro', correcta: false },
            { id: 4, texto: 'Ustedes', correcta: false }
          ]
        }
      ],
      // COLORES (Lección 5)
      5: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué color representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914178/rojo_oxklqy.png', // Rojo
          opciones: [
            { id: 1, texto: 'Rojo', correcta: true },
            { id: 2, texto: 'Azul', correcta: false },
            { id: 3, texto: 'Amarillo', correcta: false },
            { id: 4, texto: 'Verde', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde al color "Negro"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914166/blanco_mlenru.png', // Blanco
          opciones: [
            { id: 1, texto: 'Falso', correcta: true },
            { id: 2, texto: 'Verdadero', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué color representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760914174/morado_rhylwi.png', // Morado
          opciones: [
            { id: 1, texto: 'Naranja', correcta: false },
            { id: 2, texto: 'Morado', correcta: true },
            { id: 3, texto: 'Rosa', correcta: false },
            { id: 4, texto: 'Café', correcta: false }
          ]
        }
      ],
      // LUGARES COMUNES (Lección 6)
      6: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué lugar representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928260/casa_jjq0wl.jpg', // Casa
          opciones: [
            { id: 1, texto: 'Escuela', correcta: false },
            { id: 2, texto: 'Casa', correcta: true },
            { id: 3, texto: 'Hotel', correcta: false },
            { id: 4, texto: 'Banco', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña pertenece a "Iglesia"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928268/hospital_xa8pv1.png', // Hospital
          opciones: [
            { id: 1, texto: 'Falso', correcta: true },
            { id: 2, texto: 'Verdadero', correcta: false }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué lugar representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760928272/iglesia_z4hka3.png', // Iglesia
          opciones: [
            { id: 1, texto: 'Restaurante', correcta: false },
            { id: 2, texto: 'Iglesia', correcta: true },
            { id: 3, texto: 'Hotel', correcta: false },
            { id: 4, texto: 'Banco', correcta: false }
          ]
        }
      ],
      // DÍAS DE LA SEMANA (Lección 7)
      7: [
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué día de la semana representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992875/lunes_xs5lmp.png', // Lunes
          opciones: [
            { id: 1, texto: 'Martes', correcta: false },
            { id: 2, texto: 'Viernes', correcta: false },
            { id: 3, texto: 'Lunes', correcta: true },
            { id: 4, texto: 'Domingo', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'Verdadero o Falso',
          pregunta: '¿Esta seña corresponde al día "Sábado"?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992882/sabado_aeqgov.png', // Sábado
          opciones: [
            { id: 1, texto: 'Falso', correcta: false },
            { id: 2, texto: 'Verdadero', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué día de la semana representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1760992870/domingo_eg4cpk.png', // Domingo
          opciones: [
            { id: 1, texto: 'Jueves', correcta: false },
            { id: 2, texto: 'Domingo', correcta: true },
            { id: 3, texto: 'Miércoles', correcta: false },
            { id: 4, texto: 'Viernes', correcta: false }
          ]
        }
      ],

      // NÚMEROS (lecciones 2)
      8: [ // Números Básicos (0-5)
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué número representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779075285/cinco_itgba0.jpg',
          opciones: [
            { id: 1, texto: 'Número 4', correcta: false },
            { id: 2, texto: 'Número 6', correcta: false },
            { id: 3, texto: 'Número 5', correcta: true },
            { id: 4, texto: 'Número 7', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con el número correspondiente',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779087640/12_wakccw.png',
          opciones: [
            { id: 1, texto: 'Número 2', correcta: false },
            { id: 2, texto: 'Número 11', correcta: false },
            { id: 3, texto: 'Número 5', correcta: false },
            { id: 4, texto: 'Número 12', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué número representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_3.png',
          opciones: [
            { id: 1, texto: 'Número 2', correcta: false },
            { id: 2, texto: 'Número 3', correcta: true },
            { id: 3, texto: 'Número 1', correcta: false },
            { id: 4, texto: 'Número 4', correcta: false }
          ]
        }
      ],
      // VERDURAS (lecciones 9)
      9: [ // Verduras Básicas
        {
          id: 1,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué verdura representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779087668/papa_ajjbqu.png',
          opciones: [
            { id: 1, texto: 'Rábano', correcta: false },
            { id: 2, texto: 'Papa', correcta: true },
            { id: 3, texto: 'Repollo', correcta: false },
            { id: 4, texto: 'Elote', correcta: false }
          ]
        },
        {
          id: 2,
          tipo: 'asociacion',
          pregunta: 'Asocia la imagen con la verdura correspondiente',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1779087666/zanahoria_j5ofe2.png',
          opciones: [
            { id: 1, texto: 'Tomate', correcta: false },
            { id: 2, texto: 'Papa', correcta: false },
            { id: 3, texto: 'Cebolla', correcta: false },
            { id: 4, texto: 'Zanahoria', correcta: true }
          ]
        },
        {
          id: 3,
          tipo: 'opcion_multiple',
          pregunta: '¿Qué verdura representa esta seña?',
          imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/verdura_tomate.png',
          opciones: [
            { id: 1, texto: 'Papa', correcta: false },
            { id: 2, texto: 'Zanahoria', correcta: false },
            { id: 3, texto: 'Tomate', correcta: true },
            { id: 4, texto: 'Cebolla', correcta: false }
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

  const verificarRespuesta = async () => {
    if (!respuestaSeleccionada) {
      Alert.alert('Selecciona una respuesta', 'Por favor elige una opción antes de continuar.');
      return;
    }

    setMostrarResultado(true);

    // Actualizar puntuación de forma síncrona
    let nuevaPuntuacion = puntuacion;
    let nuevasCorrectas = correctas;

    if (respuestaSeleccionada.correcta) {
      nuevaPuntuacion += 10;
      nuevasCorrectas += 1;
    } else {
      try {
        const configStr = await AsyncStorage.getItem('configuraciones');
        let vibrar = true;
        if (configStr) {
          const config = JSON.parse(configStr);
          vibrar = config.vibracion;
        }
        if (vibrar) {
          Vibration.vibrate(500); // 500ms de vibración en error
        }
      } catch (error) {
        console.error('Error al leer config de vibracion:', error);
      }
    }

    setPuntuacion(nuevaPuntuacion);
    setCorrectas(nuevasCorrectas);

    // Automáticamente pasar al siguiente ejercicio después de 2 segundos
    setTimeout(() => {
      siguienteEjercicio(nuevaPuntuacion);
    }, 2000);
  };

  useEffect(() => {

    if (route.params?.desdeCamara) {

      const nuevaPuntuacion = puntuacion + 10;

      setPuntuacion(nuevaPuntuacion);

      setMostrarResultado(false);

      setTimeout(() => {

        siguienteEjercicio(nuevaPuntuacion);

      }, 500);

      navigation.setParams({
        desdeCamara: null
      });
    }

  }, [route.params]);


  const siguienteEjercicio = (puntuacionActual = null) => {
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setEjercicioCompletado(true);
      // Usar la puntuación actual si se proporciona, sino usar el estado
      const puntuacionFinal = puntuacionActual !== null ? puntuacionActual : puntuacion;
      guardarProgreso(puntuacionFinal);
    }
  };

  const guardarProgreso = async (puntuacionFinal = null) => {
    try {
      const token = await AsyncStorage.getItem('token');

      // Usar la puntuación proporcionada o el estado actual
      const puntuacionActual = puntuacionFinal !== null ? puntuacionFinal : puntuacion;

      // Calcular respuestas correctas de manera más simple y robusta
      const respuestasCorrectas = Math.floor(puntuacionActual / 10);
      let porcentajeReal;

      // Si todas las respuestas son correctas, forzar 100%
      if (respuestasCorrectas === ejercicios.length) {
        porcentajeReal = 100;
      } else {
        // Para otros casos, calcular normalmente
        porcentajeReal = Math.round((respuestasCorrectas / ejercicios.length) * 100);
      }

      console.log('=== GUARDANDO PROGRESO ===');
      console.log('Puntuación total:', puntuacionActual);
      console.log('Respuestas correctas:', respuestasCorrectas);
      console.log('Total ejercicios:', ejercicios.length);
      console.log('Porcentaje calculado:', porcentajeReal);
      console.log('Lección ID:', leccionId);

      const response = await fetch(`${API_BASE_URL}/progreso`, {
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

      if (response.ok) {
        console.log(`✅ Progreso guardado exitosamente: ${porcentajeReal}%`);

        // Si se completó al 100%, mostrar mensaje de éxito
        if (porcentajeReal === 100) {
          console.log('🎉 ¡Lección completada al 100%! La siguiente lección debería desbloquearse.');
        }
      } else {
        console.error(' Error al guardar progreso:', response.status);
      }

    } catch (error) {
      console.error(' Error al guardar progreso:', error);
    }
  };

  const reiniciarEjercicios = async () => {
    setEjercicioActual(0);
    setRespuestaSeleccionada(null);
    setPuntuacion(0);
    setMostrarResultado(false);
    setEjercicioCompletado(false);

    // Resetear el progreso en la base de datos también
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_BASE_URL}/progreso`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leccionId: leccionId,
          porcentaje: 0
        }),
      });
      console.log('Progreso reseteado a 0% para reiniciar ejercicios');
    } catch (error) {
      console.error('Error al resetear progreso:', error);
    }
  };

  // Función para obtener la siguiente lección según el orden especificado
  const obtenerSiguienteLeccion = () => {
    const ordenLecciones = [
      'Abecedario Básico',
      'Frases de Cortesía',
      'Familia Principal',
      'Pronombres Personales Básicos',
      'Colores Básicos',
      'Lugares Comunes',
      'Días de la Semana',
      'Números Básicos',
      'Verduras Básicas'
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
          <TouchableOpacity onPress={() => navigation.navigate('Listalecciones')} style={estilos.botonAtras}>
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
                        style={[
                          estilos.boton,
                          porcentaje >= 80 ? estilos.botonSiguiente : { backgroundColor: '#A0A0A0' }
                        ]}
                        onPress={() => {
                          if (porcentaje >= 80) {
                            navigation.navigate('ContenidoLecciones', {
                              leccion: {
                                Pk_ID_leccion: siguienteLeccion.id,
                                Nombre: siguienteLeccion.nombre
                              }
                            });
                          } else {
                            Alert.alert(
                              'Lección no aprobada',
                              'Necesitas tener más respuestas correctas para desbloquear la siguiente lección. ¡Haz clic en "Repetir ejercicios" y vuelve a intentarlo!'
                            );
                          }
                        }}
                      >
                        <FontAwesome name="arrow-right" size={20} color="#fff" style={estilos.iconoBoton} />
                        <Text style={estilos.botonTexto}>Siguiente Lección</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[estilos.boton, estilos.botonFinalizado]}
                        onPress={() => navigation.navigate('Listalecciones')}
                      >
                        <FontAwesome name="trophy" size={20} color="#fff" style={estilos.iconoBoton} />
                        <Text style={estilos.botonTexto}>Terminar curso</Text>
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
  const esUltimoEjercicio = ejercicioActual === ejercicios.length - 1;
  let seniaObjetivo = '';

  if (leccionId === 1) {
    seniaObjetivo = 'K';
  }

  if (leccionId === 2) {
    seniaObjetivo = 'Hola';
  }

  if (leccionId === 3) {
    seniaObjetivo = 'Hermana';
  }

  if (leccionId === 4) {
    seniaObjetivo = 'Tuyo';
  }

  if (leccionId === 5) {
    seniaObjetivo = 'Morado';
  }

  if (leccionId === 6) {
    seniaObjetivo = 'Banco';
  }

  if (leccionId === 7) {
    seniaObjetivo = 'Viernes';
  }

  if (leccionId === 8) {
    seniaObjetivo = 'Tres';
  }

  if (leccionId === 9) {
    seniaObjetivo = 'Tomate';
  }
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
        {esUltimoEjercicio ? (
          <View style={estilos.preguntaContainer}>
            <Text style={estilos.preguntaTexto}>
              Ejercicio final: Realiza la seña "{seniaObjetivo}"
            </Text>
            <Text style={{ color: '#fb8500', fontWeight: 'bold', marginTop: 10 }}>
              Este es un ejercicio práctico 🎯
            </Text>

            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Activa la cámara y realiza la seña correctamente
            </Text>

            <TouchableOpacity
              style={estilos.botonVerificar}
              onPress={() => {
                navigation.navigate('EjercicioCamara', {
                  seniaObjetivo,
                  leccionId,
                  nombreLeccion
                });

              }}
            >
              <Text style={estilos.botonVerificarTexto}>
                Activar cámara
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>

            <View style={estilos.preguntaContainer}>
              <Text style={estilos.preguntaTexto}>{ejercicio?.pregunta}</Text>
              {ejercicio?.imagen && (
                <Image source={{ uri: ejercicio.imagen }} style={estilos.imagenPregunta} resizeMode="contain" />
              )}
            </View>

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
                  <Text style={estilos.opcionTexto}>
                    {opcion.texto}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

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
        {!mostrarResultado && !esUltimoEjercicio && (
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
  /* view de imagenes */
  imagenPregunta: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    alignSelf: 'center',
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
    textAlign: 'center',
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
