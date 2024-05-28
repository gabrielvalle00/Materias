import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, ImageBackground, Alert, StyleSheet } from 'react-native';
import * as Medialibrary from 'expo-media-library';
import { styles } from './src/styles';
import { FontAwesome6 } from '@expo/vector-icons';

export default function App() {
  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(false); //inicializa a camera
  const [capturedImage, setCapturedImage] = useState(null); //captura a imagem
  const [flashMode, setFlashMode] = useState('off'); //liga/desliga o flash
  const [facing, setFacing] = useState('back'); //troca para a camera traseira
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  //função para iniciar a camera
  const IniciarCamera = async () => {
    if (permission.granted) {
      setStartCamera(true);
    } else {
      Alert.alert('Acesso negado');
    }
  };

  //função para tirar a foto
  const takePicture = async () => {

    try{
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);

      setCapturedImage(photo.uri);
    } catch (error) {
      console.log(error);
    }

  };

  //chama a função savePhoto
  useEffect(() => {

    if(capturedImage) {
      savePhoto();
    }

  }, [capturedImage]);

  //função para salvar a foto assim que a imagem for atribuida ao 'useState' 'setCaptureImage'
  const savePhoto = async () => {

    const asset = await Medialibrary.createAssetAsync(capturedImage)
    .then(() => {
      Alert.alert('Foto salva com sucesso!')
    }).catch(error => {
      console.log(error);
    })

  };

  //liga e desliga o flash do celular
  const handleFlashMode = async () => {
    

  };

  //alternar entre camera frontal e traseira
  const toggleCameraFacing = async () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));

  };

  // //as permissoes da camera ainda estão carregando
  // if (!permission) {

  // };

  // //as permissoes da camera não foram concedidas
  // if (!permission.granted) {

  // };

  return (
    <View style={styles.container}>

      {startCamera ? (

        <View style={styles.containerStartCamera}>

          <CameraView facing={facing} flash={flashMode} ref={cameraRef} style={{ flex: 1 }}> 

            <View style={styles.containerPrincipalCameraView}>

              <View style={styles.containerSecundarioCameraView}>

                <TouchableOpacity style={styles.buttonFlash} onPress={handleFlashMode}>

                  {flashMode === 'off' ?
                    <FontAwesome6 name='bolt' size={24} color='#fff' /> :
                    <FontAwesome6 name='bolt' size={24} color='#DBC800' />
                  }

                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonAlternarCamera} onPress={toggleCameraFacing}>
                  <FontAwesome6 name='camera-rotate' size={24} color='#fff' />
                </TouchableOpacity>

              </View>

              {/* Take Picture */}
              <View style={styles.containerPrincipalTakePicture}>

                <View style={styles.containerTakePicture}>
                  <TouchableOpacity onPress={takePicture} style={styles.buttonTakeCapture} />
                </View>

              </View>

            </View>

          </CameraView>

        </View>
      ) : (

        //iniciar camera
        <View style={styles.container}>

          <TouchableOpacity onPress={IniciarCamera} style={styles.buttonIniciarCamera}>

            <Text style={styles.textButtonIniciarCamera}>Iniciar camera</Text>

          </TouchableOpacity>

        </View>

      )}

    </View>
  )

}