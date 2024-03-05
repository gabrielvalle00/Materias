import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function Contato() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLoginPress = () => {
    Toast.show({
      type: 'success',
      text1: 'Obrigado pelo seu feedback!',
      visibilityTime: 3000,
    });
  };

  return (
    <SafeAreaView style={styles.container}>



 <View style={{marginTop: 100,}}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mensagemContainer}
      >
        <TextInput
          style={styles.mensagemInput}
          placeholder="Mensagem"
          onChangeText={(text) => setMensagem(text)}
          value={mensagem}
          multiline
        />
      </KeyboardAvoidingView>
      </View>

      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Enviar</Text>
      </TouchableOpacity>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  loginButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    height: 50,
    width: 90,
    marginLeft: 160,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginLeft: 40,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
    borderRadius: 20,
  },
  mensagemContainer: {
    width: '80%',
    marginLeft: 40,
    marginBottom: 10,

  },
  mensagemInput: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    textAlignVertical: 'top',
  },
});
