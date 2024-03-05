import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Platform, SafeAreaView, Button, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons/'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'



export default function App() {
  return (
    <SafeAreaView style={[styles.androidSafeArea, styles.container]}>

      <View>

        {/* Ícone exibido em uma View com texto */}
        <View style={styles.alinharHorizontal}>
          <FontAwesome name='home' size={32} color='gray'></FontAwesome>
          <Text style={{ fontSize: 24 }}>Bem vindo ao início</Text>
        </View>

        <Text style={{ color: 'white' }} >Aula 03 - Trabalhando com ícones</Text>

        <StatusBar style='inverted' />

      </View>



      {/* Ícone e botão criado com a biblioteca padrão*/}
      <AntDesign.Button name='home' size={48} backgroundColor='green' borderRadius={20} onPress={() => Alert.alert('Você clicou no Antdesign Button')}>
        Home
      </AntDesign.Button>

      {/* Ícone e botão criado com a biblioteca FontAwesome*/}
      <FontAwesome.Button name='home' onPress={() => Alert.alert('Você clicou no Awesome Button')}>
        Home
      </FontAwesome.Button>

      {/* Ícone e botão criado com a biblioteca FontAwesome com link para abrir o Youtuben neste exemplo foi inserido um alert perguntando ao usuário*/}
      <FontAwesome.Button name='youtube' backgroundColor='red' onPress={() => Alert.alert('Link externo', 'Deseja abrir http://youtube.com?',
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Acessar',
            onPress: () => Linking.openURL('http://youtube.com')
          }
        ]
      )}>
        Abrir Youtube
      </FontAwesome.Button>

      {/* Ícone e botão criado com a biblioteca FontAwesome com link para abrir o Facebook*/}
      <FontAwesome.Button name='facebook' onPress={() => Linking.openURL('http://facebook.com')}>
        Abrir Facebook
      </FontAwesome.Button>

      {/* Ícone e botão criado com a biblioteca Feather com link para abrir o Github*/}
      <Feather.Button name='github' color='black' backgroundColor='gainsboro' onPress={() => Linking.openURL('https://github.com/izaiasmaia?tab=repositories')}>
        Abrir Github
      </Feather.Button>


      {/* Alinhando botão em linha ocupando o espaço disponível*/}
      <View style={[styles.alinharHorizontal, styles.container2]}>
        {/* Botão criado com TouchableOpacity */}
        <TouchableOpacity style={styles.btnSocialMedia}>
          <FontAwesome name='facebook' size={32}></FontAwesome>
          <Text style={styles.btnText}>Facebook</Text>
        </TouchableOpacity>

        {/* Botão criado com TouchableOpacity */}
        <TouchableOpacity style={styles.btnSocialMedia}>
          <Text style={styles.btnText}>Instagram</Text>
          <Feather name='instagram' size={32}></Feather>
        </TouchableOpacity>
      </View>

      {/* Botão ocupando 100% da tela*/}
      <View style={[styles.alinharHorizontal, styles.container2]}>
        {/* Botão criado com TouchableOpacity */}
        <TouchableOpacity style={[styles.btnSocialMedia, styles.vermelho]}>
          <FontAwesome name='youtube' size={32}></FontAwesome>
          <Text style={styles.btnText}>Youtube</Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  container: {
    flex: 1,
    gap:30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D1A39',
  },
  container2: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10
  },
  alinharHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  botao: {
    width: '100%',
  },
  btnSocialMedia: {
    flexBasis: '100%',
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ADD8E6',
    height: 45,

  },
  btnText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 26,
  }
});