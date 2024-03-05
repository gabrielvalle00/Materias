import { SafeAreaView, Text, StyleSheet, Button, TextInput } from 'react-native'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'




export default function Contato() {

    const navigation = useNavigation();

    const voltarHome = () => {
        navigation.dispatch(StackActions.popToTop())

    }

    return (
        <SafeAreaView style = {styles.container}>

            <Text style = {{color:'#fff'}}>Tela Contato</Text>
            <Button  title='Voltar' onPress={()=> navigation.goBack()}></Button>
            <Button  title='Voltar para Home' onPress={voltarHome}></Button>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        gap:15,
    },
});
