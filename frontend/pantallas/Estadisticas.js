import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.13:3000/api';

export default function Estadisticas({ navigation }) {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        navigation.navigate('InicioSesion');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/estadisticas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEstadisticas(data);
      } else if (response.status === 401) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
        navigation.navigate('InicioSesion');
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando estadísticas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
          <FontAwesome name="arrow-left" size={20} color="#023047" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Mi Progreso</Text>
        <View style={estilos.placeholder} />
      </View>

      {estadisticas && (
        <>
          {/* Resumen General */}
          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Resumen General</Text>
            <View style={estilos.cardsContainer}>
              <View style={estilos.card}>
                <FontAwesome name="trophy" size={30} color="#fb8500" />
                <Text style={estilos.cardNumero}>{estadisticas.progresoGeneral}%</Text>
                <Text style={estilos.cardTexto}>Progreso General</Text>
              </View>
              <View style={estilos.card}>
                <FontAwesome name="check-circle" size={30} color="#4CAF50" />
                <Text style={estilos.cardNumero}>{estadisticas.leccionesCompletadas}</Text>
                <Text style={estilos.cardTexto}>Completadas</Text>
              </View>
              <View style={estilos.card}>
                <FontAwesome name="book" size={30} color="#219ebc" />
                <Text style={estilos.cardNumero}>{estadisticas.totalLecciones}</Text>
                <Text style={estilos.cardTexto}>Total Lecciones</Text>
              </View>
            </View>
          </View>

          {/* Barra de Progreso General */}
          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Progreso General</Text>
            <View style={estilos.barraProgresoContainer}>
              <View style={estilos.barraProgreso}>
                <View 
                  style={[
                    estilos.barraProgresoFill, 
                    { width: `${estadisticas.progresoGeneral}%` }
                  ]} 
                />
              </View>
              <Text style={estilos.porcentajeTexto}>{estadisticas.progresoGeneral}%</Text>
            </View>
          </View>

          {/* Detalle por Lección */}
          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Progreso por Lección</Text>
            {estadisticas.detalleProgreso && estadisticas.detalleProgreso.length > 0 ? (
              estadisticas.detalleProgreso.map((leccion, index) => (
                <View key={index} style={estilos.leccionItem}>
                  <View style={estilos.leccionInfo}>
                    <Text style={estilos.leccionNombre}>{leccion.Nombre}</Text>
                    <Text style={estilos.leccionPorcentaje}>{leccion.Porcen_Av}%</Text>
                  </View>
                  <View style={estilos.barraProgresoLeccion}>
                    <View 
                      style={[
                        estilos.barraProgresoLeccionFill, 
                        { width: `${leccion.Porcen_Av}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))
            ) : (
              <View style={estilos.sinDatos}>
                <FontAwesome name="book" size={40} color="#ccc" />
                <Text style={estilos.sinDatosTexto}>Aún no has completado ninguna lección</Text>
                <TouchableOpacity 
                  style={estilos.botonComenzar}
                  onPress={() => navigation.navigate('Listalecciones')}
                >
                  <Text style={estilos.botonComenzarTexto}>Comenzar a aprender</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Logros */}
          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Logros</Text>
            <View style={estilos.logrosContainer}>
              <View style={[
                estilos.logro, 
                estadisticas.leccionesCompletadas >= 1 && estilos.logroCompletado
              ]}>
                <FontAwesome 
                  name={estadisticas.leccionesCompletadas >= 1 ? "check-circle" : "circle-o"} 
                  size={24} 
                  color={estadisticas.leccionesCompletadas >= 1 ? "#4CAF50" : "#ccc"} 
                />
                <Text style={[
                  estilos.logroTexto,
                  estadisticas.leccionesCompletadas >= 1 && estilos.logroTextoCompletado
                ]}>
                  Primera lección completada
                </Text>
              </View>
              
              <View style={[
                estilos.logro, 
                estadisticas.leccionesCompletadas >= 5 && estilos.logroCompletado
              ]}>
                <FontAwesome 
                  name={estadisticas.leccionesCompletadas >= 5 ? "check-circle" : "circle-o"} 
                  size={24} 
                  color={estadisticas.leccionesCompletadas >= 5 ? "#4CAF50" : "#ccc"} 
                />
                <Text style={[
                  estilos.logroTexto,
                  estadisticas.leccionesCompletadas >= 5 && estilos.logroTextoCompletado
                ]}>
                  5 lecciones completadas
                </Text>
              </View>
              
              <View style={[
                estilos.logro, 
                estadisticas.progresoGeneral >= 100 && estilos.logroCompletado
              ]}>
                <FontAwesome 
                  name={estadisticas.progresoGeneral >= 100 ? "check-circle" : "circle-o"} 
                  size={24} 
                  color={estadisticas.progresoGeneral >= 100 ? "#4CAF50" : "#ccc"} 
                />
                <Text style={[
                  estilos.logroTexto,
                  estadisticas.progresoGeneral >= 100 && estilos.logroTextoCompletado
                ]}>
                  ¡Curso completado!
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
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
  seccion: {
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
  barraProgresoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barraProgreso: {
    flex: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barraProgresoFill: {
    height: '100%',
    backgroundColor: '#fb8500',
    borderRadius: 10,
  },
  porcentajeTexto: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023047',
  },
  leccionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leccionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leccionNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023047',
  },
  leccionPorcentaje: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fb8500',
  },
  barraProgresoLeccion: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barraProgresoLeccionFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  sinDatos: {
    alignItems: 'center',
    padding: 40,
  },
  sinDatosTexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  botonComenzar: {
    backgroundColor: '#fb8500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botonComenzarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logrosContainer: {
    gap: 15,
  },
  logro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logroCompletado: {
    backgroundColor: '#f0f8f0',
  },
  logroTexto: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
  },
  logroTextoCompletado: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});
