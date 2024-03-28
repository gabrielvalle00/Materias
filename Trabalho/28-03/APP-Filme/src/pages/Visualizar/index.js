import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { buscarFilmes, deletarFilme, initDatabase, inserirFilme } from '../../database/database.js'; // Importe a função inserirFilme
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;

const VisualizarFilmesScreen = () => {
    useEffect(() => {
        initDatabase();
        carregarFilmes(); // Carrega os filmes quando o componente é montado
    }, []);

    const [filmes, setFilmes] = useState([]);
    const navigation = useNavigation();

    const carregarFilmes = async () => {
        try {
            const resultado = await buscarFilmes('');
            setFilmes(resultado.rows._array);
        } catch (error) {
            console.error('Erro ao carregar filmes:', error);
            Alert.alert('Erro', 'Falha ao carregar filmes. Por favor, tente novamente.');
        }
    };

    const navegaEditar = (filme) => {
        navigation.navigate('EditarFilme', filme);
    };

    const handleExcluirFilme = async (id) => {
        Alert.alert(
            'Excluir Filme',
            'Tem certeza de que deseja excluir este filme?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            await deletarFilme(id);
                            carregarFilmes(); // Atualiza a lista de filmes após a exclusão
                        } catch (error) {
                            console.error('Erro ao excluir filme:', error);
                            Alert.alert('Erro', 'Falha ao excluir filme. Por favor, tente novamente.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { width: windowWidth * 0.8 }]}>
            <FontAwesome6 name="film" size={60} color="#000" style={styles.filmIcon} />
            <Text style={styles.text}>Nome: {item.nome_filme}</Text>
            <Text style={styles.text}>Gênero: {item.genero}</Text>
            <Text style={styles.text}>Classificação: {item.classificacao}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navegaEditar(item)} style={styles.button}>
                    <FontAwesome6 name="pencil" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirFilme(item.id)} style={styles.button}>
                    <FontAwesome6 name="trash-alt" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filmes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 5,
        alignItems: 'center',
    },
    filmIcon: {
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
    },
});

export default VisualizarFilmesScreen;