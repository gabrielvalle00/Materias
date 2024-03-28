import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VisualizarFilmesScreen from '../pages/Visualizar';
import EditarFilmeScreen from '../pages/EditarFilme';


const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen
                name='Visualizar'
                component={VisualizarFilmesScreen}
                options={{
                    headerShown:false,
                
                  }}
            />

            <Stack.Screen
                name='Editar'
                component={EditarFilmeScreen}
            />

        </Stack.Navigator>
    )
}