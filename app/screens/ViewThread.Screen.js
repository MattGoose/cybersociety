import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import 'firebase/database';
import {globalStyles} from '../style/Styles';

export default class ViewThreadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // postList: null,
      postList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const threadDetails = this.props.route.params;
    const ref = Firebase.database().ref(
      '/threads/' + threadDetails.threadId + '/posts',
    );
    ref.on('value', (snapshot) => {
      const object = snapshot.val();
      if (!object) {
        console.log('NO DATA FOUND:', Date(Date.now()));
        this.setState({postList: null});
      } else {
        console.log('DATA RETRIEVED:', Date(Date.now()));
        const dataArray = Object.values(object);
        this.setState({postList: dataArray});
      }
    });
  };

  render() {
    //stores thread data from last page
    const threadDetails = this.props.route.params;
    return (
      <View style={{backgroundColor: 'lightgrey', flex: 1}}>
        <View style={globalStyles.addPostContainer}>
          <TouchableOpacity
            style={globalStyles.addPostButton}
            onPress={() =>
              this.props.navigation.navigate('AddPost', threadDetails)
            }>
            <View style={globalStyles.iconMarginCommunity}>
              <Text style={globalStyles.whiteButtonText}>Add post </Text>
              <Icon
                name="add-outline"
                color={'purple'}
                size={24}
                type="ionicon"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{textAlign: 'center'}}>
            This thread was created by{' '}
            <Text style={{fontStyle: 'italic'}}>{threadDetails.createdBy}</Text>{' '}
            at {threadDetails.timeStamp} on {threadDetails.dateStamp}
          </Text>
        </View>
        {!this.state.postList ? (
          <View
            style={{
              alignItems: 'center',
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <Text style={globalStyles.noPostText}>
              There seems to be no posts yet... press the button above to get
              the discussion started!
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(fire) => fire.postId}
            data={this.state.postList.sort((a) => a.dateStamp.localeCompare())}
            renderItem={({item: fire}) => (
              <View style={globalStyles.viewThreadContainer}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text>
                      <Text
                        style={{
                          color: 'purple',
                          fontSize: 18,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        {fire.postedBy}
                      </Text>
                      {'\n\n'}
                      <Text style={{fontSize: 18}}>{fire.postBody}</Text>
                      {'\n\n'}
                      <Text style={{fontWeight: 'bold'}}>
                        {fire.dateStamp} | {fire.timeStamp}
                      </Text>
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
