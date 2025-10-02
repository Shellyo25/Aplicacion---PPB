import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image, 
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.1.13:3000/api';

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [personajeAnimado, setPersonajeAnimado] = useState('normal');

  // Animaciones
  const fadeAnim = new Animated.Value(1);
  const bounceAnim = new Animated.Value(1);

  useEffect(() => {
    // Animación de entrada más simple
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animación de rebote del personaje
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    );
    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, []);

  const iniciarSesion = async () => {
    if (!usuario.trim() || !contrasena.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Campos vacíos', 'Por favor llena ambos campos.');
      return;
    }

    setLoading(true);
    setPersonajeAnimado('pensando');
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario.trim(),
          contrasena: contrasena
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPersonajeAnimado('feliz');
        // Guardar token y datos del usuario
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
        setTimeout(() => {
          Alert.alert('¡Bienvenido!', `Hola, ${data.user.nombre}`);
          navigation.navigate('menu');
        }, 1000);
      } else {
        setPersonajeAnimado('triste');
        setTimeout(() => setPersonajeAnimado('normal'), 2000);
        Alert.alert('Error', data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error);
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'Error de conexión. Verifica que el servidor esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  const recuperarPassword = async () => {
    Alert.prompt(
      'Recuperar contraseña',
      'Ingresa tu correo electrónico para recibir instrucciones de recuperación:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Enviar', 
          onPress: async (correo) => {
            if (!correo || !correo.trim()) {
              Alert.alert('Error', 'Por favor ingresa un correo válido');
              return;
            }

            try {
              const response = await fetch(`${API_BASE_URL}/recuperar-password`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: correo.trim() }),
              });

              const data = await response.json();

              if (response.ok) {
                Alert.alert('Correo enviado', 'Revisa tu correo para las instrucciones de recuperación');
              } else {
                Alert.alert('Error', data.error || 'Error al enviar correo');
              }
            } catch (error) {
              console.error('Error:', error);
              Alert.alert('Error', 'Error de conexión');
            }
          }
        }
      ],
      'plain-text',
      '',
      'email-address'
    );
  };

  const getPersonajeImage = () => {
    switch (personajeAnimado) {
      case 'feliz':
        return 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_feliz.png';
      case 'triste':
        return 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_triste.png';
      case 'pensando':
        return 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_pensando.png';
      default:
        return 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png';
    }
  };

  return (
    <View style={estilos.contenedor}>
      <ScrollView 
        contentContainerStyle={estilos.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Personaje animado */}
        <Animated.View 
          style={[
            estilos.personajeContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim }]
            }
          ]}
        >
          <Image 
            source={{ uri: getPersonajeImage() }} 
            style={estilos.personaje} 
          />
          <Text style={estilos.saludoPersonaje}>
            {personajeAnimado === 'feliz' ? '¡Hola! ¡Bienvenido!' :
             personajeAnimado === 'triste' ? 'Ups... algo salió mal' :
             personajeAnimado === 'pensando' ? 'Verificando...' :
             '¡Hola! Inicia sesión para continuar'}
          </Text>
        </Animated.View>

        {/* Formulario de login */}
        <View style={estilos.formulario}>
          <Text style={estilos.titulo}>Iniciar Sesión</Text>
          
          <View style={estilos.campoContainer}>
            <View style={estilos.campoConIcono}>
              <FontAwesome name="user" size={20} color="#023047" style={estilos.icono} />
              <TextInput
                placeholder="Nombre de usuario"
                value={usuario}
                onChangeText={setUsuario}
                style={estilos.input}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setPersonajeAnimado('pensando')}
                onBlur={() => setPersonajeAnimado('normal')}
              />
            </View>
          </View>

          <View style={estilos.campoContainer}>
            <View style={estilos.campoConIcono}>
              <FontAwesome name="lock" size={20} color="#023047" style={estilos.icono} />
              <TextInput
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                style={estilos.input}
                secureTextEntry={!mostrarContrasena}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setPersonajeAnimado('pensando')}
                onBlur={() => setPersonajeAnimado('normal')}
              />
              <TouchableOpacity 
                onPress={() => setMostrarContrasena(!mostrarContrasena)}
                style={estilos.eyeIcon}
              >
                <FontAwesome 
                  name={mostrarContrasena ? "eye-slash" : "eye"} 
                  size={20} 
                  color="#023047" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón de recuperar contraseña */}
          <TouchableOpacity onPress={recuperarPassword} style={estilos.linkContainer}>
            <Text style={estilos.linkTexto}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Botón de login */}
          <TouchableOpacity 
            style={[estilos.botonLogin, loading && estilos.botonDeshabilitado]} 
            onPress={iniciarSesion}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <FontAwesome name="sign-in" size={20} color="#fff" style={estilos.botonIcono} />
                <Text style={estilos.botonTexto}>Iniciar Sesión</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={estilos.divider}>
            <View style={estilos.dividerLine} />
            <Text style={estilos.dividerTexto}>o</Text>
            <View style={estilos.dividerLine} />
          </View>

          {/* Botón de registro */}
          <TouchableOpacity 
            style={estilos.botonRegistro} 
            onPress={() => navigation.navigate('Registro')}
          >
            <Text style={estilos.botonRegistroTexto}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#8ecae6', // Color azul original de LENSEGUA
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
  personajeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  personaje: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saludoPersonaje: {
    fontSize: 16,
    color: '#023047',
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    minHeight: 350,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 25,
  },
  campoContainer: {
    marginBottom: 20,
  },
  campoConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  icono: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#023047',
  },
  eyeIcon: {
    padding: 5,
  },
  linkContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  linkTexto: {
    color: '#219ebc',
    fontSize: 14,
    fontWeight: '500',
  },
  botonLogin: {
    backgroundColor: '#fb8500', // Color naranja original de LENSEGUA
    borderRadius: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#fb8500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botonIcono: {
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  dividerTexto: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  botonRegistro: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#219ebc',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botonRegistroTexto: {
    color: '#219ebc',
    fontSize: 16,
    fontWeight: '500',
  },
});