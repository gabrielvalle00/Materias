import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api/api';

export default function NovoCliente() {
    const [nome, setNome] = useState('');
    const [telCelular, setTelCelular] = useState('');
    const [telFixo, setTelFixo] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [buttonScale] = useState(new Animated.Value(1));

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const ocultAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {

        if (showAlert) {

            Alert.alert(
                'Atenção',
                alertMessage,
                [{ text: 'OK', onPress: () => ocultAlert(false) }]
            )
        }

    }, [showAlert])



    const salvarCliente = async () => {

        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o Nome')
                exibeAlert();
                return;
            }
            if (telCelular.length !== 11 || telFixo.length !== 10) {
                setAlertMessage('O valor digitado para telefone está incorreto')
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

                    setNome('');
                    setTelCelular('');
                    setTelFixo('');
                    setAlertMessage('Cliente cadastrado com Sucesso!');
                    exibeAlert();

                } else {
                    console.log('O registro não foi inserido, verifique e tente novamente');
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    const handleButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => salvarCliente());
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.card, { opacity: 1, transform: [{ scale: buttonScale }] }]}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>Preencha os campos abaixo:</Text>
                </View>

                <Text>Nome do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text>Telefone Celular do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={telCelular}
                    onChangeText={setTelCelular}
                />

                <Text>Telefone Fixo do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={telFixo}
                    onChangeText={setTelFixo}
                />

                <Text>E-mail do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    onPress={handleButtonPress}
                    style={styles.alignVH}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Cadastrar</Text>
                </TouchableOpacity>
            </Animated.View>


            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 300
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alignVH: {
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 35,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 75
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
    },
    cardTitle: {
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
