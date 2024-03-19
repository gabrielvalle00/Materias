import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente() {
    const [nome, setNome] = useState('');
    const [telCelular, setTelCelular] = useState('');
    const [telFixo, setTelFixo] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const exibeAlert = () => {
        setShowAlert(true);
    }

    const salvarCliente = async () => {

        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o Nome')
                exibeAlert();
                return;
            }
            if (telCelular.lenght === 11 || telFixo.lenght === 10) {
                setAlertMessage('O valor digitado para está incorreto')
                exibeAlert();
                return;
            }


            const response = await api.post('/clientes', { nome: nome, telefone_celular: telCelular, telefone_fixo: telFixo, email: email })
                .catch(function (error) {
                    if (error.response) {
                        console.error(error.response.data);
                        console.error(error.response.status);
                        console.error(error.response.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._response).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (response != undefined) {
                if (response.data[0].affectedRows == 1) {
                    setAlertMessage('Cliente cadastrado com Sucesso!');
                    setNome('');
                    setIdade(0);
                    exibeAlert();

                } else {
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


            <Text>Telefone Celular do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={telCelular}
                onChangeText={setTelCelular}

            />

            <Text>Telefone Fixo do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={telFixo}
                onChangeText={setTelFixo}

            />


            <Text>E-mail do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={email}
                onChangeText={setEmail}

            />


            <TouchableOpacity
                onPress={() => { salvarCliente() }}
                style={styles.alignVH}>

                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>Salvar</Text>

            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
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
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 35,
        borderRadius: 5,
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