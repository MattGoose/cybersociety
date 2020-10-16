import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Community from '../screens/CommunityScreen';
import AddThreadScreen from '../screens/AddThreadScreen';
import ViewThreadScreen from '../screens/ViewThread.Screen';
import AddPostScreen from '../screens/AddPostScreen';

const Stack = createStackNavigator();

export default function CommunityNav({route}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{headerTitleAlign: 'center', headerTitle: 'Community'}}
      />
      <Stack.Screen
        name="AddThread"
        component={AddThreadScreen}
        options={{headerTitleAlign: 'center', headerTitle: 'Create new thread'}}
      />
      <Stack.Screen
        name="ViewThread"
        component={ViewThreadScreen}
        options={({route}) => ({title: route.params.threadTitle})}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{headerTitleAlign: 'center', headerTitle: 'Add new post'}}
      />
    </Stack.Navigator>
  );
}
