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

    const salvarCliente = async () => {

        try {
            if (nome == '' || idade == '' || nome == null || idade == null || idade < 1) {
                setAlertMessage('Preencha corretamente os campos')
                return;
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
                value={idade}
                onChangeText={setIdade}

            />


            <TouchableOpacity
                onPress={() => { salvarCliente() }}
                style={styles.alignVH}>

                <Text>Salvar</Text>

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
        alignItems: 'center',
        justifyContent: 'center',
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