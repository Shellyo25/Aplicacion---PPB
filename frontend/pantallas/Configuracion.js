import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert,
  Image,
  Dimensions,
  Animated,
  Modal,
  TextInput,
  Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Configuracion({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [configuraciones, setConfiguraciones] = useState({
    notificaciones: true,
    vibracion: true,
    modoOscuro: false,
    idioma: 'es',
    recordarSesion: true
  });
  const [esAdmin, setEsAdmin] = useState(false);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
  const [modalCambiarContrasena, setModalCambiarContrasena] = useState(false);
  const [modalSoporte, setModalSoporte] = useState(false);
  const [formularioPerfil, setFormularioPerfil] = useState({ nombre: '', apellido: '', correo: '' });
  const [formularioContrasena, setFormularioContrasena] = useState({ actual: '', nueva: '', confirmar: '' });
  const [formularioSoporte, setFormularioSoporte] = useState({ tipo: '', asunto: '', mensaje: '' });
  const [cargando, setCargando] = useState(false);

  // Animaciones usando useRef para que persistan entre renders
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    cargarDatosUsuario();
    cargarConfiguraciones();
    
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const cargarDatosUsuario = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        setEsAdmin(user.rol === 'administrador');
        
        // Llenar formulario de perfil con datos actuales
        setFormularioPerfil({
          nombre: user.nombre || '',
          apellido: user.apellido || '',
          correo: user.correo || ''
        });
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  const cargarConfiguraciones = async () => {
    try {
      const config = await AsyncStorage.getItem('configuraciones');
      if (config) {
        setConfiguraciones(JSON.parse(config));
      }
    } catch (error) {
      console.error('Error al cargar configuraciones:', error);
    }
  };

  const guardarConfiguracion = async (key, value) => {
    const nuevasConfiguraciones = { ...configuraciones, [key]: value };
    setConfiguraciones(nuevasConfiguraciones);
    
    try {
      await AsyncStorage.setItem('configuraciones', JSON.stringify(nuevasConfiguraciones));
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  };

  const cerrarSesion = async () => {
    console.log('cerrarSesion llamado'); // Debug
    Alert.alert(
      '🚪 Cerrar Sesión',
      `Hola ${userData?.nombre || 'Usuario'}, ¿estás seguro de que quieres cerrar sesión?\n\nDespués tendrás que:\n• Iniciar sesión nuevamente\n• Verificar tu usuario y contraseña\n\nTu progreso se mantendrá guardado.`, 
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            console.log('Confirmación de cerrar sesión aceptada'); // Debug
            try {
              setCargando(true);
              
              // Mostrar mensaje de despedida
              Alert.alert(
                '👋 ¡Hasta luego!',
                `Gracias por usar LENSEGUA, ${userData?.nombre || 'Usuario'}.\n\nTu progreso está guardado y podrás continuar cuando regreses.\n\n¡Sigue practicando lengua de señas! 🤟`, 
                [
                  {
                    text: 'Finalizar',
                    onPress: async () => {
                      console.log('Iniciando proceso de cerrar sesión...'); // Debug
                      try {
                        // Limpiar datos de sesión
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('userData');
                        
                        // Si no quiere recordar sesión, también limpiar configuraciones
                        if (!configuraciones.recordarSesion) {
                          await AsyncStorage.removeItem('configuraciones');
                          console.log('Configuraciones limpiadas (recordarSesion = false)');
                        } else {
                          console.log('Configuraciones mantenidas (recordarSesion = true)');
                        }
                        
                        console.log('Navegando a Bienvenida...'); // Debug
                        navigation.navigate('Bienvenida');
                      } catch (error) {
                        console.error('Error al limpiar datos:', error);
                        Alert.alert('❌ Error', 'Error al cerrar sesión. Intenta nuevamente.');
                      }
                    }
                  }
                ]
              );
            } catch (error) {
              console.error('Error en cerrar sesión:', error);
              Alert.alert('❌ Error', 'Error al cerrar sesión. Intenta nuevamente.');
            } finally {
              setCargando(false);
            }
          }
        }
      ]
    );
  };

  const eliminarCuenta = () => {
    console.log('eliminarCuenta llamado'); // Debug
    Alert.alert(
      '🗑️ Eliminar Cuenta',
      '⚠️ ADVERTENCIA IMPORTANTE:\n\nEsta acción eliminará PERMANENTEMENTE:\n• Tu cuenta de usuario\n• Todo tu progreso de lecciones\n• Tus estadísticas y logros\n• Acceso a la aplicación\n\nEsta acción NO se puede deshacer.\n\n¿Estás completamente seguro de continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí, Eliminar', 
          style: 'destructive',
          onPress: () => {
            console.log('Primera confirmación aceptada'); // Debug
            // Segunda confirmación
            Alert.alert(
              '🔴 CONFIRMACIÓN FINAL',
              `Usuario: ${userData?.usuario || 'N/A'}\nCorreo: ${userData?.correo || 'N/A'}\n\n¿Estás 100% seguro de eliminar esta cuenta?`, 
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'ELIMINAR DEFINITIVAMENTE', 
                  style: 'destructive',
                  onPress: async () => {
                    console.log('Iniciando eliminación de cuenta'); // Debug
                    try {
                      setCargando(true);
                      const token = await AsyncStorage.getItem('token');
                      
                      if (!token) {
                        Alert.alert('Error', 'No se encontró el token de sesión');
                        setCargando(false);
                        return;
                      }

                      console.log('Enviando petición al servidor...'); // Debug
                      const response = await fetch('http://localhost:3000/api/eliminar-cuenta', {
                        method: 'DELETE',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      });

                      console.log('Respuesta del servidor:', response.status); // Debug

                      if (response.ok) {
                        // Limpiar datos locales
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('userData');
                        await AsyncStorage.removeItem('configuraciones');
                        await AsyncStorage.removeItem('progresoLocal');
                        
                        Alert.alert(
                          '✅ Cuenta Eliminada',
                          'Tu cuenta ha sido eliminada exitosamente.\n\nGracias por haber sido parte de la comunidad LENSEGUA. Esperamos verte de nuevo en el futuro.\n\n¡Que tengas un excelente día! 👋',
                          [
                            {
                              text: 'Finalizar',
                              onPress: () => navigation.navigate('Bienvenida')
                            }
                          ]
                        );
                      } else {
                        const error = await response.json();
                        console.error('Error del servidor:', error); // Debug
                        Alert.alert('❌ Error', error.error || 'No se pudo eliminar la cuenta. Intenta nuevamente.');
                      }
                    } catch (error) {
                      console.error('Error al eliminar cuenta:', error);
                      Alert.alert('❌ Error', 'Ocurrió un error al eliminar la cuenta. Verifica tu conexión e intenta nuevamente.');
                    } finally {
                      setCargando(false);
                    }
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };


  const contactarSoporte = () => {
    setModalSoporte(true);
  };

  const enviarSoporte = async () => {
    if (!formularioSoporte.tipo || !formularioSoporte.asunto || !formularioSoporte.mensaje) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      setCargando(true);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de sesión');
        return;
      }

      const response = await fetch('http://localhost:3000/api/soporte', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipo: formularioSoporte.tipo,
          asunto: formularioSoporte.asunto,
          mensaje: formularioSoporte.mensaje
        })
      });

      if (response.ok) {
        setModalSoporte(false);
        setFormularioSoporte({ tipo: '', asunto: '', mensaje: '' });
        Alert.alert(
          '✅ Mensaje Enviado',
          'Tu mensaje ha sido enviado exitosamente a nuestro equipo de soporte.\n\nTe responderemos en un plazo de 24 horas.\n\n¡Gracias por contactarnos!'
        );
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'No se pudo enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar soporte:', error);
      Alert.alert('Error', 'No se pudo enviar el mensaje. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  const limpiarDatos = () => {
    Alert.alert(
      'Limpiar Datos de la App',
      '⚠️ Esto eliminará:\n\n• Todas las configuraciones guardadas\n• Datos de progreso local\n• Preferencias de la app\n\n¿Estás seguro de continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar Todo', 
          style: 'destructive',
          onPress: async () => {
            try {
              setCargando(true);
              await AsyncStorage.removeItem('configuraciones');
              await AsyncStorage.removeItem('progresoLocal');
              setConfiguraciones({
                notificaciones: true,
                vibracion: true,
                modoOscuro: false,
                idioma: 'es',
                recordarSesion: true
              });
              Alert.alert('Éxito', 'Los datos han sido limpiados correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudieron limpiar los datos');
            } finally {
              setCargando(false);
            }
          }
        }
      ]
    );
  };

  // Funciones para manejar formularios
  const actualizarPerfil = async () => {
    if (!formularioPerfil.nombre || !formularioPerfil.apellido || !formularioPerfil.correo) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      setCargando(true);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de sesión');
        return;
      }

      const response = await fetch('http://localhost:3000/api/perfil', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formularioPerfil)
      });

      if (response.ok) {
        // Actualizar datos locales
        const userDataActualizado = {
          ...userData,
          nombre: formularioPerfil.nombre,
          apellido: formularioPerfil.apellido,
          correo: formularioPerfil.correo
        };
        
        await AsyncStorage.setItem('userData', JSON.stringify(userDataActualizado));
        setUserData(userDataActualizado);
        setModalEditarPerfil(false);
        
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setCargando(false);
    }
  };

  const cambiarContrasena = async () => {
    if (!formularioContrasena.actual || !formularioContrasena.nueva || !formularioContrasena.confirmar) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (formularioContrasena.nueva !== formularioContrasena.confirmar) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    if (formularioContrasena.nueva.length < 8) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      setCargando(true);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de sesión');
        return;
      }

      const response = await fetch('http://localhost:3000/api/cambiar-contrasena', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contrasenaActual: formularioContrasena.actual,
          nuevaContrasena: formularioContrasena.nueva
        })
      });

      if (response.ok) {
        setModalCambiarContrasena(false);
        setFormularioContrasena({ actual: '', nueva: '', confirmar: '' });
        Alert.alert('Éxito', 'Contraseña cambiada correctamente');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'No se pudo cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      Alert.alert('Error', 'No se pudo cambiar la contraseña');
    } finally {
      setCargando(false);
    }
  };

  const ConfiguracionItem = ({ icono, titulo, descripcion, tipo, valor, onPress, color = '#023047' }) => (
    <Animated.View 
      style={[
        estilos.configItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity style={estilos.configItemContent} onPress={onPress}>
        <View style={estilos.configItemLeft}>
          <View style={[estilos.iconoContainer, { backgroundColor: color + '20' }]}>
            <FontAwesome name={icono} size={20} color={color} />
          </View>
          <View style={estilos.configItemText}>
            <Text style={estilos.configTitulo}>{titulo}</Text>
            <Text style={estilos.configDescripcion}>{descripcion}</Text>
          </View>
        </View>
        <View style={estilos.configItemRight}>
          {tipo === 'switch' ? (
            <Switch
              value={valor}
              onValueChange={onPress}
              trackColor={{ false: '#e0e0e0', true: color }}
              thumbColor={valor ? '#fff' : '#f4f3f4'}
            />
          ) : (
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={estilos.contenedor}>
      {/* Header con perfil */}
      <Animated.View 
        style={[
          estilos.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Image
          source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }}
          style={estilos.avatar}
        />
        <View style={estilos.perfilInfo}>
          <Text style={estilos.nombreUsuario}>{userData?.nombre || 'Usuario'} {userData?.apellido || ''}</Text>
          <Text style={estilos.correoUsuario}>{userData?.correo || 'usuario@ejemplo.com'}</Text>
          <Text style={estilos.usuarioText}>@{userData?.usuario || 'usuario'}</Text>
          {esAdmin && (
            <View style={estilos.adminBadge}>
              <FontAwesome name="shield" size={12} color="#ffc107" />
              <Text style={estilos.adminText}>Administrador</Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Configuraciones de la App */}
      <Animated.View 
        style={[
          estilos.seccion,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={estilos.seccionTitulo}>Configuración de la App</Text>
        
        <ConfiguracionItem
          icono="bell"
          titulo="Notificaciones"
          descripcion="Recibir notificaciones de progreso"
          tipo="switch"
          valor={configuraciones.notificaciones}
          onPress={() => guardarConfiguracion('notificaciones', !configuraciones.notificaciones)}
          color="#28a745"
        />
        
        <ConfiguracionItem
          icono="mobile"
          titulo="Vibración"
          descripcion="Activar retroalimentación háptica"
          tipo="switch"
          valor={configuraciones.vibracion}
          onPress={() => guardarConfiguracion('vibracion', !configuraciones.vibracion)}
          color="#17a2b8"
        />
        
        <ConfiguracionItem
          icono="moon-o"
          titulo="Modo Oscuro"
          descripcion="Usar tema oscuro en la aplicación"
          tipo="switch"
          valor={configuraciones.modoOscuro}
          onPress={() => guardarConfiguracion('modoOscuro', !configuraciones.modoOscuro)}
          color="#6f42c1"
        />
        
        <ConfiguracionItem
          icono="language"
          titulo="Idioma"
          descripcion="Español (Guatemala)"
          tipo="navegacion"
          onPress={() => Alert.alert('Idioma', 'Próximamente disponible')}
          color="#fd7e14"
        />
      </Animated.View>

      {/* Configuraciones de Cuenta */}
      <Animated.View 
        style={[
          estilos.seccion,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={estilos.seccionTitulo}>Mi Cuenta</Text>
        
        <ConfiguracionItem
          icono="edit"
          titulo="Editar Perfil"
          descripcion="Cambiar información personal"
          tipo="navegacion"
          onPress={() => setModalEditarPerfil(true)}
          color="#007bff"
        />
        
        <ConfiguracionItem
          icono="lock"
          titulo="Cambiar Contraseña"
          descripcion="Actualizar tu contraseña"
          tipo="navegacion"
          onPress={() => setModalCambiarContrasena(true)}
          color="#6c757d"
        />
        
      </Animated.View>

      {/* Configuraciones de Admin (solo si es admin) */}
      {esAdmin && (
        <Animated.View 
          style={[
            estilos.seccion,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={estilos.seccionTitulo}>Panel de Administración</Text>
          
          <ConfiguracionItem
            icono="users"
            titulo="Gestionar Usuarios"
            descripcion="Ver y administrar usuarios"
            tipo="navegacion"
            onPress={() => navigation.navigate('Administrador')}
            color="#dc3545"
          />
          
          <ConfiguracionItem
            icono="book"
            titulo="Gestionar Lecciones"
            descripcion="Crear y editar lecciones"
            tipo="navegacion"
            onPress={() => Alert.alert('Gestionar Lecciones', 'Esta función estará disponible próximamente')}
            color="#e83e8c"
          />
          
          <ConfiguracionItem
            icono="bar-chart"
            titulo="Estadísticas Generales"
            descripcion="Ver estadísticas de todos los usuarios"
            tipo="navegacion"
            onPress={() => navigation.navigate('Administrador')}
            color="#6f42c1"
          />
        </Animated.View>
      )}

      {/* Soporte y Ayuda */}
      <Animated.View 
        style={[
          estilos.seccion,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={estilos.seccionTitulo}>Soporte</Text>
        
        <ConfiguracionItem
          icono="question-circle"
          titulo="Ayuda"
          descripcion="Preguntas frecuentes y guías"
          tipo="navegacion"
          onPress={() => Linking.openURL('https://lensegua.com/ayuda')}
          color="#17a2b8"
        />
        
        <ConfiguracionItem
          icono="envelope"
          titulo="Contactar Soporte"
          descripcion="Enviar mensaje al equipo"
          tipo="navegacion"
          onPress={contactarSoporte}
          color="#28a745"
        />
        
        <ConfiguracionItem
          icono="info-circle"
          titulo="Acerca de"
          descripcion="Versión 1.0.0 - LENSEGUA"
          tipo="navegacion"
          onPress={() => Alert.alert('Acerca de LENSEGUA', 'Versión 1.0.0\n\nAplicación para aprender Lengua de Señas Guatemalteca\n\nDesarrollado con ❤️ para la comunidad')}
          color="#6c757d"
        />
        
        <ConfiguracionItem
          icono="refresh"
          titulo="Limpiar Datos"
          descripcion="Reiniciar configuraciones de la app"
          tipo="navegacion"
          onPress={limpiarDatos}
          color="#ffc107"
        />
      </Animated.View>

      {/* Acciones Peligrosas */}
      <Animated.View 
        style={[
          estilos.seccion,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ConfiguracionItem
          icono="trash"
          titulo="Eliminar Cuenta"
          descripcion="Eliminar permanentemente tu cuenta"
          tipo="navegacion"
          onPress={eliminarCuenta}
          color="#dc3545"
        />
        
        <ConfiguracionItem
          icono="sign-out"
          titulo="Cerrar Sesión"
          descripcion="Salir de tu cuenta"
          tipo="navegacion"
          onPress={cerrarSesion}
          color="#6c757d"
        />
      </Animated.View>

      {/* Modal para Editar Perfil */}
      <Modal
        visible={modalEditarPerfil}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalEditarPerfil(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalContent}>
            <View style={estilos.modalHeader}>
              <Text style={estilos.modalTitle}>Editar Perfil</Text>
              <TouchableOpacity onPress={() => setModalEditarPerfil(false)}>
                <FontAwesome name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Nombre</Text>
              <TextInput
                style={estilos.input}
                value={formularioPerfil.nombre}
                onChangeText={(text) => setFormularioPerfil({...formularioPerfil, nombre: text})}
                placeholder="Tu nombre"
              />
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Apellido</Text>
              <TextInput
                style={estilos.input}
                value={formularioPerfil.apellido}
                onChangeText={(text) => setFormularioPerfil({...formularioPerfil, apellido: text})}
                placeholder="Tu apellido"
              />
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Correo Electrónico</Text>
              <TextInput
                style={estilos.input}
                value={formularioPerfil.correo}
                onChangeText={(text) => setFormularioPerfil({...formularioPerfil, correo: text})}
                placeholder="tu@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={estilos.modalButtons}>
              <TouchableOpacity 
                style={[estilos.modalButton, estilos.modalButtonSecondary]}
                onPress={() => setModalEditarPerfil(false)}
              >
                <Text style={estilos.modalButtonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[estilos.modalButton, estilos.modalButtonPrimary]}
                onPress={actualizarPerfil}
                disabled={cargando}
              >
                <Text style={estilos.modalButtonTextPrimary}>
                  {cargando ? 'Guardando...' : 'Guardar Cambios'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Cambiar Contraseña */}
      <Modal
        visible={modalCambiarContrasena}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalCambiarContrasena(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalContent}>
            <View style={estilos.modalHeader}>
              <Text style={estilos.modalTitle}>Cambiar Contraseña</Text>
              <TouchableOpacity onPress={() => setModalCambiarContrasena(false)}>
                <FontAwesome name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Contraseña Actual</Text>
              <TextInput
                style={estilos.input}
                value={formularioContrasena.actual}
                onChangeText={(text) => setFormularioContrasena({...formularioContrasena, actual: text})}
                placeholder="Tu contraseña actual"
                secureTextEntry={true}
              />
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Nueva Contraseña</Text>
              <TextInput
                style={estilos.input}
                value={formularioContrasena.nueva}
                onChangeText={(text) => setFormularioContrasena({...formularioContrasena, nueva: text})}
                placeholder="Mínimo 8 caracteres"
                secureTextEntry={true}
              />
            </View>
            
            <View style={estilos.formGroup}>
              <Text style={estilos.label}>Confirmar Nueva Contraseña</Text>
              <TextInput
                style={estilos.input}
                value={formularioContrasena.confirmar}
                onChangeText={(text) => setFormularioContrasena({...formularioContrasena, confirmar: text})}
                placeholder="Repite la nueva contraseña"
                secureTextEntry={true}
              />
            </View>
            
            <View style={estilos.modalButtons}>
              <TouchableOpacity 
                style={[estilos.modalButton, estilos.modalButtonSecondary]}
                onPress={() => setModalCambiarContrasena(false)}
              >
                <Text style={estilos.modalButtonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[estilos.modalButton, estilos.modalButtonPrimary]}
                onPress={cambiarContrasena}
                disabled={cargando}
              >
                <Text style={estilos.modalButtonTextPrimary}>
                  {cargando ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Contactar Soporte */}
      <Modal
        visible={modalSoporte}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalSoporte(false)}
      >
        <View style={estilos.modalOverlay}>
          <ScrollView contentContainerStyle={estilos.modalContentScroll}>
            <View style={estilos.modalContent}>
              <View style={estilos.modalHeader}>
                <Text style={estilos.modalTitle}>📞 Contactar Soporte</Text>
                <TouchableOpacity onPress={() => setModalSoporte(false)}>
                  <FontAwesome name="times" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <Text style={estilos.modalSubtitle}>
                ¿En qué podemos ayudarte? Te responderemos en menos de 24 horas.
              </Text>
              
              <View style={estilos.formGroup}>
                <Text style={estilos.label}>Tipo de Consulta</Text>
                <View style={estilos.tipoContainer}>
                  <TouchableOpacity 
                    style={[estilos.tipoButton, formularioSoporte.tipo === 'soporte' && estilos.tipoButtonActive]}
                    onPress={() => setFormularioSoporte({...formularioSoporte, tipo: 'soporte'})}
                  >
                    <Text style={[estilos.tipoButtonText, formularioSoporte.tipo === 'soporte' && estilos.tipoButtonTextActive]}>
                      🔧 Soporte Técnico
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[estilos.tipoButton, formularioSoporte.tipo === 'bug' && estilos.tipoButtonActive]}
                    onPress={() => setFormularioSoporte({...formularioSoporte, tipo: 'bug'})}
                  >
                    <Text style={[estilos.tipoButtonText, formularioSoporte.tipo === 'bug' && estilos.tipoButtonTextActive]}>
                      🐛 Reportar Bug
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[estilos.tipoButton, formularioSoporte.tipo === 'sugerencia' && estilos.tipoButtonActive]}
                    onPress={() => setFormularioSoporte({...formularioSoporte, tipo: 'sugerencia'})}
                  >
                    <Text style={[estilos.tipoButtonText, formularioSoporte.tipo === 'sugerencia' && estilos.tipoButtonTextActive]}>
                      💡 Sugerencia
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[estilos.tipoButton, formularioSoporte.tipo === 'general' && estilos.tipoButtonActive]}
                    onPress={() => setFormularioSoporte({...formularioSoporte, tipo: 'general'})}
                  >
                    <Text style={[estilos.tipoButtonText, formularioSoporte.tipo === 'general' && estilos.tipoButtonTextActive]}>
                      ❓ Consulta General
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={estilos.formGroup}>
                <Text style={estilos.label}>Asunto</Text>
                <TextInput
                  style={estilos.input}
                  value={formularioSoporte.asunto}
                  onChangeText={(text) => setFormularioSoporte({...formularioSoporte, asunto: text})}
                  placeholder="Resume tu consulta en pocas palabras"
                />
              </View>
              
              <View style={estilos.formGroup}>
                <Text style={estilos.label}>Mensaje Detallado</Text>
                <TextInput
                  style={[estilos.input, estilos.textArea]}
                  value={formularioSoporte.mensaje}
                  onChangeText={(text) => setFormularioSoporte({...formularioSoporte, mensaje: text})}
                  placeholder="Describe tu consulta o problema con el mayor detalle posible..."
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={estilos.modalButtons}>
                <TouchableOpacity 
                  style={[estilos.modalButton, estilos.modalButtonSecondary]}
                  onPress={() => setModalSoporte(false)}
                >
                  <Text style={estilos.modalButtonTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[estilos.modalButton, estilos.modalButtonPrimary]}
                  onPress={enviarSoporte}
                  disabled={cargando}
                >
                  <Text style={estilos.modalButtonTextPrimary}>
                    {cargando ? 'Enviando...' : 'Enviar Mensaje'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  perfilInfo: {
    flex: 1,
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 4,
  },
  correoUsuario: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  usuarioText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  adminText: {
    fontSize: 12,
    color: '#856404',
    marginLeft: 4,
    fontWeight: '500',
  },
  seccion: {
    marginBottom: 20,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 10,
  },
  configItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  configItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  configItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  configItemText: {
    flex: 1,
  },
  configTitulo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#023047',
    marginBottom: 2,
  },
  configDescripcion: {
    fontSize: 12,
    color: '#666',
  },
  configItemRight: {
    marginLeft: 10,
  },
  // Estilos para modales
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023047',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#023047',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#023047',
  },
  modalButtonSecondary: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtonTextPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalButtonTextSecondary: {
    color: '#666',
    fontWeight: '500',
    fontSize: 16,
  },
  // Estilos específicos para el modal de soporte
  modalContentScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  tipoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tipoButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  tipoButtonActive: {
    backgroundColor: '#023047',
    borderColor: '#023047',
  },
  tipoButtonText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tipoButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
