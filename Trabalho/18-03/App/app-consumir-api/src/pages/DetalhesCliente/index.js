import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [nomeCli, setNomeCli] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        'Atenção!',
        alertMessage,
        [
          {
            text: 'OK',
            onPress: () => {
              setShowAlert(false);
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [showAlert]);

  const getCliente = async () => {
    try {
      if (!nomeCli.trim()) {
        setAlertMessage('Por favor, informe o nome do cliente.');
        setShowAlert(true);
        return;
      }

      const response = await api.get(`/clientes/${nomeCli.trim()}`);

      if (response.data.length === 0) {
        setAlertMessage('Registro não encontrado na base de dados. Por favor, verifique e tente novamente.');
        setShowAlert(true);
      } else {
        setCliente(response.data);
      }
    } catch (error) {
      console.error('Erro:', error.message);
      setAlertMessage('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Nome do Cliente'
        value={nomeCli}
        onChangeText={setNomeCli}
      />

      <TouchableOpacity
        onPress={getCliente}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>

      {cliente.length > 0 && (
        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>Informações do Cliente</Text>
          <Text>ID: {cliente[0]?.id}</Text>
          <Text>Nome: {cliente[0]?.nome}</Text>
          <Text>Telefone Celular: {cliente[0]?.telefone_celular}</Text>
          <Text>Telefone Fixo: {cliente[0]?.telefone_fixo}</Text>
          <Text>E-mail: {cliente[0]?.email}</Text>
        </View>
      )}

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
    paddingHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderRadius: 10,
    height: 40,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clientInfo: {
    marginTop: 20,
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  clientInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
});
