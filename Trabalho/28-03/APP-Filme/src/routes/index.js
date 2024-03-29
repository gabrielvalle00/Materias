import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createDrawerNavigator } from "@react-navigation/drawer";



import Adicionar from '../pages/Adicionar';
import StackRoutes from './satckRoutes';
import Editar from './editar';
import CustomDrawer from '../components/CustomDrawer';
import Pesquisa from '../pages/Pesquisa';
import Home from '../pages/Home';

const Drawer = createDrawerNavigator();

export default function Routes() {


  return (

    <Drawer.Navigator

      drawerContent={CustomDrawer}

    >

      <Drawer.Screen
        name='Home'
        component={StackRoutes}
        options={{
          drawerActiveTintColor: '#8e7cc3',
          drawerInactiveTintColor: 'black',
          drawerIcon: ({ color, size }) => {
            return <FontAwesome6 name='house' color={color} size={size}></FontAwesome6>

          }

        }}
      />

      <Drawer.Screen
        name='Adicionar'
        component={Adicionar}
        options={{
          drawerActiveTintColor: '#8e7cc3',
          drawerInactiveTintColor: 'black',
          drawerIcon: ({ color, size }) => {
            return <FontAwesome6 name='film' color={color} size={size}></FontAwesome6>

          }


        }}
      />

      <Drawer.Screen
        name='Visualizar'
        component={Editar}
        options={{
          drawerActiveTintColor: '#8e7cc3',
          drawerInactiveTintColor: 'black',
          drawerIcon: ({ color, size }) => {
            return <FontAwesome6 name='clapperboard' color={color} size={size}></FontAwesome6>

          }

        }}
      />


      <Drawer.Screen
        name='Pesquisar'
        component={Pesquisa}
        options={{
          drawerActiveTintColor: '#8e7cc3',
          drawerInactiveTintColor: 'black',
          drawerIcon: ({ color, size }) => {
            return <FontAwesome6 name='magnifying-glass' color={color} size={size}></FontAwesome6>

          }

        }}
      />





    </Drawer.Navigator>







  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'violet',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});
