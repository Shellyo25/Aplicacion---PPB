import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.13:3000/api';

export default function ContenidoLecciones({ route, navigation }) {
  const { leccion } = route.params;
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    cargarContenido();
  }, []);

  const cargarContenido = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        navigation.navigate('InicioSesion');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/lecciones/${leccion.Pk_ID_leccion}/contenido`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContenido(data.contenido);
      } else if (response.status === 401) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
        navigation.navigate('InicioSesion');
      }
    } catch (error) {
      console.error('Error al cargar contenido:', error);
    } finally {
      setLoading(false);
    }
  };

  const siguienteContenido = () => {
    if (indiceActual < contenido.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      // Lección completada
      marcarLeccionCompletada();
    }
  };

  const contenidoAnterior = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
    }
  };

  const marcarLeccionCompletada = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const porcentaje = 100; // Lección completada al 100%
      
      await fetch(`${API_BASE_URL}/progreso`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leccionId: leccion.Pk_ID_leccion,
          porcentaje: porcentaje
        }),
      });

      Alert.alert(
        '¡Lección completada!',
        'Has terminado esta lección. ¡Excelente trabajo!',
        [
          {
            text: 'Ver ejercicios',
            onPress: () => navigation.navigate('Ejercicios')
          },
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('Listalecciones')
          }
        ]
      );
    } catch (error) {
      console.error('Error al marcar lección como completada:', error);
    }
  };

  const irAEjercicios = () => {
    navigation.navigate('Ejercicios');
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando contenido...</Text>
      </View>
    );
  }

  if (contenido.length === 0) {
    return (
      <View style={estilos.contenedor}>
        <View style={estilos.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
            <FontAwesome name="arrow-left" size={20} color="#023047" />
          </TouchableOpacity>
          <Text style={estilos.titulo}>{leccion.Nombre}</Text>
          <View style={estilos.placeholder} />
        </View>

        <View style={estilos.sinContenido}>
          <FontAwesome name="book" size={60} color="#ccc" />
          <Text style={estilos.sinContenidoTexto}>No hay contenido disponible para esta lección</Text>
          <TouchableOpacity style={estilos.boton} onPress={() => navigation.goBack()}>
            <Text style={estilos.botonTexto}>Volver a lecciones</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const itemActual = contenido[indiceActual];

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
          <FontAwesome name="arrow-left" size={20} color="#023047" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>{leccion.Nombre}</Text>
        <View style={estilos.placeholder} />
      </View>

      <ScrollView style={estilos.contenido}>
        {/* Progreso */}
        <View style={estilos.progresoContainer}>
          <Text style={estilos.progresoTexto}>
            {indiceActual + 1} de {contenido.length}
          </Text>
          <View style={estilos.barraProgreso}>
            <View 
              style={[
                estilos.barraProgresoFill, 
                { width: `${((indiceActual + 1) / contenido.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Contenido principal */}
        <View style={estilos.contenidoCard}>
          <Text style={estilos.descripcion}>{itemActual.Descripcion}</Text>
          
          {itemActual.Imagen && (
            <Image 
              source={{ uri: itemActual.Imagen }} 
              style={estilos.imagenContenido}
              resizeMode="contain"
            />
          )}

          {/* Información adicional */}
          <View style={estilos.infoContainer}>
            <View style={estilos.infoItem}>
              <FontAwesome name="info-circle" size={16} color="#219ebc" />
              <Text style={estilos.infoTexto}>
                Observa la imagen y practica la seña mostrada
              </Text>
            </View>
          </View>
        </View>

        {/* Botones de navegación */}
        <View style={estilos.botonesContainer}>
          <TouchableOpacity 
            style={[estilos.botonNavegacion, indiceActual === 0 && estilos.botonDeshabilitado]} 
            onPress={contenidoAnterior}
            disabled={indiceActual === 0}
          >
            <FontAwesome name="chevron-left" size={16} color="#fff" />
            <Text style={estilos.botonNavegacionTexto}>Anterior</Text>
          </TouchableOpacity>

          {indiceActual < contenido.length - 1 ? (
            <TouchableOpacity style={estilos.botonNavegacion} onPress={siguienteContenido}>
              <Text style={estilos.botonNavegacionTexto}>Siguiente</Text>
              <FontAwesome name="chevron-right" size={16} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={estilos.botonCompletar} onPress={siguienteContenido}>
              <FontAwesome name="check" size={16} color="#fff" />
              <Text style={estilos.botonCompletarTexto}>Completar lección</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botón de ejercicios */}
        <TouchableOpacity style={estilos.botonEjercicios} onPress={irAEjercicios}>
          <FontAwesome name="pencil" size={20} color="#fff" style={estilos.iconoBoton} />
          <Text style={estilos.botonEjerciciosTexto}>Practicar con ejercicios</Text>
        </TouchableOpacity>
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
    fontSize: 20,
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
  contenidoCard: {
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
  descripcion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagenContenido: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
  },
  infoTexto: {
    marginLeft: 10,
    fontSize: 14,
    color: '#023047',
    flex: 1,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botonNavegacion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#219ebc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  botonNavegacionTexto: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  botonCompletar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  botonCompletarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  botonEjercicios: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb8500',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  iconoBoton: {
    marginRight: 10,
  },
  botonEjerciciosTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sinContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  sinContenidoTexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#fb8500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});
