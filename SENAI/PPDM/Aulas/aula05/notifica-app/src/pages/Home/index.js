import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {
  const navigation = useNavigation();

  const [expoToken, setExpoToken] = useState(''); 
  const [notificationReceived, setNotificationReceived] = useState(null);
  const [allNotifications, setAllNotifications] = useState({ data: [] });

  // Refs to track notifications
  const notificationReceiveRef = useRef(null);
  const notificationResponseRef = useRef(null);

  useEffect(() => {
    // Register for push notifications
    const registerNotifications = async () => {
      const token = await registerForPushNotificationAsync();
      setExpoToken(token);
    };
    registerNotifications();

    // Add listeners for notification events
    notificationReceiveRef.current = Notifications.addNotificationReceivedListener(
      (notification) => setNotificationReceived(notification)
    );

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(
      (response) => console.log('Notificação clicada:', response.notification)
    );

    return () => {
      // Cleanup listeners when component unmounts
      if (notificationReceiveRef.current) {
        Notifications.removeNotificationSubscription(notificationReceiveRef.current);
      }
      if (notificationResponseRef.current) {
        Notifications.removeNotificationSubscription(notificationResponseRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (notificationReceived) {
      const { date, request: { content } } = notificationReceived;

      const dados = {
        date: date || new Date().toISOString(), // Default to current date if missing
        bodyMessage: content.body,
        titleMessage: content.title,
      };

      setAllNotifications((prevState) => ({
        ...prevState,
        data: [...prevState.data, dados],
      }));
    }
  }, [notificationReceived]);

  const notificacoes = () => {
    navigation.navigate('Notificacoes', { itens: allNotifications });
  };

  const handleNotificationLocal = async () => {
    await schedulePushNotification();
  };

  return (
    <View style={styles.container}>
      <Button
        title="Enviar notificação local"
        onPress={handleNotificationLocal}
      />
      <Button
        title="Exibir notificações"
        onPress={notificacoes}
      />
      <Text>Token Expo: {expoToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Notificação local',
      body: 'Este é um teste de notificação local acionado diretamente após o clique do botão.',
    },
    trigger: null, // Immediate notification
  });
}

async function registerForPushNotificationAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Você não tem permissão para receber notificações!');
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
