import React, { useState, useEffect } from 'react';
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
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Configuracion({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [configuraciones, setConfiguraciones] = useState({
    notificaciones: true,
    sonidos: true,
    modoOscuro: false,
    idioma: 'es',
    recordarSesion: true
  });
  const [esAdmin, setEsAdmin] = useState(false);

  // Animaciones
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

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
        // Verificar si es admin (puedes cambiar esta lógica)
        setEsAdmin(user.usuario === 'admin' || user.correo === 'admin@lensegua.com');
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
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Bienvenida');
          }
        }
      ]
    );
  };

  const eliminarCuenta = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar tu cuenta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Función en desarrollo', 'Esta función estará disponible próximamente');
          }
        }
      ]
    );
  };

  const exportarDatos = () => {
    Alert.alert('Exportar Datos', 'Esta función te permitirá descargar tu progreso de aprendizaje');
  };

  const contactarSoporte = () => {
    Alert.alert(
      'Contactar Soporte',
      '¿Cómo te gustaría contactarnos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Email', onPress: () => Alert.alert('Email', 'soporte@lensegua.com') },
        { text: 'WhatsApp', onPress: () => Alert.alert('WhatsApp', '+502 1234-5678') }
      ]
    );
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
          <Text style={estilos.nombreUsuario}>{userData?.nombre || 'Usuario'}</Text>
          <Text style={estilos.correoUsuario}>{userData?.correo || 'usuario@ejemplo.com'}</Text>
          {esAdmin && (
            <View style={estilos.adminBadge}>
              <FontAwesome name="crown" size={12} color="#ffc107" />
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
          icono="volume-up"
          titulo="Sonidos"
          descripcion="Reproducir sonidos en la app"
          tipo="switch"
          valor={configuraciones.sonidos}
          onPress={() => guardarConfiguracion('sonidos', !configuraciones.sonidos)}
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
          icono="user-edit"
          titulo="Editar Perfil"
          descripcion="Cambiar información personal"
          tipo="navegacion"
          onPress={() => Alert.alert('Editar Perfil', 'Próximamente disponible')}
          color="#007bff"
        />
        
        <ConfiguracionItem
          icono="lock"
          titulo="Cambiar Contraseña"
          descripcion="Actualizar tu contraseña"
          tipo="navegacion"
          onPress={() => Alert.alert('Cambiar Contraseña', 'Próximamente disponible')}
          color="#6c757d"
        />
        
        <ConfiguracionItem
          icono="download"
          titulo="Exportar Datos"
          descripcion="Descargar tu progreso"
          tipo="navegacion"
          onPress={exportarDatos}
          color="#20c997"
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
            onPress={() => Alert.alert('Admin', 'Panel de usuarios - Próximamente')}
            color="#dc3545"
          />
          
          <ConfiguracionItem
            icono="book"
            titulo="Gestionar Lecciones"
            descripcion="Crear y editar lecciones"
            tipo="navegacion"
            onPress={() => Alert.alert('Admin', 'Editor de lecciones - Próximamente')}
            color="#e83e8c"
          />
          
          <ConfiguracionItem
            icono="bar-chart"
            titulo="Estadísticas Generales"
            descripcion="Ver estadísticas de todos los usuarios"
            tipo="navegacion"
            onPress={() => Alert.alert('Admin', 'Dashboard admin - Próximamente')}
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
          onPress={() => Alert.alert('Ayuda', 'Centro de ayuda - Próximamente')}
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
});
