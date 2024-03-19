import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const navagaPesquisaID = () => {
        navigation.navigate('DetalhesCliente');
    };

    const navegaNovoCliente = () => {
        navigation.navigate('NovoCliente');
    };

    const navegaTodosClientes = () => {
        navigation.navigate('TodosClientes');
    };

    return (
        <SafeAreaView style={styles.container}>

          

            <View style={styles.card}>
                <Image source={require('../../assets/Id.png')} style={styles.cardImage} />
                <TouchableOpacity style={styles.button} onPress={navagaPesquisaID}>
                    <Text style={styles.buttonText}>Pesquisar por Cliente</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image source={require('../../assets/cadastrar.png')} style={styles.cardImage} />
                <TouchableOpacity style={styles.button} onPress={navegaNovoCliente}>
                    <Text style={styles.buttonText}>Cadastrar Novo Cliente</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image source={require('../../assets/todos.png')} style={styles.cardImage} />
                <TouchableOpacity style={styles.button} onPress={navegaTodosClientes}>
                    <Text style={styles.buttonText}>Exibir Todos os Clientes</Text>
                </TouchableOpacity>
            </View>
            
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width:'75%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        width: 120,
        height: 100,
        marginBottom: 10,
        marginLeft: 80
    },
    button: {
        backgroundColor: 'purple',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 12,
        marginLeft: 45,
        fontWeight: 'bold',
        color: 'white',
    },
});
