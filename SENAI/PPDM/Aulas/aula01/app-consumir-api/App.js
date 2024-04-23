import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import api from './src/services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [idCli, setIdCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false);


  const getCliente = async (id) => {
    try {
      if (id => 0) {
        const response = await api.get(`/clientes/${id}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              if ((error.request._response).includes('Failed')) {
                console.log('Erro ao conectar com a API');
              }
            } else {
              console.log('Erro: ', error.message);
            }
          });

        if (response != undefined) {
          if (response.data.length === 0) {
            setCliente([])
            setShowAlert(true)
          } else {
            setCliente(response.data)
          }

        }

      } else {
        setCliente([])
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput style={styles.textInput}
        placeholder='ID Clientes'
        value={idCli.toString()}
        onChangeText={setIdCli}
      >

      </TextInput>

      <TouchableOpacity
        onPress={() => getCliente(idCli)}
        style={styles.botao}
      >

        <Text style={{ color: 'white' }}> Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text style={styles.t}>ID</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.id.toString()}></TextInput>
      <Text style={styles.t}>Nome</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.nome}></TextInput>
      <Text style={styles.t}>Idade</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.idade.toString()}></TextInput>


      {showAlert &&
        (Alert.alert('Informação', 'Registro não foi localizado na base de dados',
          [
            { text: 'OK', onPress: () => setShowAlert(false) }
          ]))
      }

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
    gap: 10,
  },
  botao: {

    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    backgroundColor: 'orange',
    borderColor: 'black',
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 5,
    height: 40,
    width: '80%',

  },
  t: {
    gap: 2,
    textAlign: 'left',
    color: 'orange'
  }
});
