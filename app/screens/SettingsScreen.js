import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Firebase from 'firebase';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../style/Styles';

export default function Settings({navigation}) {
  //executes when user presses Logout button
  function LogOut() {
    try {
      Firebase.auth().signOut();
      console.log('USER LOGGED OUT SUCCESSFULLY:', Date(Date.now()));
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View style={globalStyles.screenContainer}>
      {/* <TouchableOpacity style={globalStyles.settingsButton}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>TEST </Text>
          <Icon name="hammer-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('YourThreads')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Your threads</Text>
          <Icon name="list-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('About')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>About </Text>
          <Icon
            name="information-circle-outline"
            color={'red'}
            size={24}
            type="ionicon"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('TC')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Terms & conditions </Text>
          <Icon
            name="document-outline"
            color={'red'}
            size={24}
            type="ionicon"
          />
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('ReportBug')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Report a bug </Text>
          <Icon name="bug-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('EditAccount')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Edit account</Text>
          <Icon name="hammer-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => navigation.navigate('DeleteAccount')}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Delete account</Text>
          <Icon name="trash-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.settingsButton}
        onPress={() => {
          Alert.alert(
            'Are you sure you wish to log out?',
            'You can always log back in.',
            [
              {
                text: 'Yes, log out.',
                onPress: () => LogOut(),
              },
              {
                text: 'No, go back.',
              },
            ],
          );
        }}>
        <View style={globalStyles.iconMargin}>
          <Text style={globalStyles.whiteButtonText}>Logout</Text>
          <Icon name="log-out-outline" color={'red'} size={24} type="ionicon" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
