import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const lecciones = [
  { id: 1, nombre: 'Abecedario' },
  { id: 2, nombre: 'Números' },
  { id: 3, nombre: 'Frases de cortesía' },
  { id: 4, nombre: 'Colores' },
  { id: 5, nombre: 'Familia' },
  { id: 6, nombre: 'Lugares' },
  { id: 7, nombre: 'Frutas' },
  { id: 8, nombre: 'Verduras' },
  { id: 9, nombre: 'Días de la semana' },
];

export default function Lecciones({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Selecciona una lección</Text>

      <ScrollView contentContainerStyle={estilos.lista}>
        {lecciones.map((leccion) => (
          <TouchableOpacity
            key={leccion.id}
            style={estilos.boton}
            onPress={() => navigation.navigate('ContenidoLeccion', { id: leccion.id })}
          >
            <FontAwesome name="book" size={20} color="#fff" style={estilos.icono} />
            <Text style={estilos.textoBoton}>{leccion.nombre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#8ecae6',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#023047',
  },
  lista: {
    paddingBottom: 20,
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb8500',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  icono: {
    marginRight: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});