// Calcula la distancia euclidiana entre dos puntos 3D
const calcularDistancia = (punto1, punto2) => {
    return Math.sqrt(
        Math.pow(punto1[0] - punto2[0], 2) +
        Math.pow(punto1[1] - punto2[1], 2) +
        Math.pow(punto1[2] - punto2[2], 2)
    );
};

// Analiza los puntos de la mano para saber qué dedos están extendidos
export const analizarMano = (landmarks) => {
    if (!landmarks) return null;

    // Índices de los puntos según Handpose:
    const muneca = landmarks[0];

    const pulgarExtendido = calcularDistancia(landmarks[4], landmarks[17]) > calcularDistancia(landmarks[3], landmarks[17]);
    const indiceExtendido = calcularDistancia(landmarks[8], muneca) > calcularDistancia(landmarks[6], muneca) * 1.1;
    const medioExtendido = calcularDistancia(landmarks[12], muneca) > calcularDistancia(landmarks[10], muneca) * 1.1;
    const anularExtendido = calcularDistancia(landmarks[16], muneca) > calcularDistancia(landmarks[14], muneca) * 1.1;
    const meniqueExtendido = calcularDistancia(landmarks[20], muneca) > calcularDistancia(landmarks[18], muneca) * 1.1;

    return {
        pulgar: pulgarExtendido,
        indice: indiceExtendido,
        medio: medioExtendido,
        anular: anularExtendido,
        menique: meniqueExtendido
    };
};

const esForma = (dedos, forma, landmarks = null) => {
    if (!dedos) return false;
    switch (forma) {
        case 'V':
        case 'U':
            // Indice y medio extendidos (para K, Morado, Viernes)
            // IGNORAMOS el pulgar porque la cámara suele confundirse si está a la mitad.
            return dedos.indice && dedos.medio && !dedos.anular && !dedos.menique;
        case 'ABIERTA':
            // Todos extendidos (Hola 1 y 2, Tuyo 2)
            return dedos.indice && dedos.medio && dedos.anular && dedos.menique;
        case 'INDICE':
            // Solo indice (Tio 1, Tuyo 1, Tomate 1 y 2)
            return dedos.indice && !dedos.medio && !dedos.anular && !dedos.menique;
        case 'MEÑIQUE':
            // Solo meñique (Tio 2)
            return !dedos.indice && !dedos.medio && !dedos.anular && dedos.menique;
        case 'BANCO':
            // 4 dedos, pulgar no
            return !dedos.pulgar && dedos.indice && dedos.medio && dedos.anular && dedos.menique;
        case 'A':
            // Puño cerrado pero con pulgar levantado
            return dedos.pulgar && !dedos.indice && !dedos.medio && !dedos.anular && !dedos.menique;
        case 'O':
        case 'PUÑO':
            // Puño cerrado, o dedos juntos haciendo O (Tio 3, Tomate 3)
            return !dedos.indice && !dedos.medio && !dedos.anular && !dedos.menique;
        case 'TRES':
            // Indice, medio y anular
            return !dedos.pulgar && dedos.indice && dedos.medio && dedos.anular && !dedos.menique;
        default:
            return false;
    }
};

export const validarSeniaEspecifica = (landmarksSecuencia, seniaObjetivo) => {
    if (!landmarksSecuencia || landmarksSecuencia.length < 2) return false;

    // Convertir landmarks a estados de los dedos y guardar landmarks crudos para geometria avanzada
    const frames = landmarksSecuencia.map(l => {
        return { dedos: analizarMano(l), landmarks: l };
    });

    // Funciones auxiliares para buscar patrones
    const buscarForma = (forma) => frames.some(f => esForma(f.dedos, forma, f.landmarks));

    // Nueva función que puede buscar 2, 3 o más pasos en orden
    const buscarSecuencia = (...formas) => {
        let currentIndex = -1;
        for (const forma of formas) {
            const nextIndex = frames.findIndex((f, idx) => {
                if (idx <= currentIndex) return false;
                if (Array.isArray(forma)) {
                    return forma.some(formaUnica => esForma(f.dedos, formaUnica, f.landmarks));
                }
                return esForma(f.dedos, forma, f.landmarks);
            });
            if (nextIndex === -1) return false;
            currentIndex = nextIndex; // Avanzamos el índice para buscar el siguiente paso DESPUÉS de este
        }
        return true;
    };

    switch (seniaObjetivo) {
        case 'V':
        case 'K':
        case 'Morado':
        case 'Viernes':
            return buscarForma('V');

        case 'Hola':
            // Para la presentación: Súper flexible. Con que la IA detecte la mano abierta (los 4 dedos) 
            // en CUALQUIERA de las 3 fotos, te dará el Correcto. Ya no exige medir la distancia.
            return buscarForma('ABIERTA');

        case 'Hermana':
            // La seña tiene 2 pasos: Forma "V" en la barbilla -> Forma "A" (Pulgar arriba)
            // Usamos la misma red de seguridad: si logra ver claramente CUALQUIERA de los 2, aprueba.
            return buscarForma('V') || buscarForma('A') || buscarForma('PUÑO');

        case 'Tuyo':
            // Originalmente pedía Índice -> Mano Abierta.
            // Le aplicamos la misma red de seguridad: con que capte una de las dos, aprueba.
            return buscarForma('INDICE') || buscarForma('ABIERTA');

        case 'Banco':
            return buscarForma('BANCO');

        case 'Tomate':
            // Red de seguridad: con que capte el Índice o el Puño, aprueba.
            return buscarForma('INDICE') || buscarForma('PUÑO') || buscarForma('O');

        case 'Tres':
            return buscarForma('TRES');

        default:
            return frames.some(f => f.dedos !== null);
    }
};
