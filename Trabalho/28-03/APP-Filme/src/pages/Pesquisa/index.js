import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { buscarFilmes } from '../../database/database.js';
import { Ionicons } from '@expo/vector-icons';

const PesquisarFilmesScreen = () => {
    const [nomeFilme, setNomeFilme] = useState('');
    const [genero, setGenero] = useState('');
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        if (nomeFilme === '' && genero === '') {
            setFilmes([]); // Limpa a lista de filmes se não houver critérios de pesquisa
            return;
        }

        const buscarFilmesPorNomeGenero = async () => {
            try {
                const resultado = await buscarFilmes(nomeFilme, genero);
                setFilmes(resultado.rows._array);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
                Alert.alert('Erro', 'Falha ao buscar filmes. Por favor, tente novamente.');
            }
        };

        buscarFilmesPorNomeGenero();
    }, [nomeFilme, genero]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>Nome: {item.nome_filme}</Text>
            <Text style={styles.text}>Gênero: {item.genero}</Text>
            <Text style={styles.text}>Classificação: {item.classificacao}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do filme"
                value={nomeFilme}
                onChangeText={setNomeFilme}
            />
            <FlatList
                data={filmes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="film-outline" size={100} color="#ccc" />
                        <Text style={styles.emptyText}>Nenhum filme encontrado</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    listContainer: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#555',
        marginTop: 10,
    },
});

export default PesquisarFilmesScreen;
