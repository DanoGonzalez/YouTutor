import { Image, StyleSheet, Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Login from '@/components/Login';
import Register from '@/components/Register';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName ="Bienvenidos">
      <Stack.Screen name='Bienvenido' component={Register}/>
      <Stack.Screen name='Inventario' component={ThemedView}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({

});