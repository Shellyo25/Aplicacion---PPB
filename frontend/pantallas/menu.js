import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export default function Menu({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

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
      } else {
        navigation.navigate('InicioSesion');
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
        <Text style={estilos.subtitulo}>¿Qué deseas hacer hoy?</Text>
      </View>

      {estadisticas && (
        <View style={estilos.estadisticas}>
          <Text style={estilos.tituloSeccion}>Tu Progreso</Text>
          <View style={estilos.cardsContainer}>
            <View style={estilos.card}>
              <FontAwesome name="trophy" size={30} color="#fb8500" />
              <Text style={estilos.cardNumero}>{estadisticas.progresoGeneral}%</Text>
              <Text style={estilos.cardTexto}>Progreso General</Text>
            </View>
            <View style={estilos.card}>
              <FontAwesome name="check-circle" size={30} color="#4CAF50" />
              <Text style={estilos.cardNumero}>{estadisticas.leccionesCompletadas}</Text>
              <Text style={estilos.cardTexto}>Lecciones Completadas</Text>
            </View>
          </View>
        </View>
      )}

      <View style={estilos.opciones}>
        <BotonMenu 
          icono="graduation-cap" 
          texto="Lecciones" 
          descripcion="Aprende lengua de señas paso a paso"
          onPress={() => navigation.navigate('Listalecciones')} 
        />
        <BotonMenu 
          icono="pencil" 
          texto="Ejercicios" 
          descripcion="Practica con actividades interactivas"
          onPress={() => navigation.navigate('Ejercicios')} 
        />
        <BotonMenu 
          icono="bar-chart" 
          texto="Estadísticas" 
          descripcion="Ve tu progreso y logros"
          onPress={() => navigation.navigate('Estadisticas')} 
        />
        <BotonMenu 
          icono="cog" 
          texto="Configuración" 
          descripcion="Ajustes de la aplicación"
          onPress={() => navigation.navigate('Configuracion')} 
        />
        {userData?.rol === 'administrador' && (
          <BotonMenu 
            icono="cogs" 
            texto="Administración" 
            descripcion="Panel de administración del sistema"
            onPress={() => navigation.navigate('Administrador')} 
          />
        )}
      </View>

      <View style={estilos.recomendaciones}>
        <Text style={estilos.tituloSeccion}>Recomendaciones</Text>
        <TouchableOpacity 
          style={estilos.botonRecomendacion}
          onPress={() => navigation.navigate('Listalecciones')}
        >
          <FontAwesome name="book" size={20} color="#fff" style={estilos.iconoBoton} />
          <View style={estilos.recomendacionTexto}>
            <Text style={estilos.recomendacionTitulo}>Continúa aprendiendo</Text>
            <Text style={estilos.recomendacionDescripcion}>
              {estadisticas?.leccionesCompletadas > 0 
                ? `Tienes ${estadisticas.leccionesCompletadas} lecciones completadas`
                : 'Comienza tu primera lección'
              }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function BotonMenu({ icono, texto, descripcion, onPress }) {
  return (
    <TouchableOpacity style={estilos.boton} onPress={onPress}>
      <View style={estilos.botonContenido}>
        <View style={estilos.botonIcono}>
          <FontAwesome name={icono} size={24} color="#023047" />
        </View>
        <View style={estilos.botonTexto}>
          <Text style={estilos.textoBoton}>{texto}</Text>
          <Text style={estilos.descripcionBoton}>{descripcion}</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#ccc" />
      </View>
    </TouchableOpacity>
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
  opciones: {
    padding: 20,
    paddingTop: 0,
  },
  boton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botonContenido: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonIcono: {
    width: 50,
    height: 50,
    backgroundColor: '#e3f2fd',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  botonTexto: {
    flex: 1,
  },
  textoBoton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  descripcionBoton: {
    fontSize: 14,
    color: '#666',
  },
  recomendaciones: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  botonRecomendacion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb8500',
    padding: 15,
    borderRadius: 8,
  },
  iconoBoton: {
    marginRight: 15,
  },
  recomendacionTexto: {
    flex: 1,
  },
  recomendacionTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  recomendacionDescripcion: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});