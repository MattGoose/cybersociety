import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import CommunityNav from './CommunityNav';
import CoursesNav from './CoursesNav';
import HomeNav from './HomeNav';
import SettingsNav from './SettingsNav';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'purple',
        inactiveTintColor: 'grey',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="home" size={24} type="ionicon" />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesNav}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="school" size={24} type="ionicon" />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityNav}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="people" size={24} type="ionicon" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNav}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="settings" size={24} type="ionicon" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
