import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sobre from './src/pages/Sobre';
import Home from './src/pages/Home';
import Contato from './src/pages/Contato';



const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home',
            headerTintColor: 'green',

            headerStyle: {
              backgroundColor: 'black'
            },

            // headerShown:false

          }}
        />


        {
          <Stack.Screen
            name='Sobre'
            component={Sobre}
            options={{
              title: 'Sobre',
              headerTintColor: 'green',
              headerStyle: {
                backgroundColor: 'black'
              }

            }}
          />
        }


        {
          <Stack.Screen
            name='Contato'
            component={Contato}
            options={{
              title: 'Contato',
              headerTintColor: 'green',
              headerStyle: {
                backgroundColor: 'black'
              }

            }}
          />
        }


      </Stack.Navigator>
      <StatusBar style='inverted' />
    </NavigationContainer>
  );
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
