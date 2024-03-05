import { SafeAreaView, Text, StyleSheet, Button, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'




export default function Sobre() {
    const navigation = useNavigation();
    const route = useRoute();

    const navegaContato = () => {
        navigation.navigate('Contato')
    }

    return (
        <SafeAreaView style = {styles.container}>

            <Text style = {{color:'black'}}>Tela SOBRE</Text>

            <TextInput style = {{color:'black'}} value={route.params?.nome}></TextInput>
            <TextInput style = {{color:'black'}} value={route.params?.email}></TextInput>

            <Button title='Ir para o contato' onPress={navegaContato}></Button>


        </SafeAreaView>
    )
}


// export default function Sobre({route}) {
//     const navigation = useNavigation();

//     return (
//         <SafeAreaView style = {styles.container}>

//             <Text style = {{color:'#fff'}}>Tela SOBRE</Text>

//             <TextInput style = {{color:'#fff'}} value={route.params?.nome}></TextInput>
//             <TextInput style = {{color:'#fff'}} value={route.params?.email}></TextInput>

//         </SafeAreaView>
//     )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap:15,
    },
});
