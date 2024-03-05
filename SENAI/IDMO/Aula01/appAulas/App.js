import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.titulo}>Olá mundo!</Text>
      <Text >Meu primeiro app mobile!!!</Text>
      <Button title='Clique aqui'onPress={()=>Alert.alert('Seja bem vindo')}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles  = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'purple',
  alignItems:'center',
  justifyContent:'center',
},
titulo:{
  color:'white'
}

});