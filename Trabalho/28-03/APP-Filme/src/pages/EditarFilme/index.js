import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editarFilme } from '../../database/database.js';
import { Picker } from '@react-native-picker/picker';

const EditarFilmeScreen = () => {
    const route = useRoute();
    const item = route.params;
    const navigation = useNavigation();

    const [nomeFilme, setNomeFilme] = useState(item.nome_filme);
    const [genero, setGenero] = useState(item.genero);
    const [classificacao, setClassificacao] = useState(item.classificacao);
    const [dataInsercao, setDataInsercao] = useState(item.dataInsercao);

    const handleSalvarEdicao = async () => {
        try {
            await editarFilme(item.id, nomeFilme, genero, classificacao, dataInsercao);
            Alert.alert('Sucesso', 'Filme atualizado com sucesso.');
            
            
            setNomeFilme(nomeFilme);
            setGenero(genero);
            setClassificacao(classificacao);
            setDataInsercao(dataInsercao);

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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    dropdownContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold', 
    },
    dropdown: {
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
