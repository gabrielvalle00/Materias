import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Animated, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { inserirFilme, initDatabase } from '../../database/database.js';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const CadastroFilmeScreen = () => {
    useEffect(() => {
        initDatabase();
    }, []);

    const navigation = useNavigation();

    const [nomeFilme, setNomeFilme] = useState('');
    const [genero, setGenero] = useState('');
    const [classificacao, setClassificacao] = useState('Livre');
    const [animacao] = useState(new Animated.Value(0));

    const handleInserirFilme = async () => {
        try {
            await inserirFilme(nomeFilme, genero, classificacao);
            Alert.alert('Sucesso', 'Filme inserido com sucesso.');
            setNomeFilme('');
            setGenero('');
            setClassificacao('Livre');
            navigation.navigate('VisualizarFilmes'); // Navega para a tela de visualização após a inserção
        } catch (error) {
            console.error('Erro ao inserir filme:', error);
            Alert.alert('Erro', 'Falha ao inserir filme. Por favor, tente novamente.');
        }
    };

    const fadeIn = () => {
        Animated.timing(animacao, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    fadeIn();

    return (
        <Animated.View style={[styles.container, { opacity: animacao }]}>
            <View style={styles.card}>
                <Text style={styles.title}>Cadastro de Filme</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Filme"
                    value={nomeFilme}
                    onChangeText={setNomeFilme}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Gênero"
                    value={genero}
                    onChangeText={setGenero}
                />
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Classificação:</Text>
                    <Picker
                        selectedValue={classificacao}
                        onValueChange={(itemValue) => setClassificacao(itemValue)}
                        style={styles.dropdown}
                    >
                        <Picker.Item label="Livre" value="Livre" />
                        <Picker.Item label="10 anos" value="10 anos" />
                        <Picker.Item label="12 anos" value="12 anos" />
                        <Picker.Item label="14 anos" value="14 anos" />
                        <Picker.Item label="16 anos" value="16 anos" />
                        <Picker.Item label="18 anos" value="18 anos" />
                    </Picker>
                </View>
                <Animated.View style={[styles.buttonContainer, { opacity: animacao }]}>
                    <Button title="Inserir Filme" onPress={handleInserirFilme} />
                </Animated.View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: windowWidth * 0.9,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    dropdownContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default CadastroFilmeScreen;
