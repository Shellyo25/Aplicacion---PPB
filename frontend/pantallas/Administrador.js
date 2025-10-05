import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  RefreshControl,
  Modal,
  TextInput
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export default function Administrador({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [progreso, setProgreso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nuevoRol, setNuevoRol] = useState('usuario');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('token');
      
      if (userDataString && token) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        
        if (user.rol === 'administrador') {
          await Promise.all([
            cargarEstadisticas(token),
            cargarUsuarios(token),
            cargarProgreso(token)
          ]);
        } else {
          Alert.alert('Acceso denegado', 'No tienes permisos de administrador');
          navigation.navigate('menu');
        }
      } else {
        navigation.navigate('InicioSesion');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      Alert.alert('Error', 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/estadisticas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEstadisticas(data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const cargarUsuarios = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/usuarios`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuarios);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const cargarProgreso = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/progreso`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProgreso(data.progreso);
      }
    } catch (error) {
      console.error('Error al cargar progreso:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    await Promise.all([
      cargarEstadisticas(token),
      cargarUsuarios(token),
      cargarProgreso(token)
    ]);
    setRefreshing(false);
  };

  const cambiarRol = async (userId, nuevoRol) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/usuarios/${userId}/rol`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rol: nuevoRol }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Rol actualizado correctamente');
        cargarUsuarios(token);
        setModalVisible(false);
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'Error al actualizar rol');
      }
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      Alert.alert('Error', 'Error de conexión');
    }
  };

  const cambiarEstado = async (userId, nuevoEstado) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/usuarios/${userId}/estado`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Estado actualizado correctamente');
        cargarUsuarios(token);
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      Alert.alert('Error', 'Error de conexión');
    }
  };

  const abrirModalRol = (usuario) => {
    setSelectedUser(usuario);
    setNuevoRol(usuario.Rol);
    setModalVisible(true);
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Bienvenida');
  };

  if (loading) {
    return (
      <View style={[estilos.contenedor, estilos.centrado]}>
        <ActivityIndicator size="large" color="#fb8500" />
        <Text style={estilos.textoCarga}>Cargando panel de administración...</Text>
      </View>
    );
  }

  const renderDashboard = () => (
    <View style={estilos.seccion}>
      <Text style={estilos.tituloSeccion}>Dashboard</Text>
      
      {estadisticas && (
        <View style={estilos.cardsContainer}>
          <View style={estilos.card}>
            <FontAwesome name="users" size={30} color="#219ebc" />
            <Text style={estilos.cardNumero}>{estadisticas.totalUsuarios}</Text>
            <Text style={estilos.cardTexto}>Total Usuarios</Text>
          </View>
          <View style={estilos.card}>
            <FontAwesome name="user" size={30} color="#4CAF50" />
            <Text style={estilos.cardNumero}>{estadisticas.usuariosActivos}</Text>
            <Text style={estilos.cardTexto}>Usuarios Activos</Text>
          </View>
          <View style={estilos.card}>
            <FontAwesome name="book" size={30} color="#fb8500" />
            <Text style={estilos.cardNumero}>{estadisticas.totalLecciones}</Text>
            <Text style={estilos.cardTexto}>Lecciones</Text>
          </View>
          <View style={estilos.card}>
            <FontAwesome name="bar-chart" size={30} color="#9c27b0" />
            <Text style={estilos.cardNumero}>{Math.round(estadisticas.promedioProgreso || 0)}%</Text>
            <Text style={estilos.cardTexto}>Progreso Promedio</Text>
          </View>
        </View>
      )}

      {estadisticas?.usuariosPorRol && (
        <View style={estilos.graficoContainer}>
          <Text style={estilos.subtitulo}>Usuarios por Rol</Text>
          {estadisticas.usuariosPorRol.map((item, index) => (
            <View key={index} style={estilos.graficoItem}>
              <Text style={estilos.graficoLabel}>{item.Rol}</Text>
              <View style={estilos.graficoBarra}>
                <View 
                  style={[
                    estilos.graficoProgreso, 
                    { width: `${(item.cantidad / estadisticas.totalUsuarios) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={estilos.graficoNumero}>{item.cantidad}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderUsuarios = () => (
    <View style={estilos.seccion}>
      <Text style={estilos.tituloSeccion}>Gestión de Usuarios</Text>
      
      {usuarios.map((usuario) => (
        <View key={usuario.Pk_ID_usuario} style={estilos.usuarioCard}>
          <View style={estilos.usuarioInfo}>
            <Text style={estilos.usuarioNombre}>{usuario.Nombre} {usuario.Apellido}</Text>
            <Text style={estilos.usuarioDetalle}>@{usuario.Usuario}</Text>
            <Text style={estilos.usuarioDetalle}>{usuario.Correo}</Text>
            <View style={estilos.usuarioBadges}>
              <View style={[estilos.badge, usuario.Rol === 'administrador' ? estilos.badgeAdmin : estilos.badgeUsuario]}>
                <Text style={estilos.badgeTexto}>{usuario.Rol}</Text>
              </View>
              <View style={[estilos.badge, usuario.Estado === 'activo' ? estilos.badgeActivo : estilos.badgeInactivo]}>
                <Text style={estilos.badgeTexto}>{usuario.Estado}</Text>
              </View>
            </View>
          </View>
          <View style={estilos.usuarioAcciones}>
            <TouchableOpacity 
              style={estilos.botonAccion}
              onPress={() => abrirModalRol(usuario)}
            >
              <FontAwesome name="cog" size={16} color="#219ebc" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={estilos.botonAccion}
              onPress={() => cambiarEstado(usuario.Pk_ID_usuario, usuario.Estado === 'activo' ? 'inactivo' : 'activo')}
            >
              <FontAwesome 
                name={usuario.Estado === 'activo' ? 'ban' : 'check'} 
                size={16} 
                color={usuario.Estado === 'activo' ? '#f44336' : '#4CAF50'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderProgreso = () => (
    <View style={estilos.seccion}>
      <Text style={estilos.tituloSeccion}>Progreso de Usuarios</Text>
      
      {progreso.map((item, index) => (
        <View key={index} style={estilos.progresoCard}>
          <View style={estilos.progresoInfo}>
            <Text style={estilos.progresoUsuario}>{item.Nombre} (@{item.Usuario})</Text>
            <Text style={estilos.progresoLeccion}>{item.leccion_nombre}</Text>
            <View style={estilos.progresoBarra}>
              <View 
                style={[
                  estilos.progresoProgreso, 
                  { width: `${item.Porcen_Av}%` }
                ]} 
              />
            </View>
            <Text style={estilos.progresoPorcentaje}>{item.Porcen_Av}%</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      {/* Header */}
      <View style={estilos.header}>
        <View style={estilos.headerInfo}>
          <Text style={estilos.titulo}>Panel de Administración</Text>
          <Text style={estilos.subtitulo}>Bienvenido, {userData?.nombre}</Text>
        </View>
        <TouchableOpacity onPress={cerrarSesion} style={estilos.botonCerrar}>
          <FontAwesome name="sign-out" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={estilos.tabs}>
        <TouchableOpacity 
          style={[estilos.tab, activeTab === 'dashboard' && estilos.tabActivo]}
          onPress={() => setActiveTab('dashboard')}
        >
          <FontAwesome name="tachometer" size={16} color={activeTab === 'dashboard' ? '#fff' : '#666'} />
          <Text style={[estilos.tabTexto, activeTab === 'dashboard' && estilos.tabTextoActivo]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[estilos.tab, activeTab === 'usuarios' && estilos.tabActivo]}
          onPress={() => setActiveTab('usuarios')}
        >
          <FontAwesome name="users" size={16} color={activeTab === 'usuarios' ? '#fff' : '#666'} />
          <Text style={[estilos.tabTexto, activeTab === 'usuarios' && estilos.tabTextoActivo]}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[estilos.tab, activeTab === 'progreso' && estilos.tabActivo]}
          onPress={() => setActiveTab('progreso')}
        >
          <FontAwesome name="line-chart" size={16} color={activeTab === 'progreso' ? '#fff' : '#666'} />
          <Text style={[estilos.tabTexto, activeTab === 'progreso' && estilos.tabTextoActivo]}>Progreso</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <ScrollView 
        style={estilos.contenido}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'usuarios' && renderUsuarios()}
        {activeTab === 'progreso' && renderProgreso()}
      </ScrollView>

      {/* Modal para cambiar rol */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalTitulo}>Cambiar Rol de Usuario</Text>
            <Text style={estilos.modalSubtitulo}>
              {selectedUser?.Nombre} {selectedUser?.Apellido}
            </Text>
            
            <View style={estilos.rolOpciones}>
              <TouchableOpacity 
                style={[estilos.rolOpcion, nuevoRol === 'usuario' && estilos.rolOpcionSeleccionada]}
                onPress={() => setNuevoRol('usuario')}
              >
                <FontAwesome name="user" size={20} color={nuevoRol === 'usuario' ? '#fff' : '#666'} />
                <Text style={[estilos.rolOpcionTexto, nuevoRol === 'usuario' && estilos.rolOpcionTextoSeleccionada]}>
                  Usuario
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[estilos.rolOpcion, nuevoRol === 'administrador' && estilos.rolOpcionSeleccionada]}
                onPress={() => setNuevoRol('administrador')}
              >
                <FontAwesome name="shield" size={20} color={nuevoRol === 'administrador' ? '#fff' : '#666'} />
                <Text style={[estilos.rolOpcionTexto, nuevoRol === 'administrador' && estilos.rolOpcionTextoSeleccionada]}>
                  Administrador
                </Text>
              </TouchableOpacity>
            </View>

            <View style={estilos.modalBotones}>
              <TouchableOpacity 
                style={estilos.modalBotonCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={estilos.modalBotonTextoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={estilos.modalBotonConfirmar}
                onPress={() => cambiarRol(selectedUser?.Pk_ID_usuario, nuevoRol)}
              >
                <Text style={estilos.modalBotonTextoConfirmar}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centrado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#023047',
  },
  headerInfo: {
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#8ecae6',
  },
  botonCerrar: {
    backgroundColor: '#fb8500',
    padding: 10,
    borderRadius: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  tabActivo: {
    backgroundColor: '#219ebc',
  },
  tabTexto: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabTextoActivo: {
    color: '#fff',
  },
  contenido: {
    flex: 1,
  },
  seccion: {
    padding: 20,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023047',
    marginTop: 10,
  },
  cardTexto: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  graficoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  graficoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  graficoLabel: {
    width: 100,
    fontSize: 14,
    color: '#023047',
    textTransform: 'capitalize',
  },
  graficoBarra: {
    flex: 1,
    height: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  graficoProgreso: {
    height: '100%',
    backgroundColor: '#219ebc',
    borderRadius: 10,
  },
  graficoNumero: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'right',
  },
  usuarioCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  usuarioInfo: {
    flex: 1,
  },
  usuarioNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  usuarioDetalle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  usuarioBadges: {
    flexDirection: 'row',
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeAdmin: {
    backgroundColor: '#e3f2fd',
  },
  badgeUsuario: {
    backgroundColor: '#f3e5f5',
  },
  badgeActivo: {
    backgroundColor: '#e8f5e8',
  },
  badgeInactivo: {
    backgroundColor: '#ffebee',
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  usuarioAcciones: {
    flexDirection: 'row',
  },
  botonAccion: {
    padding: 10,
    marginLeft: 5,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  progresoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progresoInfo: {
    flex: 1,
  },
  progresoUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 5,
  },
  progresoLeccion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progresoBarra: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progresoProgreso: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progresoPorcentaje: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 400,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  rolOpciones: {
    marginBottom: 30,
  },
  rolOpcion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  rolOpcionSeleccionada: {
    backgroundColor: '#219ebc',
    borderColor: '#219ebc',
  },
  rolOpcionTexto: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  rolOpcionTextoSeleccionada: {
    color: '#fff',
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBotonCancelar: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
    marginRight: 10,
  },
  modalBotonConfirmar: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#219ebc',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalBotonTextoCancelar: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  modalBotonTextoConfirmar: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#023047',
  },
});
