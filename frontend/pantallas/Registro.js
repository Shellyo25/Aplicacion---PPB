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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const API_BASE_URL = 'http://localhost:3000/api';

export default function Registro({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [personajeAnimado, setPersonajeAnimado] = useState('normal');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const fadeAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(0);
  const bounceAnim = new Animated.Value(1);

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ])
    );
    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, []);

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setNombreUsuario('');
    setCorreo('');
    setContrasena('');
    setMostrarContrasena(false);
  };

  const validarFormulario = () => {
    if (!nombre.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    if (!apellido.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'El apellido es obligatorio');
      return false;
    }
    if (!nombreUsuario.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'El nombre de usuario es obligatorio');
      return false;
    }
    if (!correo.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'El correo electrónico es obligatorio');
      return false;
    }
    if (!contrasena.trim()) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'La contraseña es obligatoria');
      return false;
    }
    if (contrasena.length < 8) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (!/[A-Za-z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
      setPersonajeAnimado('triste');
      setTimeout(() => setPersonajeAnimado('normal'), 2000);
      Alert.alert('Error', 'La contraseña debe contener al menos una letra y un número');
      return false;
    }
    return true;
  };

  const registrarUsuario = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    setPersonajeAnimado('pensando');
    
    try {
      const response = await fetch(`${API_BASE_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          usuario: nombreUsuario.trim(),
          correo: correo.trim(),
          contrasena: contrasena
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPersonajeAnimado('feliz');
        setRegistroExitoso(true);
        limpiarFormulario();
        
        // Mostrar mensaje de éxito más claro
        const emailMessage = data.emailSent ? 
          '\nSe ha enviado un correo de bienvenida a tu email con más información.' : 
          '\nEl correo de bienvenida no pudo ser enviado.';
        
        Alert.alert(
          '¡Usuario Creado Exitosamente!',
          `¡Hola ${nombre}! Tu cuenta ha sido creada correctamente.\n\nUsuario: ${nombreUsuario}\nCorreo: ${correo}${emailMessage}\n\nAhora puedes iniciar sesión con tus credenciales.`,
          [
            {
              text: 'Iniciar Sesión',
              onPress: () => navigation.navigate('InicioSesion'),
              style: 'default'
            },
            {
              text: 'Continuar',
              onPress: () => setRegistroExitoso(false),
              style: 'cancel'
            }
          ]
        );
      } else {
        setPersonajeAnimado('triste');
        setTimeout(() => setPersonajeAnimado('normal'), 2000);
        Alert.alert('Error', data.error || 'Error al registrar usuario');
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

  const getMensajePersonaje = () => {
    if (registroExitoso) {
      return '¡Excelente! ¡Tu cuenta fue creada exitosamente!';
    }
    switch (personajeAnimado) {
      case 'feliz':
        return '¡Excelente! ¡Cuenta creada!';
      case 'triste':
        return 'Ups... revisa los datos';
      case 'pensando':
        return 'Creando tu cuenta...';
      default:
        return '¡Hola! Crea tu cuenta para comenzar';
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
          <Text style={[
            estilos.saludoPersonaje,
            registroExitoso && estilos.saludoExitoso
          ]}>
            {getMensajePersonaje()}
          </Text>
        </Animated.View>

        {/* Formulario de registro */}
        <View style={estilos.formulario}>
          <Text style={estilos.titulo}>Crear Cuenta</Text>
          
          {/* Nombre y Apellido en una fila */}
          <View style={estilos.fila}>
            <View style={[estilos.campoContainer, estilos.campoMitad]}>
              <View style={estilos.campoConIcono}>
                <FontAwesome name="user" size={16} color="#023047" style={estilos.icono} />
                <TextInput
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={setNombre}
                  style={estilos.input}
                  autoCapitalize="words"
                  onFocus={() => setPersonajeAnimado('pensando')}
                  onBlur={() => setPersonajeAnimado('normal')}
                />
              </View>
            </View>
            <View style={[estilos.campoContainer, estilos.campoMitad]}>
              <View style={estilos.campoConIcono}>
                <FontAwesome name="user" size={16} color="#023047" style={estilos.icono} />
                <TextInput
                  placeholder="Apellido"
                  value={apellido}
                  onChangeText={setApellido}
                  style={estilos.input}
                  autoCapitalize="words"
                  onFocus={() => setPersonajeAnimado('pensando')}
                  onBlur={() => setPersonajeAnimado('normal')}
                />
              </View>
            </View>
          </View>

          {/* Usuario */}
          <View style={estilos.campoContainer}>
            <View style={estilos.campoConIcono}>
              <FontAwesome name="id-badge" size={16} color="#023047" style={estilos.icono} />
              <TextInput
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                style={estilos.input}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setPersonajeAnimado('pensando')}
                onBlur={() => setPersonajeAnimado('normal')}
              />
            </View>
          </View>

          {/* Correo */}
          <View style={estilos.campoContainer}>
            <View style={estilos.campoConIcono}>
              <FontAwesome name="envelope" size={16} color="#023047" style={estilos.icono} />
              <TextInput
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                style={estilos.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setPersonajeAnimado('pensando')}
                onBlur={() => setPersonajeAnimado('normal')}
              />
            </View>
          </View>

          {/* Contraseña */}
          <View style={estilos.campoContainer}>
            <View style={estilos.campoConIcono}>
              <FontAwesome name="lock" size={16} color="#023047" style={estilos.icono} />
              <TextInput
                placeholder="Contraseña (mín. 8 caracteres)"
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
                  size={16} 
                  color="#023047" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón de registro */}
          <TouchableOpacity 
            style={[estilos.botonRegistro, loading && estilos.botonDeshabilitado]} 
            onPress={registrarUsuario}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <FontAwesome name="user-plus" size={20} color="#fff" style={estilos.botonIcono} />
                <Text style={estilos.botonTexto}>Crear Cuenta</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={estilos.divider}>
            <View style={estilos.dividerLine} />
            <Text style={estilos.dividerTexto}>o</Text>
            <View style={estilos.dividerLine} />
          </View>

          {/* Botón de login */}
          <TouchableOpacity 
            style={estilos.botonLogin} 
            onPress={() => navigation.navigate('InicioSesion')}
          >
            <Text style={estilos.botonLoginTexto}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#219ebc', // Color azul más oscuro para el registro
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
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saludoPersonaje: {
    fontSize: 14,
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
  saludoExitoso: {
    backgroundColor: '#d4edda',
    color: '#155724',
    borderWidth: 1,
    borderColor: '#c3e6cb',
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
    minHeight: 400,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 25,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campoContainer: {
    marginBottom: 16,
  },
  campoMitad: {
    width: '48%',
  },
  campoConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#023047',
  },
  eyeIcon: {
    padding: 4,
  },
  botonRegistro: {
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
  botonLogin: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#219ebc',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botonLoginTexto: {
    color: '#219ebc',
    fontSize: 14,
    fontWeight: '500',
  },
});