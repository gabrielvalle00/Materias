import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import {  useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notificacoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const [allNotifications, setAllNotifications] = useState(route.params?.itens);

  // console.log('Vamos imprimir: ',allNotifications);

  const handlePress = (dados) => {
    console.log('View pressionada!', dados);
    navigation.navigate('DetalhesNotificacao', {
      data: dados,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Clique em uma notificação para visualizar o conteúdo:</Text>
      {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}

      <ScrollView contentContainerStyle={styles.containerScroll}>
        {allNotifications.data.map(notif => (

          <Pressable key={notif.date} onPress={() => handlePress(notif)} style={{ width: '95%' }}>
            <View style={[styles.containerFilmes]}>
              <View style={styles.clienteItem}>
            
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{notif.titleMessage}</Text>

              </View>
            </View>
          </Pressable>

        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10,
    paddingTop: 20
  },
  containerFilmes: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    gap: 3,
    // borderRadius: 2,
    elevation: 5,
    marginTop: 5
  },
  containerScroll: {
    flexGrow: 1,
    // flex:1,
    width: windowWidth,
    // backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    gap: 5,

},
});