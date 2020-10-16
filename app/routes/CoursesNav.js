import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Courses from '../screens/CoursesScreen';

const Stack = createStackNavigator();

export default function CoursesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}
