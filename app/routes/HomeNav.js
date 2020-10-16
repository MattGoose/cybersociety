import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Cyber Society"
        component={Home}
        options={{headerTitleAlign: 'center', headerTitle: 'Profile'}}
      />
    </Stack.Navigator>
  );
}
