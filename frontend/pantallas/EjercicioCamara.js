import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import '@tensorflow/tfjs-react-native';
import * as handpose from '@tensorflow-models/handpose';
import { validarSeniaEspecifica } from './reconocimientoSenias';

export default function EjercicioCamara({ navigation, route }) {

  const [permission, requestPermission] = useCameraPermissions();

  const [modelo, setModelo] = useState(null);

  const [cargandoModelo, setCargandoModelo] = useState(true);

  const [procesando, setProcesando] = useState(false);
  const [capturaPaso, setCapturaPaso] = useState(0);
  const [cuentaRegresiva, setCuentaRegresiva] = useState(0);

  const cameraRef = useRef(null);

  const seniaObjetivo =
    route.params?.seniaObjetivo || 'L';

  useEffect(() => {

    const cargarModelo = async () => {

      try {

        await tf.ready();

        console.log('✅ TensorFlow cargado');

        const net = await handpose.load();

        console.log('✅ Handpose cargado');

        setModelo(net);

      } catch (error) {

        console.log('❌ Error cargando modelo:', error);

      } finally {

        setCargandoModelo(false);

      }

    };

    cargarModelo();

  }, []);

  const validarSenia = async () => {

    if (procesando) {
      return;
    }

    if (!cameraRef.current) {

      Alert.alert(
        'Error',
        'La cámara no está lista'
      );

      return;

    }

    if (!modelo) {

      Alert.alert(
        'Modelo',
        'El modelo aún está cargando'
      );

      return;

    }

    try {
      setProcesando(true);

      // Cuenta regresiva de 3 segundos
      for (let c = 3; c > 0; c--) {
        setCuentaRegresiva(c);
        try {
          Vibration.vibrate(80); // Vibración breve con cada segundo
        } catch (e) {}
        await new Promise(r => setTimeout(r, 1000));
      }
      setCuentaRegresiva(0);

      const landmarksSecuencia = [];

      for (let i = 0; i < 3; i++) {
        setCapturaPaso(i + 1);
        const foto = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
          quality: 0.3,
          base64: false,
        });

        const imgB64 = await FileSystem.readAsStringAsync(foto.uri, { encoding: 'base64' });
        const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
        const raw = new Uint8Array(imgBuffer);
        const imageTensor = decodeJpeg(raw);
        const resizedTensor = tf.image.resizeBilinear(imageTensor, [256, 256]);
        const predictions = await modelo.estimateHands(resizedTensor);

        // ¡Importante para evitar el memory leak en GPU!
        tf.dispose([imageTensor, resizedTensor]);

        if (predictions.length > 0) {
          landmarksSecuencia.push(predictions[0].landmarks);
        } else {
          landmarksSecuencia.push(null);
        }

        if (i < 2) await new Promise(r => setTimeout(r, 600)); // Espera para capturar el movimiento
      }

      setCapturaPaso(0);
      let correcto = validarSeniaEspecifica(landmarksSecuencia, seniaObjetivo);

      if (correcto) {

        Alert.alert(
          '✅ Correcto',
          'Mano detectada correctamente',
          [
            {
              text: 'Continuar',
              onPress: () => {

                navigation.goBack();

                setTimeout(() => {

                  navigation.navigate(
                    'EjerciciosLeccion',
                    {
                      desdeCamara: true,
                      ejercicioCompletado: true,
                      puntuacionEjercicio3: 10,
                      leccionId: route.params.leccionId,
                      nombreLeccion: route.params.nombreLeccion
                    }
                  );

                }, 300);

              }
            }
          ]
        );

      } else {

        try {
          const configStr = await AsyncStorage.getItem('configuraciones');
          let vibrar = true;
          if (configStr) {
            const config = JSON.parse(configStr);
            vibrar = config.vibracion;
          }
          if (vibrar) {
            Vibration.vibrate(500); // 500ms de vibración en error
          }
        } catch (error) {
          console.error('Error al leer config de vibracion:', error);
        }

        Alert.alert(
          '❌ Incorrecto',
          `La secuencia de señas no parece ser "${seniaObjetivo}".\n\nVerifica la posición de tus dedos y el movimiento e inténtalo nuevamente.`
        );

      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo validar la seña'
      );

    } finally {
      setProcesando(false);
      setCapturaPaso(0);
    }

  };

  if (!permission) {

    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color="#219ebc" />
        <Text style={styles.cargandoTexto}>
          Cargando permisos...
        </Text>
      </View>
    );

  }

  if (!permission.granted) {

    return (
      <View style={styles.container}>

        <Text style={styles.permisoTexto}>
          Necesitamos permiso para usar la cámara
        </Text>

        <Text
          onPress={requestPermission}
          style={styles.permisoBoton}
        >
          Dar permiso
        </Text>

      </View>
    );

  }

  return (

    <View style={styles.container}>

      <CameraView
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        style={styles.camera}
        facing="front"
      />

      {cuentaRegresiva > 0 && (
        <View style={styles.countdownOverlay}>
          <View style={styles.countdownBadge}>
            <Text style={styles.countdownText}>{cuentaRegresiva}</Text>
          </View>
          <Text style={styles.countdownSubtext}>¡Prepárate!</Text>
        </View>
      )}

      <View style={styles.overlay}>

        <Text style={styles.titulo}>
          Ejercicio de Cámara
        </Text>

        <Text style={styles.texto}>
          Realiza la seña: {seniaObjetivo}
        </Text>

        <Text style={styles.instrucciones}>
          Mantén la mano visible frente a la cámara
        </Text>

        {cargandoModelo && (
          <Text style={styles.estadoModelo}>
            Cargando modelo de IA...
          </Text>
        )}

      </View>

      <View style={styles.botonContainer}>

        <Button
          title={procesando ? (capturaPaso > 0 ? `Capturando ${capturaPaso}/3...` : 'Validando...') : 'Empezar Validación (3s)'}
          onPress={validarSenia}
          disabled={procesando || cargandoModelo}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000'
  },

  camera: {
    flex: 1
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 80,
    paddingHorizontal: 20
  },

  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
  },

  texto: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },

  instrucciones: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9
  },

  estadoModelo: {
    color: '#ffb703',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold'
  },

  botonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: '60%'
  },

  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  cargandoTexto: {
    marginTop: 15,
    fontSize: 18
  },

  permisoTexto: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 18,
    color: '#023047'
  },

  permisoBoton: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#219ebc',
    fontWeight: 'bold'
  },

  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },

  countdownBadge: {
    backgroundColor: '#fb8500',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },

  countdownText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold'
  },

  countdownSubtext: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  }

});
