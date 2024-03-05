import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/routes/index.js'

export default function App() {
  return (
    <SafeAreaProvider>
    
      <StatusBar barStyle={"dark-content"} />
      <NavigationContainer>


        <Routes />


        
      </NavigationContainer>
    </SafeAreaProvider>
  )
}