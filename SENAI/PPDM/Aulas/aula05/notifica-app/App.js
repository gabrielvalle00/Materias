import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState, useRef } from 'react';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shoulPlaySound: true,
    shouldSetBadge: true,
    ios: {
      AllowAlert: true,
      allowBadge: true,
      allowSound: true,
    }
  }),
});


export default function App() {
  const [expoToken, setExpoToken] = useState('');
  const notificationReceivedRef = useRef([]);
  const notificationResponseRef = useRef();




  useEffect(() => {
    rigisterForPushNotificationsAsync().then(token => setExpoToken(token));

    notificationReceivedRef.current = Notifications.addNotificationReceivedListener(notificaion => {
      console.log('notificação recebida: ', notificaion);

    });

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log('notificação clicada: ', notification);
    });

  }, []);

  async function handleNotification() {
    schendulePushNotification();
  };




  return (
    <View style={styles.container}>
      <Text>Trabalhando com notificação no Expo!</Text>
      <Button
        title='Enviar notificação local'
        onPress={async () => {
          await handleNotification();
        }}
      />
      <Text>{expoToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}


async function schendulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Notificação local',
      body: 'Este é um teste de notificação local acionado imediatamente após o clique do botão',

      //title: 'Notificação local',
      //body: 'Este é um teste de uma notificação local com temporizador exibida apos o tempo determinado',
    },
    // trigger: null,
    trigger: { seconds: 5 },
  });
}


async function rigisterForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Você não possui permissão para receber notificações!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId: '6906f1a5-6e3c-4feb-b2c4-199742119072' })).data;
  console.log(token);
  return token;
}





















const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
