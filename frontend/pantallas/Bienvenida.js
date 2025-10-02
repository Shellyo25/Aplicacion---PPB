import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Bienvenida({ navigation }) {
  // Animaciones
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const bounceAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    // Animación de rebote del personaje
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        })
      ])
    );
    bounceAnimation.start();

    // Animación de rotación sutil
    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        })
      ])
    );
    rotateAnimation.start();

    return () => {
      bounceAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '5deg'],
  });

  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.content}>
        {/* Personaje animado */}
        <Animated.View 
          style={[
            estilos.personajeContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: bounceAnim },
                { rotate: rotateInterpolate }
              ]
            }
          ]}
        >
          <Image
            source={{ uri: 'https://res.cloudinary.com/dz2qmueau/image/upload/v1759129044/lensegua_orpupa.png' }}
            style={estilos.personaje}
          />
          <Animated.Text 
            style={[
              estilos.saludoPersonaje,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            ¡Hola! Soy tu guía en el aprendizaje de lengua de señas
          </Animated.Text>
        </Animated.View>

        {/* Título y descripción */}
        <Animated.View 
          style={[
            estilos.textoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={estilos.titulo}>¡ES HORA DE APRENDER!</Text>
          <Text style={estilos.subtitulo}>Lengua de Señas Guatemalteca</Text>
          <Text style={estilos.descripcion}>
            Aprende de manera interactiva y divertida la lengua de señas guatemalteca. 
            Únete a nuestra comunidad y comienza tu viaje de aprendizaje hoy.
          </Text>
        </Animated.View>

        {/* Características animadas */}
        <Animated.View 
          style={[
            estilos.caracteristicas,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={estilos.caracteristica}>
            <Animated.View 
              style={[
                estilos.caracteristicaIcono,
                {
                  transform: [{ scale: bounceAnim }]
                }
              ]}
            >
              <FontAwesome name="graduation-cap" size={24} color="#fb8500" />
            </Animated.View>
            <Text style={estilos.caracteristicaTexto}>Lecciones Interactivas</Text>
          </View>
          <View style={estilos.caracteristica}>
            <Animated.View 
              style={[
                estilos.caracteristicaIcono,
                {
                  transform: [{ scale: bounceAnim }]
                }
              ]}
            >
              <FontAwesome name="trophy" size={24} color="#fb8500" />
            </Animated.View>
            <Text style={estilos.caracteristicaTexto}>Sistema de Logros</Text>
          </View>
          <View style={estilos.caracteristica}>
            <Animated.View 
              style={[
                estilos.caracteristicaIcono,
                {
                  transform: [{ scale: bounceAnim }]
                }
              ]}
            >
              <FontAwesome name="users" size={24} color="#fb8500" />
            </Animated.View>
            <Text style={estilos.caracteristicaTexto}>Comunidad Activa</Text>
          </View>
        </Animated.View>

        {/* Botones de acción animados */}
        <Animated.View 
          style={[
            estilos.botonesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={estilos.botonPrimario} 
            onPress={() => navigation.navigate('Registro')}
          >
            <FontAwesome name="user-plus" size={20} color="#fff" style={estilos.botonIcono} />
            <Text style={estilos.botonPrimarioTexto}>Crear cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={estilos.botonSecundario} 
            onPress={() => navigation.navigate('InicioSesion')}
          >
            <FontAwesome name="sign-in" size={20} color="#219ebc" style={estilos.botonIcono} />
            <Text style={estilos.botonSecundarioTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          style={[
            estilos.footer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={estilos.footerTexto}>
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#219ebc', // Color azul original de LENSEGUA
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  personajeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  personaje: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  saludoPersonaje: {
    fontSize: 16,
    color: '#023047',
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  textoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitulo: {
    fontSize: 18,
    color: '#fb8500',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  descripcion: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  caracteristicas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  caracteristica: {
    alignItems: 'center',
    flex: 1,
  },
  caracteristicaIcono: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  caracteristicaTexto: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  botonesContainer: {
    marginBottom: 40,
  },
  botonPrimario: {
    backgroundColor: '#fb8500', // Color naranja original de LENSEGUA
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#fb8500',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  botonPrimarioTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  botonSecundario: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#219ebc',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  botonSecundarioTexto: {
    color: '#219ebc',
    fontSize: 18,
    fontWeight: '600',
  },
  botonIcono: {
    marginRight: 12,
  },
  footer: {
    alignItems: 'center',
  },
  footerTexto: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});