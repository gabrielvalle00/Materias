import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDatabase } from '../../database/database.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function Home() {
    useEffect(() => {
        initDatabase();
    }, []);

    const navigation = useNavigation();

    function navegaDetalhes() {
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo ao Aplicativo de Compra de Filmes</Text>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={navegaDetalhes}>
                    <View style={styles.card}>
                        <Image source={require('../../assets/ka.jpg')} style={styles.cardImage} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={navegaDetalhes}>
                    <View style={styles.card}>
                        <Image source={require('../../assets/ka.jpg')} style={styles.cardImage} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={navegaDetalhes}>
                    <View style={styles.card}>
                        <Image source={require('../../assets/ka.jpg')} style={styles.cardImage} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    card: {
        width: 150,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
