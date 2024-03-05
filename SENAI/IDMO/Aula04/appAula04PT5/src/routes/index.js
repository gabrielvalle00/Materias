import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from "@react-navigation/drawer";



import Sobre from '../pages/Sobre';
import StackRoutes from './satckRoutes';
import Contato from '../pages/Contato';
import CustomDrawer from '../components/CustomDrawer';
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
          drawerActiveTintColor:'#8e7cc3',
          drawerInactiveTintColor:'black',
          drawerIcon:({color, size}) => {
            return <FontAwesome name='rebel' color={color} size={size}></FontAwesome>
                        
          }
          
        }}
      />

      <Drawer.Screen
       name='Sobre'
       component={Sobre}
       options={{
        drawerActiveTintColor:'#8e7cc3',
        drawerInactiveTintColor:'black',
        drawerIcon:({color, size}) => {
          return <FontAwesome name='twitch' color={color} size={size}></FontAwesome>
                      
        }
        
        
      }}
      />

      <Drawer.Screen
       name='Contato'
       component={Contato}
       options={{
        drawerActiveTintColor:'#8e7cc3',
        drawerInactiveTintColor:'black',
        drawerIcon:({color, size}) => {
          return <FontAwesome name='users' color={color} size={size}></FontAwesome>
                      
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
