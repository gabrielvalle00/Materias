import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sobre from './src/pages/Sobre';
import Home from './src/pages/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
        name ='Home'
        component={Home}
        />


        {
          <Stack.Screen
          name='Sobre'
          component={Sobre}
          />
        }

      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
