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
    const [txtTelCelular, setTxtTelCelular] = useState(route.params?.telefone_celular)
    const [txtTelFixo, setTxtTelFixo] = useState(route.params?.telefone_fixo);
    const [txtEmail, setTxtEmail] = useState(route.params?.email);


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
            if (txtTelCelular.lenght === 11 || txtTelFixo.lenght === 10) {
                setAlertMessage('O valor digitado para está incorreto')
                exibeAlert();
                return;
            }

            const response = await api.put(`/clientes/${txtId}`, { nome: txtNome, telefone_celular: txtTelCelular, telefone_fixo: txtTelFixo, email: txtEmail })
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
                    setTxtTelCelular('');
                    setTxtTelFixo('');
                    setTxtEmail('');
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


            <Text>Telefone Celular do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtTelCelular.toString()}
                onChangeText={setTxtTelCelular}

            />

            <Text>Telefone Fixo do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtTelFixo.toString()}
                onChangeText={setTxtTelFixo}

            />

            <Text>Telefone Fixo do Cliente</Text>
            <TextInput style={styles.caixaDeTexto}
                value={txtEmail.toString()}
                onChangeText={setTxtEmail}

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
        backgroundColor: 'purple',
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