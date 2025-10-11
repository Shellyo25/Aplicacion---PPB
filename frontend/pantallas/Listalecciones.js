import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export default function Lecciones({ navigation }) {
  const [lecciones, setLecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarLecciones();
  }, []);

  // Recargar lecciones cuando se regresa a esta pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarLecciones();
    });
    return unsubscribe;
  }, [navigation]);

  const cargarLecciones = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        navigation.navigate('InicioSesion');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/lecciones`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Agregar información de desbloqueo y progreso
        const leccionesConEstado = data.lecciones.map((leccion, index) => ({
          ...leccion,
          desbloqueada: index === 0 || (index > 0 && data.lecciones[index - 1].progreso >= 100),
          progreso: leccion.progreso || 0
        }));
        setLecciones(leccionesConEstado);
      } else if (response.status === 401) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
        navigation.navigate('InicioSesion');
      }
    } catch (error) {
      console.error('Error al cargar lecciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const seleccionarLeccion = (leccion) => {
    if (!leccion.desbloqueada) {
      return;
    }
    navigation.navigate('ContenidoLecciones', { leccion });
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando lecciones...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
          <FontAwesome name="arrow-left" size={20} color="#023047" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Lecciones</Text>
        <View style={estilos.placeholder} />
      </View>

      <ScrollView style={estilos.contenido}>
        {lecciones.length > 0 ? (
          lecciones.map((leccion) => (
            <TouchableOpacity
              key={leccion.Pk_ID_leccion}
              style={[
                estilos.leccionCard,
                !leccion.desbloqueada && estilos.leccionBloqueada
              ]}
              onPress={() => seleccionarLeccion(leccion)}
              disabled={!leccion.desbloqueada}
            >
              <View style={estilos.leccionHeader}>
                <View style={estilos.leccionInfo}>
                  <Text style={[
                    estilos.leccionNombre,
                    !leccion.desbloqueada && estilos.leccionNombreBloqueada
                  ]}>
                    {leccion.Nombre}
                  </Text>
                  <Text style={[
                    estilos.leccionDescripcion,
                    !leccion.desbloqueada && estilos.leccionDescripcionBloqueada
                  ]}>
                    {leccion.Descripcion}
                  </Text>
                </View>
                <View style={estilos.leccionIcono}>
                  {leccion.desbloqueada ? (
                    <FontAwesome name="unlock" size={24} color="#4CAF50" />
                  ) : (
                    <FontAwesome name="lock" size={24} color="#ccc" />
                  )}
                </View>
              </View>

              {leccion.desbloqueada && (
                <View style={estilos.progresoContainer}>
                  <View style={estilos.progresoBarra}>
                    <View 
                      style={[
                        estilos.progresoFill, 
                        { width: `${leccion.progreso}%` },
                        leccion.progreso >= 80 && estilos.progresoCompletado
                      ]} 
                    />
                  </View>
                  <Text style={[
                    estilos.progresoTexto,
                    leccion.progreso >= 80 && estilos.progresoTextoCompletado
                  ]}>
                    {leccion.progreso >= 80 ? 'Completada' : `${leccion.progreso}%`}
                  </Text>
                </View>
              )}

              {!leccion.desbloqueada && (
                <View style={estilos.bloqueadaContainer}>
                  <FontAwesome name="lock" size={16} color="#ccc" />
                  <Text style={estilos.bloqueadaTexto}>Completa la lección anterior</Text>
                </View>
              )}

              {leccion.desbloqueada && leccion.progreso >= 80 && (
                <View style={estilos.completadaContainer}>
                  <FontAwesome name="check-circle" size={16} color="#4CAF50" />
                  <Text style={estilos.completadaTexto}>¡Lección completada!</Text>
                </View>
              )}

              {leccion.desbloqueada && leccion.progreso > 0 && leccion.progreso < 80 && (
                <View style={estilos.enProgresoContainer}>
                  <FontAwesome name="clock-o" size={16} color="#fb8500" />
                  <Text style={estilos.enProgresoTexto}>En progreso</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={estilos.sinLecciones}>
            <FontAwesome name="book" size={60} color="#ccc" />
            <Text style={estilos.sinLeccionesTexto}>No hay lecciones disponibles</Text>
          </View>
        )}
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
  leccionCard: {
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
  leccionBloqueada: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  leccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  leccionInfo: {
    flex: 1,
  },
  leccionNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  leccionNombreBloqueada: {
    color: '#ccc',
  },
  leccionDescripcion: {
    fontSize: 14,
    color: '#666',
  },
  leccionDescripcionBloqueada: {
    color: '#ccc',
  },
  leccionIcono: {
    marginLeft: 10,
  },
  progresoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progresoBarra: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progresoFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progresoCompletado: {
    backgroundColor: '#2E7D32',
  },
  progresoTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progresoTextoCompletado: {
    color: '#2E7D32',
  },
  bloqueadaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  bloqueadaTexto: {
    marginLeft: 5,
    fontSize: 12,
    color: '#999',
  },
  completadaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#e8f5e8',
    borderRadius: 6,
  },
  completadaTexto: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  enProgresoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff3e0',
    borderRadius: 6,
  },
  enProgresoTexto: {
    marginLeft: 5,
    fontSize: 12,
    color: '#fb8500',
    fontWeight: 'bold',
  },
  sinLecciones: {
    alignItems: 'center',
    padding: 40,
  },
  sinLeccionesTexto: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});