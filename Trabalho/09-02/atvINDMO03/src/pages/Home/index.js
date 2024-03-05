import { SafeAreaView, Text, StyleSheet, Button, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'



export default function Home() {

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/SENAI_logo.png')} style={{ width: 200, height: 50, marginBottom: 30, }} />
            <Text style={{ color: 'black' }}>Gabriel Valle</Text>
            <Text style={{ color: 'black' }}>Sumaré, 07/02/2024</Text>
            <Text style={{ color: 'black' }}>Escola SENAI Celso Charuri</Text>
            <Text style={{ color: 'black' }}>Técnico em Desenvolvimento de Sistemas</Text>
            <Text style={{ color: 'black' }}>INDMO - Interface para Dispositivos Móveis</Text>
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
