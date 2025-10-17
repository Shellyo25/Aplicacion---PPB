import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

// Datos de ejemplo para ejercicios
const ejerciciosEjemplo = [
  {
    id: 1,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es la seña correcta para la letra "A"?',
    imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/letra_a.png',
    opciones: [
      { id: 1, texto: 'Opción A', correcta: true },
      { id: 2, texto: 'Opción B', correcta: false },
      { id: 3, texto: 'Opción C', correcta: false },
      { id: 4, texto: 'Opción D', correcta: false }
    ]
  },
  {
    id: 2,
    tipo: 'asociacion',
    pregunta: 'Asocia la imagen con la seña correcta',
    imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/numero_1.png',
    opciones: [
      { id: 1, texto: 'Número 1', correcta: true },
      { id: 2, texto: 'Número 2', correcta: false },
      { id: 3, texto: 'Número 3', correcta: false },
      { id: 4, texto: 'Número 4', correcta: false }
    ]
  },
  {
    id: 3,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es la seña para "Hola"?',
    imagen: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/saludo.png',
    opciones: [
      { id: 1, texto: 'Saludo formal', correcta: true },
      { id: 2, texto: 'Despedida', correcta: false },
      { id: 3, texto: 'Gracias', correcta: false },
      { id: 4, texto: 'Por favor', correcta: false }
    ]
  }
];

export default function Ejercicios({ navigation }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const cargarEjercicios = async () => {
    // Simular carga de ejercicios
    setTimeout(() => {
      setEjercicios(ejerciciosEjemplo);
      setLoading(false);
    }, 1000);
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
      let porcentaje = Math.round((puntuacion / (ejercicios.length * 10)) * 100);
      
      // Si todas las respuestas son correctas, asegurar que sea exactamente 100%
      if (puntuacion === ejercicios.length * 10) {
        porcentaje = 100;
      }
      
      await fetch(`${API_BASE_URL}/progreso`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leccionId: 1, // ID de la lección actual
          porcentaje: porcentaje
        }),
      });
    } catch (error) {
      console.error('Error al guardar progreso:', error);
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
          leccionId: 1, // ID por defecto para ejercicios generales
          porcentaje: 0
        }),
      });
      console.log('Progreso reseteado a 0% para reiniciar ejercicios');
    } catch (error) {
      console.error('Error al resetear progreso:', error);
    }
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
          <Text style={estilos.titulo}>Ejercicios Completados</Text>
          <View style={estilos.placeholder} />
        </View>

        <ScrollView style={estilos.contenido}>
          <View style={estilos.resultadoContainer}>
            <FontAwesome name={iconoResultado} size={80} color={colorResultado} />
            <Text style={estilos.tituloResultado}>{mensajeFelicitacion}</Text>
            
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
              <TouchableOpacity style={estilos.boton} onPress={reiniciarEjercicios}>
                <FontAwesome name="refresh" size={20} color="#fff" style={estilos.iconoBoton} />
                <Text style={estilos.botonTexto}>Repetir ejercicios</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[estilos.boton, estilos.botonSecundario]} 
                onPress={() => navigation.navigate('Listalecciones')}
              >
                <FontAwesome name="book" size={20} color="#023047" style={estilos.iconoBoton} />
                <Text style={[estilos.botonTexto, estilos.botonTextoSecundario]}>Ver lecciones</Text>
              </TouchableOpacity>
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
        <Text style={estilos.titulo}>Ejercicios</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023047',
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
    marginBottom: 10,
  },
  porcentajeTexto: {
    fontSize: 20,
    color: '#fb8500',
    fontWeight: 'bold',
    marginBottom: 30,
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
