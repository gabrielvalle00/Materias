import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Sobre from '../pages/Sobre';
import StackRoutes from './satckRoutes';
import Contato from '../pages/Contato';



const Tab = createBottomTabNavigator();

export default function Routes() {


  return (


      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8e7cc3',
        tabBarInactiveTintColor: 'white',
        tabBarStyle:{
          backgroundColor:'black'

        }
      }}
      >

        <Tab.Screen
          name='HomeStack'
          component={StackRoutes}
          options={{
            tabBarLabel:'Início',
            headerTintColor: '#8e7cc3',

            headerStyle: {
              backgroundColor: '#fff'
            },

            tabBarIcon:({color, size}) => {
              return <FontAwesome name='rebel' color={color} size={size}></FontAwesome>
                          
            }
            // headerShown:false
          }}
        />


        {
          <Tab.Screen
            name='Sobre'
            component={Sobre}
            options={{

              title: 'Sobre',
              headerTintColor: 'green',

                  
              headerShown:false,
             

              tabBarIcon:({color, size}) => {
                return <FontAwesome name='twitch' color={color} size={size}></FontAwesome>
                  

                
              }

            }}
          />
        }


        {
          <Tab.Screen
            name='Contato'
            component={Contato}
            options={{
              title: 'Contato',
              headerTintColor: 'green',
              headerStyle: {
                backgroundColor: '#fff'
              },
                
              headerShown:false,
              
              tabBarIcon:({color, size}) => {
                return <FontAwesome name='users' color={color} size={size}></FontAwesome>
                  
                
                
              }

              

            }}
          />
        }
             

      </Tab.Navigator>
      
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
