import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente() {
    const [nome, setNome] = useState('');
    const [telCelular, setTelCelular] = useState('');
    const [telFixo, setTelFixo] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [buttonScale] = useState(new Animated.Value(1)); // Para animação do botão

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const salvarCliente = async () => {
        try {
            // Lógica de validação omitida para simplificar

            const response = await api.post('/clientes', { nome, telefone_celular: telCelular, telefone_fixo: telFixo, email })
                .catch(function (error) {
                    // Tratamento de erro omitido para simplificar
                });

            if (response && response.data[0].affectedRows === 1) {
                setAlertMessage('Cliente cadastrado com Sucesso!');
                setNome('');
                setTelCelular('');
                setTelFixo('');
                exibeAlert();
            } else {
                console.log('O registro não foi inserido, verifique e tente novamente');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleButtonPress = () => {
        // Animação do botão ao pressionar
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

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [{ text: 'OK', onPress: () => setShowAlert(false) }]
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
        justifyContent: 'center',
        marginBottom:300
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
