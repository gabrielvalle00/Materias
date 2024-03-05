import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    
    Toast.show({
      type: 'success',
      text1: 'Obrigado por acessar nossa página!',
      visibilityTime: 3000, 
    });
  };

  return (
  
    <ImageBackground
      source={require('./assets/fundo.jpg')}
      style={styles.container}
    >
      <ScrollView>
      <View style={styles.overlay}>
        <Text style={styles.label}>Nome de Usuário:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <Text style={styles.label}>Senha:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordIcon}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {}
      <Image source={require('./assets/Git-Icon-White.png')} style={styles.icon} />

      <Toast ref={(ref) => Toast.setRef(ref)} />
      </ScrollView>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    paddingTop: 200,
    borderRadius: 30,
    borderWidth: 1,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center', 
    position: 'absolute', 
    top: 50, 
  },
  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    color: '#fff',
  },
  showPasswordIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
