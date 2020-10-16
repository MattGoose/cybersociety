import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import 'firebase/database';
import {globalStyles} from '../style/Styles';

export default class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const ref = Firebase.database().ref('/threads');
    ref.on('value', (snapshot) => {
      const object = snapshot.val();
      if (!object) {
        console.log('NO DATA FOUND:', Date(Date.now()));
        this.setState({threadList: null});
      } else {
        console.log('DATA RETRIEVED:', Date(Date.now()));
        const dataArray = Object.values(object);
        this.setState({threadList: dataArray});
      }
    });
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={globalStyles.communityContainer}>
          <TouchableOpacity
            style={globalStyles.communityButton}
            onPress={() => this.props.navigation.navigate('AddThread')}>
            <View style={globalStyles.iconMarginCommunity}>
              <Text style={globalStyles.purpleButtonText}>
                Start a discussion!{' '}
              </Text>
              <Icon
                name="add-circle-outline"
                color={'white'}
                size={24}
                type="ionicon"
              />
            </View>
          </TouchableOpacity>
        </View>
        {!this.state.threadList ? (
          <View style={{alignItems: 'center'}}>
            <Text style={globalStyles.noThreadText}>
              Odd... there seems to be nothing here
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(fire) => fire.threadId}
            // data={this.state.threadList}
            data={this.state.threadList.sort((a) =>
              a.dateStamp.localeCompare(),
            )}
            renderItem={({item: fire}) => (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={globalStyles.threadButton}
                  onPress={() =>
                    this.props.navigation.navigate('ViewThread', fire)
                  }>
                  <View style={globalStyles.iconMargin}>
                    <Text>
                      <Text style={globalStyles.threadButtonText}>
                        {fire.threadTitle}
                      </Text>
                      {'\n'}
                      Topic: {fire.threadTopic}
                      {/* | Posts: */}
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
