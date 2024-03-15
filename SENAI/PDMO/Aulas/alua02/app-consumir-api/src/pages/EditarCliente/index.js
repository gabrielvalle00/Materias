import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCliente() {
    const navigation = useNavigation();
    const route = useRoute();


    const [txtId, setTxtId] = useState(route.params?.id);
    const [txtNome, setTxtNome] = useState(route.params?.nome);
    const [txtIdade, setTxtIdade] = useState(route.params?.idade);


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const exibeAlert = () => {
        setShowAlert(true);
    }

    const editarCliente = async () => {

        try {
            if (txtNome == '' || txtNome == null) {
                setAlertMessage('Preencha corretamente o Nome')
                exibeAlert();
                return;
            }
            if (isNaN(txtIdade)) {
                setAlertMessage('O valor digitado para idade está incorreto')
                exibeAlert();
                return;
            }
            if (txtIdade == '' || txtIdade == null || txtIdade < 1) {
                setAlertMessage('Informe uma idade maior que zero')
                exibeAlert();
                return;
            }

            const response = await api.put(`/clientes/${txtId}`, { nome: txtNome, idade: Number(txtIdade) })
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
                if (response.data[0].changedRows == 1) {
                    setAlertMessage('Cliente alterado com Sucesso!');
                    setTxtId('');
                    setTxtNome('');
                    setTxtIdade('');
                    exibeAlert();
                    
                } else {
                    console.log('O registro não foi alterado, verifique e tente novamente');
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>

                <Text style={styles.title}>Edite os campos abaixo:</Text>

            </View>

            <Text>ID</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtId.toString()}
                onChangeText={setTxtId}
                readOnly

            />

            <Text>Nome do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtNome}
                onChangeText={setTxtNome}

            />


            <Text>Idade do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtIdade.toString()}
                onChangeText={setTxtIdade}

            />


            <TouchableOpacity
                onPress={() => { editarCliente() }}
                style={styles.alignVH}>

                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>Salvar</Text>

            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {
                            text: 'OK', onPress: () => {
                                setShowAlert(false);
                                navigation.navigate('TodosClientes', { status: true });

                            }
                        }
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