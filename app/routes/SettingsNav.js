import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/SettingsScreen';
import YourThreads from '../screens/YourThreadsScreen';
import About from '../screens/AboutScreen';
import TC from '../screens/TCScreen';
import ReportBug from '../screens/ReportBugScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';

const Stack = createStackNavigator();

export default function SettingsNav() {
  return (
    <Stack.Navigator initialRouteName={Settings}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="YourThreads"
        component={YourThreads}
        options={{headerTitleAlign: 'center', headerTitle: 'Your threads'}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'About Cyber Society',
        }}
      />
      <Stack.Screen
        name="TC"
        component={TC}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Terms & conditions',
        }}
      />
      <Stack.Screen
        name="ReportBug"
        component={ReportBug}
        options={{headerTitleAlign: 'center', headerTitle: 'Report a bug'}}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccountScreen}
        options={{headerTitleAlign: 'center', headerTitle: 'Edit your account'}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Delete your account',
        }}
      />
    </Stack.Navigator>
  );
}
