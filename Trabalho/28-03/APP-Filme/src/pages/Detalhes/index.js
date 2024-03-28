import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


export default function Detalhes(){
    return(
        <SafeAreaView style = {styles.container}>

            <Text>Gabriel Valle</Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
    },
  });
  