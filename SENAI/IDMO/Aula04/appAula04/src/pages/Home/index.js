import { SafeAreaView, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'



export default function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style = {styles.container}>
            <Text>Tela Homes</Text>
            <Button title='Abrir página SOBRE' onPress={() => navigation.navigate('Sobre')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
