import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.13:3000/api';

export default function Inicio({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  // Recargar datos cuando se regresa a esta pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarDatosUsuario();
    });
    return unsubscribe;
  }, [navigation]);

  const cargarDatosUsuario = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('token');
      
      if (userDataString && token) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        
        // Cargar estadísticas
        const response = await fetch(`${API_BASE_URL}/estadisticas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const stats = await response.json();
          setEstadisticas(stats);
        }
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Bienvenida');
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.header}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }}
          style={estilos.logo}
        />
        <TouchableOpacity onPress={cerrarSesion} style={estilos.botonCerrar}>
          <FontAwesome name="sign-out" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={estilos.saludo}>
        <Text style={estilos.titulo}>¡Hola, {userData?.nombre}!</Text>
        <Text style={estilos.subtitulo}>¿Qué deseas aprender hoy?</Text>
      </View>

      {estadisticas && (
        <View style={estilos.estadisticas}>
          <Text style={estilos.tituloSeccion}>Tu Progreso</Text>
          <View style={estilos.cardsContainer}>
            <View style={estilos.card}>
              <FontAwesome name="trophy" size={30} color="#fb8500" />
              <Text style={estilos.cardNumero}>
                {estadisticas.progresoGeneral !== undefined && estadisticas.progresoGeneral !== null 
                  ? `${estadisticas.progresoGeneral}%` 
                  : '0%'}
              </Text>
              <Text style={estilos.cardTexto}>Progreso General</Text>
            </View>
            <View style={estilos.card}>
              <FontAwesome name="check-circle" size={30} color="#4CAF50" />
              <Text style={estilos.cardNumero}>
                {estadisticas.leccionesCompletadas !== undefined ? estadisticas.leccionesCompletadas : 0}
              </Text>
              <Text style={estilos.cardTexto}>Lecciones Completadas</Text>
            </View>
          </View>
        </View>
      )}

      <View style={estilos.recomendaciones}>
        <Text style={estilos.tituloSeccion}>Recomendaciones</Text>
        <TouchableOpacity 
          style={estilos.botonRecomendacion}
          onPress={() => navigation.navigate('Listalecciones')}
        >
          <FontAwesome name="book" size={20} color="#fff" style={estilos.iconoBoton} />
          <Text style={estilos.textoBoton}>Continuar aprendiendo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={estilos.botonRecomendacion}
          onPress={() => navigation.navigate('Estadisticas')}
        >
          <FontAwesome name="bar-chart" size={20} color="#fff" style={estilos.iconoBoton} />
          <Text style={estilos.textoBoton}>Ver estadísticas detalladas</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.accionesRapidas}>
        <Text style={estilos.tituloSeccion}>Acceso Rápido</Text>
        <View style={estilos.botonesContainer}>
          <TouchableOpacity 
            style={estilos.botonAccion}
            onPress={() => navigation.navigate('Listalecciones')}
          >
            <FontAwesome name="graduation-cap" size={24} color="#023047" />
            <Text style={estilos.textoAccion}>Lecciones</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={estilos.botonAccion}
            onPress={() => navigation.navigate('Ejercicios')}
          >
            <FontAwesome name="pencil" size={24} color="#023047" />
            <Text style={estilos.textoAccion}>Ejercicios</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={estilos.botonAccion}
            onPress={() => navigation.navigate('Estadisticas')}
          >
            <FontAwesome name="chart-line" size={24} color="#023047" />
            <Text style={estilos.textoAccion}>Progreso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  botonCerrar: {
    backgroundColor: '#fb8500',
    padding: 10,
    borderRadius: 20,
  },
  saludo: {
    padding: 20,
    paddingTop: 0,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#023047',
    opacity: 0.8,
  },
  estadisticas: {
    padding: 20,
    paddingTop: 0,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023047',
    marginTop: 10,
  },
  cardTexto: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  recomendaciones: {
    padding: 20,
    paddingTop: 0,
  },
  botonRecomendacion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb8500',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconoBoton: {
    marginRight: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  accionesRapidas: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonAccion: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoAccion: {
    fontSize: 12,
    color: '#023047',
    marginTop: 8,
    fontWeight: 'bold',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});
