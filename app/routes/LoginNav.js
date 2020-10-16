import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabBar from './TabBar';

const Stack = createStackNavigator();

export default function LoginNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Tab" component={TabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
