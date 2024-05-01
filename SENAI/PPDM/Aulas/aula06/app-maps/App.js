import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import {
  requestForegroundPermissionsAsync, // Solicita ao usuário a permissão para utilizar a localização
  getCurrentPositionAsync, // Quando autorizado nos retorna a posição do usuário
  watchPositionAsync, // Observa mudança na localização da posição
  LocationAccuracy,
  geocodeAsync,

} from 'expo-location';
import { styles } from "./src/styles/styles";


export default function App() {
  const [location, setLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');

  const mapRef = useRef(null);

  // Solicita ao usuário a permissão para acessar a localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    // Caso o resultado da variável 'granted' seja true, a posição atual é retornada para a variável 'currentPosition'

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      const { coords: { latitude, longitude } } = currentPosition
      setLocation({ latitude, longitude });

      mapRef.current?.animateCamera({
        pitch: 70,
        center: { latitude, longitude }
      })

      // Exibindo no console as informações da posição atual
      console.log(`LOCALIZAÇÃO ATUAL => `, currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, []);





  const searchCoordinates = async (address) => {
    try {
      const result = await geocodeAsync(address);
      console.log('result', result);
      if (result && result.length > 0) {
        const { latitude, longitude } = result[0];

        setLocation({ latitude, longitude });

        mapRef.current?.animateCamera({
          pitch: 70,
          center: { latitude, longitude }
        })
      } else {
        console.log('Endereço não encontrado');
      }
    } catch (error) {
      console.log('Erro ao converte endereço:', error);
    }
  };




  return (
    <View style={styles.container}>
      {
        // Renderiza o componente caso a variável esteja definida, ou seja, diferente de null. '&&' é um operador lógico utilizado em JavaScript para avaliação condicional.
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
          />
        </MapView>
      }
      <View style={styles.searchContainer}>

        <View style={styles.searchInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Digite o endereço"
            value={searchAddress}
            onChangeText={(text) => setSearchAddress(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => searchCoordinates(searchAddress)}>
            <FontAwesome6 name='magnifying-glass' size={26} color='#BDC9DE' />

          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}