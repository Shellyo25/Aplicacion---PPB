import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Bienvenida from './pantallas/Bienvenida';
import Registro from './pantallas/Registro';
import InicioSesion from './pantallas/InicioSesion';
import menu from './pantallas/menu';
import Listalecciones from './pantallas/Listalecciones';
import ContenidoLecciones from './pantallas/ContenidoLecciones';
import ListaEjercicios from './pantallas/ListaEjercicios';
import EjerciciosLeccion from './pantallas/EjerciciosLeccion';
import EjercicioCamara from './pantallas/EjercicioCamara';
import Estadisticas from './pantallas/Estadisticas';
import Configuracion from './pantallas/Configuracion';
import Administrador from './pantallas/Administrador';
import { ThemeProvider } from './TemaApp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <ThemeProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Bienvenida"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#1a1a1a',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen 
            name="Bienvenida" 
            component={Bienvenida} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Registro" 
            component={Registro}
            options={{ 
              title: 'Crear cuenta',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="InicioSesion" 
            component={InicioSesion}
            options={{ 
              title: 'Iniciar sesión',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="menu" 
            component={menu}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Listalecciones" 
            component={Listalecciones}
            options={{ 
              title: 'Lecciones',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="ContenidoLecciones" 
            component={ContenidoLecciones}
            options={{ 
              title: 'Contenido',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="EjerciciosLeccion" 
            component={EjerciciosLeccion}
            options={{ 
              title: 'Ejercicios de Lección',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen
            name="ListaEjercicios"
            component={ListaEjercicios}
          />
          <Stack.Screen 
          name="EjercicioCamara" 
          component={EjercicioCamara} 
          />
          <Stack.Screen 
            name="Estadisticas" 
            component={Estadisticas}
            options={{ 
              title: 'Estadísticas',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="Configuracion" 
            component={Configuracion}
            options={({ navigation }) => ({ 
              title: 'Configuración',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', padding: 5, paddingRight: 15 }}>
                  <FontAwesome name="chevron-left" size={18} color="#007AFF" style={{ marginRight: 5 }} />
                  <Text style={{ color: '#007AFF', fontSize: 17 }}>Menú</Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen 
            name="Administrador" 
            component={Administrador}
            options={({ navigation }) => ({ 
              title: 'Panel de Administración',
              headerStyle: { backgroundColor: '#023047' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', padding: 5, paddingRight: 15 }}>
                  <FontAwesome name="chevron-left" size={18} color="#fff" style={{ marginRight: 5 }} />
                  <Text style={{ color: '#fff', fontSize: 17 }}>Menú</Text>
                </TouchableOpacity>
              )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    </>
  );
}