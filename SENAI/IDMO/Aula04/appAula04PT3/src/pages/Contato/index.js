import { SafeAreaView, Text, StyleSheet, Button, TextInput } from 'react-native'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'




export default function Contato() {

    const navigation = useNavigation();

  

    return (
        <SafeAreaView style = {styles.container}>

            <Text style = {{color:'black'}}>Tela Contato</Text>
            <Button  title='Voltar' onPress={()=> navigation.goBack()}></Button>

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
