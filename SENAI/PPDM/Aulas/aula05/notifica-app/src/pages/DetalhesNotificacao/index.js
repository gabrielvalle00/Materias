import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';


export default function DetalhesNotificacao() {
  const route = useRoute();
  const navigation = useNavigation();


  // console.log(route.params);

  const [mensagem, setMensagem] = useState(route.params?.data.bodyMessage)
  const [titulo, setTitulo] = useState(route.params?.data.titleMessage);
  const [data, setData] = useState(new Date(route.params?.data.date).toLocaleString());

// const dataa = new Date(data).toLocaleString();
// console.log(dataa);


  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.androidSafeArea}>
    <View style={styles.androidSafeArea}>
      <View style={styles.container}>

        <View style={[styles.viewTitle,{alignItems: 'center'}]}>
          <Text style={styles.title}>Detalhes da notificação</Text>
        </View>
        <View style={styles.viewTitle}>
        <Text style={styles.title}>Título:</Text>
          <Text style={styles.text}>{titulo}</Text>
        </View>
        <View style={styles.viewTitle}>
        <Text style={styles.title}>Mensagem:</Text>
          <Text style={styles.text}>{mensagem}</Text>
        </View>
        <View style={styles.viewTitle}>
        <Text style={styles.title}>Data:</Text>
          <Text style={styles.text}>{data}</Text>
        </View>


        <TouchableOpacity
          style={styles.buttonSalvar}
        >
          <Text style={styles.buttonTitle}>Excluir notificação</Text>
          <FontAwesome name='trash' size={32} color="#000" />
        </TouchableOpacity>
        {/* <Button title="Adicionar" onPress={salvarRegistro} /> */}

      </View>
    </View>

    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {

    width: '95%',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10,
    borderRadius: 2,
    elevation: 5,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewTitle: {
    // alignItems: 'center',
    alignContent: 'center',
    width: '100%'
  },
  clienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  dropDown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonSalvar: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    // width: "100%",
    backgroundColor: "#FCAC17",
    borderRadius: 8,
    elevation: 5,
    shadowOpacity: 1,
    shadowColor: 'black',
    shadowRadius: 5,
    gap: 10,
    padding: 10,
  },
  buttonTitle: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold"
  },

});
