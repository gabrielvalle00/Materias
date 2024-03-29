import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDatabase } from '../../database/database.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Home() {
    useEffect(() => {
        initDatabase();
    }, []);

    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bem-vindo ao Aplicativo de Catálogo de Filmes</Text>
                </View>
                
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Ação</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 1</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 2</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 3</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>


                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Comedia</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 1</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 2</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 3</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>


                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Terror & Suspense</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 1</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 2</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 3</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>


                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Aventura</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 1</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 2</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 3</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>


                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Romance</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 1</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 2</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Filme 3</Title>

                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>



            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    card: {
        width: 150,
        height: 250,
        backgroundColor: 'white',
        marginBottom: 10,
        marginRight: 10,
    },
});
