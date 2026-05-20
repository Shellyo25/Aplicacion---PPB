import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://aplicacion-lensegua-backend.onrender.com/api';

export default function ListaEjercicios({ navigation }) {
  const [lecciones, setLecciones] = useState([]);

useEffect(() => {
  cargarLecciones();
}, []);

const cargarLecciones = async () => {

  try {

    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/lecciones`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {

      const data = await response.json();

      const leccionesConEstado = data.lecciones.map((leccion, index) => ({
        ...leccion,

        desbloqueada:
          index === 0 ||
          (
            index > 0 &&
            data.lecciones[index - 1].progreso >= 80
          ),

        progreso: leccion.progreso || 0
      }));

      setLecciones(leccionesConEstado);

    }

  } catch (error) {

    console.log(error);

  }

};

const ejercicios = lecciones.map((leccion) => ({

  id: leccion.Pk_ID_leccion,

  titulo: leccion.Nombre,

  desbloqueada: leccion.desbloqueada,

  progreso: leccion.progreso

}));

  return (

    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <FontAwesome
            name="arrow-left"
            size={28}
            color="#023047"
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Ejercicios
        </Text>

      </View>

      {ejercicios.map((ejercicio) => (

        <TouchableOpacity
          key={ejercicio.id}

          disabled={!ejercicio.desbloqueada}

          style={[
            styles.card,
            {
              opacity: ejercicio.desbloqueada ? 1 : 0.5
            }
          ]}

          onPress={() => {

            if (!ejercicio.desbloqueada) {

              Alert.alert(
                'Lección bloqueada',
                'Completa la lección anterior para desbloquear esta.'
              );

              return;
            }

            navigation.navigate('EjerciciosLeccion', {
              leccionId: ejercicio.id,
              nombreLeccion: ejercicio.titulo
            });

          }}
        >

          <FontAwesome
            name="gamepad"
            size={28}
            color="#fb8500"
          />

          <View style={styles.info}>

            <Text style={styles.nombre}>
              {ejercicio.titulo}
            </Text>

            <Text style={styles.descripcion}>
              Practicar ejercicios
            </Text>

          </View>

        </TouchableOpacity>

      ))}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#8ecae6',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#023047',
    marginLeft: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  info: {
    marginLeft: 15,
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
  },

  descripcion: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

});