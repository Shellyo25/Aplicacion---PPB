import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView,KeyboardAvoidingView, Platform} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = () => {
    if (!usuario || !contrasena) {
      Alert.alert('Campos vacíos', 'Por favor llena ambos campos.');
      return;
    }

    if (contrasena.length < 7) {
      Alert.alert('contraseña inválido', 'La contraseña ingresada debe tener al menos 8 caracteres.');
      return;
    }

    Alert.alert('Sesión iniciada', `Hola, ${usuario}`);
    navigation.navigate('menu');
  };

  return (
    <View style={estilos.contenedor}>
      <Image source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }} style={estilos.logo} />
      <Text style={estilos.titulo}>Iniciar sesión</Text>

      <CampoConIcono icono="id-badge" placeholder="Nombre de usuario" valor={usuario} setValor={setUsuario} />
      <CampoConIcono icono="key" placeholder="Contraseña" valor={contrasena} setValor={setContrasena} secure />
    

      <TouchableOpacity style={estilos.boton} onPress={iniciarSesion}>
        <FontAwesome name="sign-in" size={20} color="#fff" style={estilos.iconoBoton} />
        <Text style={estilos.botonTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={estilos.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

function CampoConIcono({ icono, placeholder, valor, setValor, secure }) {
  return (
    <View style={estilos.campoConIcono}>
      <FontAwesome name={icono} size={20} color="#333" style={estilos.icono} />
      <TextInput
        placeholder={placeholder}
        value={valor}
        onChangeText={setValor}
        style={estilos.campo}
        secureTextEntry={secure}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#219ebc',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  campoConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  icono: {
    marginRight: 10,
  },
  campo: {
    flex: 1,
    padding: 10,
  },
  boton: {
    flexDirection: 'row',
    backgroundColor: '#fb8500',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoBoton: {
    marginRight: 8,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#023047',
    textAlign: 'center',
    marginTop: 10,
  },
});