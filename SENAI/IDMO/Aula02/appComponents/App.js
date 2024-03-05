import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, SafeAreaView, Platform, Pressable, TextInput } from 'react-native';
import Saudacao from './components/Saudacao';


const logo = require('./assets/favicon.png')
export default function App() {
  return (
    <SafeAreaView style={[styles.androidSafeArea, { flex: 1, backgroundColor: 'black', textAlign: 'center', alignItems: 'center' }]}>


      <ScrollView style={{ textAlign: 'center', padding: 10, }}>

      <View style={styles.container}>
        <Text style={styles.labelInput}>Campo 1</Text>
        <TextInput placeholder='campo 1' style={styles.input}></TextInput>
        <Text style={styles.labelInput}>Campo 2</Text>
        <TextInput placeholder='campo 2' style={styles.input}></TextInput>
      </View>


      <View style={styles.separador}></View>
        <View style={styles.alinharHorizontal}>
          <Button title='Botão 1' color='midnightblue' onPress={() => Alert.alert('Eu sou um alert!')}></Button>
          <Button title='Botão 2' color='red' onPress={() => Alert.alert('Título de alerta', 'Eu sou um alert!')}></Button>
          <Button title='Botão 3' color='orange' onPress={() => Alert.alert('Título do alert 3', 'Eu sou um alert!',
          [
            {
              text:'Cancelar',
              onPress:()=>console.log('Botão cancelar prencionado')
            },
            {
              text:'Ok',
              onPress:()=>console.log('Botão ok prencionado')
            }

          ])}></Button>
        </View>

        <View style={styles.separador}></View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'violet' : 'purple',
              width: 60,
              height: 20,
              textAlign: 'center',
              alignItems: 'center',
              borderRadius: 20,
            },
            styles.button,

          ]}
          onPress={() => Alert.alert('Botão pressionado!')}>
          <Text style={{ color: 'white' }}>Button</Text>
        </Pressable>
        <View style={styles.separador}></View>
        <Saudacao style={{ color: 'white', marginTop: 40, }} name={'Valle'} />
        <Image source={logo} style={{ backgroundColor: 'lightblue', borderRadius: 25, marginTop: 25, marginBottom: 15, }}></Image>
        <View style={styles.separador}></View>

        <Image source={{ uri: 'https://picsum.photos/970' }} style={{ width: 400, height: 150, borderRadius: 30, }} />
        <View style={styles.separador}></View>
        <Text style={{ padding: 20, alignItems: 'center', color: 'white' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>

        <View style={[styles.lightgreenBox, styles.borderMargin]}>
          <Text style={{ color: 'darkgreen', textAlign: 'center', marginTop: 30, }}></Text>
          <Button title='(ˉ﹃ˉ)' onPress={() => Alert.alert('Seja bem vindo')}></Button>
        </View>

        <View style={[styles.lightblueBox, styles.borderMargin]}>
          <Text style={{ color: 'darkblue', textAlign: 'center', marginTop: 30, }}></Text>
          <Button style={{ alignItems: 'center', justifyContent: 'center', padding: 60, }} title='(⌐■_■)' onPress={() => Alert.alert('Óla!')}></Button>
        </View>
        <View style={styles.separador}></View>


        <StatusBar style='inverted' />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  lightgreenBox: {
    backgroundColor: 'lightgreen',
    width: 120,
    height: 120,
    marginTop: 15,
    marginLeft: 50,



  },
  lightblueBox: {
    backgroundColor: 'lightblue',
    width: 120,
    height: 120,
    marginLeft: 240,
    marginTop: -140,


  },
  borderMargin: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',

  },
  separador: {
    width: '100%',
    backgroundColor: 'gray',
    height: 1,
    margin: 5,
  },
  alinharHorizontal: {
    flexDirection: 'row',
    width:'100%',
    gap: 10,
    marginLeft: 70,
  },
  input:{
    width:'70%',
    height:40,
    borderWidth:1,
    padding:10,
    fontSize:20,
    borderRadius:10,
    color:'#fff',
    borderColor:'#fff', 
   },
   labelInput: {
    fontSize:18,
    marginBottom:1, 
    color:'#fff',
    }
});
