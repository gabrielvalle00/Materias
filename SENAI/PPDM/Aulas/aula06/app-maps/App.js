import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';

import {
  requestForegroundPermissionsAsync, // Solicita ao usuário a permissão para utilizar a localização
  getCurrentPositionAsync, // Quando autorizado nos retorna a posição do usuário
  watchPositionAsync, // Observa mudança na localização da posição
  LocationAccuracy,

} from 'expo-location';
import { styles } from "./src/styles/styles";


export default function App() {
  const [location, setLocation] = useState(null);

  const mapRef = useRef(null);

  // Solicita ao usuário a permissão para acessar a localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    // Caso o resultado da variável 'granted' seja true, a posição atual é retornada para a variável 'currentPosition'

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition)
      // Exibindo no console as informações da posição atual
      console.log(`LOCALIZAÇÃO ATUAL => `, currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, []);

  return (
    <View style={styles.container}>
      {
        // Renderiza o componente caso a variável esteja definida, ou seja, diferente de null. '&&' é um operador lógico utilizado em JavaScript para avaliação condicional.
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />
        </MapView>
      }
    </View>
  );
}