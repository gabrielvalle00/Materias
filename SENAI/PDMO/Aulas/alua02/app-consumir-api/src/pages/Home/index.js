import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Home() {

    const navigation = useNavigation();

    const navagaPesquisaID = () => {
        navigation.navigate('DetalhesCliente')
    };

    const navegaNovoCliente = () => {
        navigation.navigate('NovoCliente')
    }

    const navegaTodosClientes = () =>{
        navigation.navigate('TodosClientes')
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style={ {color: 'black'}}>Seja bem vindo!</Text>
            <Button style={ {backgroundColor: 'black'} }title='Abrir pesquisa por ID' onPress={navagaPesquisaID}/>
            <Button title='Abrir cadastro cliente' onPress={navegaNovoCliente} />
            <Button title='Exibir todos os clientes' onPress={navegaTodosClientes}/>
            
            <StatusBar style="auto" />
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
});
