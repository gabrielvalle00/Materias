import { Platform, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight} from 'react-native-status-bar-height'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%'
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  searchInput: {
    width: '83%',
    flexDirection: 'row',
    height: 40,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
    padding: 5,
    paddingRight: 40,
    marginTop: 40,
    marginLeft: 40
  },
  searchButton: {
    padding: 7,
    position: 'absolute',
    right: 0,
    transform: [{ rotate: '90deg' }]
  }
});