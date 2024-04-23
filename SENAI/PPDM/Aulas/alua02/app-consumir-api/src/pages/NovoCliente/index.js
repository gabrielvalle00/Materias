import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const exibeAlert =() => {
        setShowAlert(true);
    }

    const salvarCliente = async () => {

        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o Nome')
                exibeAlert();
                return;
            }
            if(isNaN(idade)){
                setAlertMessage('O valor digitado para está incorreto')
                exibeAlert();
                return;
            }
            if (idade == '' || idade == null || idade < 1) {
                setAlertMessage('Informe uma idade maior que zero')
                exibeAlert();
                return;
            }

            const response = await api.post('/clientes', { nome: nome, idade: Number(idade) })
            .catch(function(error){
                if(error.response){
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.resquest) {
                    if((error.resquest._response).include('Failed')) {
                        console.log('Erro ao conectar com API');
                    }
                }else {
                    console.log(error.message);
                }
                console.log(error.config);
            });

            if(response != undefined){
                if(response.data[0].affectedRows == 1) {
                    setAlertMessage('Cliente cadastrado com Sucesso!');
                    setNome('');
                    setIdade(0);
                    exibeAlert();
                   
                }else{
                    console.log('O registro não foi inserido, verifique e tente novamente');
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>

                <Text style={styles.title}>Preencha os campos abaixo:</Text>

            </View>

            <Text>Nome do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={nome}
                onChangeText={setNome}

            />


            <Text>Idade do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={idade.toString()}
                onChangeText={setIdade}

            />


            <TouchableOpacity
                onPress={() => { salvarCliente() }}
                style={styles.alignVH}>

                <Text style={{color:'white', fontWeight: 'bold', fontSize: 20,}}>Salvar</Text>

            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {text:'OK', onPress: () => setShowAlert(false)}
                    ]
                )
            )}

            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },
    alignVH: {
        backgroundColor:'orange',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height:35,
        borderRadius:5,
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: '80%'
    },
    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }

});