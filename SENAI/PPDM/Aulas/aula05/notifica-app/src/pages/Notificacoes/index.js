import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from "react-native";
import * as Notifications from 'expo-notifications';
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shoulPlaySound: false,
      shouldSetBadge: false,
      ios: {
        AllowAlert: true,
        allowBadge: true,
        allowSound: true,
      }
    }),
  });

export default function Notificacoes() {
    const navigation = useNavigation();
    const route = useRoute();
    const [allNotifications, setAllNotifications] = useRoute(route.params?.itens);

    return(
        <View>

        </View>
    )
}