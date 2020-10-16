import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import AuthNav from './routes/AuthNav';
import 'firebase/database';

export default class devcs extends Component {
  render() {
    LogBox.ignoreLogs(['Setting a timer']);
    //returns route check to see if user is logged in
    return <AuthNav />;
  }
}
