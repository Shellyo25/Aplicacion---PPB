import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Bienvenida from './pantallas/Bienvenida';
import Registro from './pantallas/Registro';
import InicioSesion from './pantallas/InicioSesion';
import menu from './pantallas/menu';
import Listalecciones from './pantallas/Listalecciones';
import ContenidoLecciones from './pantallas/ContenidoLecciones';
import Ejercicios from './pantallas/Ejercicios';
import EjerciciosLeccion from './pantallas/EjerciciosLeccion';
import Estadisticas from './pantallas/Estadisticas';
import Configuracion from './pantallas/Configuracion';
import Administrador from './pantallas/Administrador';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
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
            name="Ejercicios" 
            component={Ejercicios}
            options={{ 
              title: 'Ejercicios',
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
            options={{ 
              title: 'Configuración',
              headerStyle: { backgroundColor: '#f8f9fa' },
              headerTintColor: '#1a1a1a',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
          <Stack.Screen 
            name="Administrador" 
            component={Administrador}
            options={{ 
              title: 'Panel de Administración',
              headerStyle: { backgroundColor: '#023047' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}