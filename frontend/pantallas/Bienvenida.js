import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Bienvenida({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }}
        style={styles.logo}
      />
      <Text style={styles.titulo}>¡ES HORA DE APRENDER!</Text>
      <Text style={styles.pregunta}>¿Qué es la Lengua de Señas?</Text>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('InicioSesion')}>
        <Text style={styles.botonTexto}>Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#219ebc',
    padding: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffffff',
  },
  pregunta: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  boton: {
    backgroundColor: '#fb8500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'center',
    width: '70%',
  },
  botonTexto: {
    color: '#023047',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});