import {View, Text, Image} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function CustomDrawer(props){
    return(
        <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            source={require('../assets/perfil.png')} 
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', marginBottom:35 }}>Njube</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    )
}