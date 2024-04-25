import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/pages/Home';
import Notificacoes from './src/pages/Notificacoes';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>

      <Stack.Navigator>
        <Stack.Screen name="Notificacoes" component={Notificacoes} options={{ headerShown: false }} />
      </Stack.Navigator>



    </NavigationContainer>



     
   
  )
}
