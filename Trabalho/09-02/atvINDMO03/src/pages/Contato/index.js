import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Card } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Paragraph } from 'react-native-paper';

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
      <Card containerStyle={styles.cardContainer} elevation={6}>
        <View style={styles.formContainer}>

        <Paragraph style={styles.paragraph}>
          Nos dê o seu feedback!
        </Paragraph>


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
      </Card>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    borderRadius: 10,
    marginTop: -200,
  },
  formContainer: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  mensagemContainer: {
    marginBottom: 10,
  },
  mensagemInput: {
    height: 120,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',  
  },
});
