import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importando telas
import Home from './src/pages/Home'
import Notificacoes from './src/pages/Notificacoes';
import DetalhesNotificacao from './src/pages/DetalhesNotificacao';

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
            headerStyle: {
              backgroundColor: '#2ceef0',
            },
          }}
          
        />

        <Stack.Screen
          name='Notificacoes'
          component={Notificacoes}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#2ceef0',
            },
          }}
        />


          <Stack.Screen
          name='DetalhesNotificacao'
          component={DetalhesNotificacao}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#2ceef0',
            },
          }}
        />  

      </Stack.Navigator>
    </NavigationContainer>

  );
}
