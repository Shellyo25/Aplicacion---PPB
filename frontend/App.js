import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bienvenida from './pantallas/Bienvenida';
import Registro from './pantallas/Registro';
import InicioSesion from './pantallas/InicioSesion';
import menu from './pantallas/menu';
import Listalecciones from './pantallas/Listalecciones';
import ContenidoLecciones from './pantallas/ContenidoLecciones';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida">
        <Stack.Screen name="Bienvenida" component={Bienvenida} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="menu" component={menu} />
        <Stack.Screen name="Listalecciones" component={Listalecciones} />
        <Stack.Screen name="ContenidoLecciones" component={ContenidoLecciones} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}