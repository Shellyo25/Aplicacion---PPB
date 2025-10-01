import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Menu({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }}
        style={estilos.logo}
      />

      <Text style={estilos.titulo}>Bienvenida a Lensegua</Text>
      <Text style={estilos.subtitulo}>¿Qué deseas hacer hoy?</Text>

      <BotonMenu icono="book" texto="Ver lista de lecciones" onPress={() => navigation.navigate('Listalecciones')} />
      <BotonMenu icono="pencil" texto="Practicar ejercicios" onPress={() => navigation.navigate('Ejercicios')} />
      <BotonMenu icono="bar-chart" texto="Ver mi progreso" onPress={() => navigation.navigate('Estadisticas')} />
      <BotonMenu icono="cog" texto="Configuraciones" onPress={() => navigation.navigate('Configuracion')} />
    </View>
  );
}

function BotonMenu({ icono, texto, onPress }) {
  return (
    <TouchableOpacity style={estilos.boton} onPress={onPress}>
      <FontAwesome name={icono} size={20} color="#fff" style={estilos.iconoBoton} />
      <Text style={estilos.textoBoton}>{texto}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#8ecae6',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#023047',
  },
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#023047',
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb8500',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconoBoton: {
    marginRight: 10,
    marginLeft: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});