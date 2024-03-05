import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import StackRoutes from './satckRoutes';
import Sobre from '../pages/Sobre';
import Home from '../pages/Home';
import Contato from '../pages/Contato';



const Tab = createBottomTabNavigator();

export default function Routes() {


  return (

      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: '#a9a9a9',
        tabBarStyle:{
          backgroundColor:'white'

        }
      }}
      >

        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home',
            headerShown:false,

            tabBarIcon:({color, size}) => {
              return <FontAwesome name='home' color={color} size={size}></FontAwesome>
                
              
              
            }

            

          }}
        />


        {
          <Tab.Screen
            name='Sobre'
            component={StackRoutes}
            options={{

              title: 'Cursos',     
              headerTintColor: 'red',
             
              tabBarIcon:({color, size}) => {
                return <FontAwesome name='graduation-cap' color={color} size={size}></FontAwesome>
                  

                
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
              headerTintColor: 'red',
              
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
