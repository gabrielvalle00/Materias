import React, { useState } from 'react';
import { ToastMessage } from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import api from './src/services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);

  const getCliente = async () => {
    try {
      const { data } = await api.get(`/clientes/6`);
      console.log(data);
      setCliente(data);

    } catch (error) {
      ToastMessage.show({
        type: 'error',
        text1: 'Erro',
        text2: 'ID não encontrado',
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => getCliente()}
        style={styles.botao}
      >
       
        
        <Text style={{ color: 'white' }}> Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text> ID do cliente:{cliente[0]?.id}</Text>
      <Text> Nome cliente:{cliente[0]?.nome}</Text>
      <Text> Idade cliente:{cliente[0]?.idade}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {

    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    backgroundColor: 'violet',
    borderColor: 'black',
    borderRadius: 5,
  }
});
