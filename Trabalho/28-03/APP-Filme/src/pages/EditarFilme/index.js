import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editarFilme } from '../../database/database.js';

const EditarFilmeScreen = () => {
    const route = useRoute();
    const { filmeId } = route.params;
    const navigation = useNavigation();

    const [nomeFilme, setNomeFilme] = useState(route.params?.nome_filme);
    const [genero, setGenero] = useState(route.params?.genero);
    const [classificacao, setClassificacao] = useState(route.params?.classificacao);


    useEffect(() => {
        
        const buscarDetalhesFilme = async () => {
            try {
                
                setNomeFilme('Nome do Filme');
                setGenero('Gênero do Filme');
                setClassificacao('Classificação do Filme');
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme:', error);
                Alert.alert('Erro', 'Falha ao buscar detalhes do filme. Por favor, tente novamente.');
            }
        };

        buscarDetalhesFilme(); 
    }, [filmeId]);

    const handleSalvarEdicao = async () => {
        try {
            
            await editarFilme(filmeId, nomeFilme, genero, classificacao);
            Alert.alert('Sucesso', 'Filme atualizado com sucesso.');
            navigation.goBack(); 
        } catch (error) {
            console.error('Erro ao editar filme:', error);
            Alert.alert('Erro', 'Falha ao editar filme. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Filme</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Classificação"
                value={classificacao}
                onChangeText={setClassificacao}
            />
            <TouchableOpacity style={styles.button} onPress={handleSalvarEdicao}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default EditarFilmeScreen;
