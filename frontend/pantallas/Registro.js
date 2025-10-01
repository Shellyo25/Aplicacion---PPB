import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


import { FontAwesome } from '@expo/vector-icons';

export default function Registro() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');

  return (
    <View style={estilos.contenedor}>
      <Image source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }} style={estilos.logo} />
      <Text style={estilos.titulo}>Crear cuenta</Text>

      <CampoConIcono icono="envelope" placeholder="Ingrese su correo electrónico" valor={correo} setValor={setCorreo} />
      <CampoConIcono icono="key" placeholder="Ingrese su contraseña" valor={contrasena} setValor={setContrasena} secure />
      <CampoConIcono icono="user" placeholder="Ingrese su Nombre" valor={nombre} setValor={setNombre} />
      <CampoConIcono icono="user" placeholder="Ingrese su apellido" valor={apellido} setValor={setApellido} />
      <CampoConIcono icono="id-badge" placeholder="Ingrese su nombre de usuario" valor={nombreUsuario} setValor={setNombreUsuario} />

      <TouchableOpacity style={estilos.boton}>
        <FontAwesome name="user-plus" size={20} color="#fff" style={estilos.iconoBoton} />
        <Text style={estilos.botonTexto}>Crear cuenta</Text>
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
    padding: 20,
    backgroundColor: '#8ecae6',
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#023047',
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
});