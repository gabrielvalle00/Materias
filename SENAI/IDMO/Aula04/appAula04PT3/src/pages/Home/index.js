import { SafeAreaView, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'



export default function Home() {
    const navigation = useNavigation();
    function navegaSobre() {
        navigation.navigate('Sobre', { nome: 'Del Valle', email: 'gabrivalle8@gmail.com' })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'black' }}>Tela Home</Text>
            <Button title='Abrir página SOBRE' onPress={navegaSobre} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap:15,
    },
});
