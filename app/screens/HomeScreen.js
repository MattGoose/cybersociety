import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../style/Styles';

export default function Home() {
  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.logoLoginContainer}>
        <Image
          style={{width: 185, height: 158, marginTop: 20}}
          source={require('../images/placeholder.png')}
        />
        <Text style={{color: 'black'}}>(Cyber Society placeholder image)</Text>
        <Text style={globalStyles.logoTag}>Cyber Society</Text>
      </View>
    </View>
  );
}
