import React, {Component} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Firebase from 'firebase';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../style/Styles';

export default class YourThreadsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userThreadList: [],
    };
  }

  componentDidMount() {
    this.getUserThreads();
  }

  getUserThreads = () => {
    const uid = Firebase.auth().currentUser.uid;
    const userThreadRef = Firebase.database().ref('userThreads/' + uid);
    userThreadRef.on('value', (snapshot) => {
      const threadObject = snapshot.val();
      if (!threadObject) {
        console.log('USER HAS NO THREADS:', Date(Date.now()));
        this.setState({userThreadList: null});
      } else {
        console.log('USER POSTS RETRIEVED:', Date(Date.now()));
        const threadsArray = Object.values(threadObject);
        this.setState({userThreadList: threadsArray});
      }
    });
  };

  render() {
    return (
      <View style={{paddingTop: 20}}>
        {!this.state.userThreadList ? (
          <View>
            <Text>You have no threads</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(fire) => fire.threadId}
            // data={this.state.userThreadList}
            data={this.state.userThreadList.sort((a) =>
              a.dateStamp.localeCompare(),
            )}
            renderItem={({item: fire}) => (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={globalStyles.threadButton}
                  // onPress={() =>
                  //   this.props.navigation.navigate('ViewThread', fire)
                  // }
                >
                  <View style={globalStyles.iconMargin}>
                    <Text>
                      <Text style={globalStyles.threadButtonText}>
                        {fire.threadTitle}
                      </Text>
                      {'\n'}
                      Topic: {fire.threadTopic} | Posts:
                    </Text>
                    <Icon
                      name="eye-outline"
                      color={'black'}
                      size={24}
                      type="ionicon"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
