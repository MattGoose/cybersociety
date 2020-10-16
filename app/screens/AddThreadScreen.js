import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {Icon} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Firebase from 'firebase';
import {Formik} from 'formik';
import * as yup from 'yup';
import {globalStyles} from '../style/Styles';

let Username = '';
let postId = '';

const ThreadWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    {/* <Text>{label}</Text> */}
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const ThreadInput = ({label, formikProps, formikKey, ...rest}) => {
  return (
    <ThreadWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </ThreadWrapper>
  );
};

const AddThreadSchema = yup.object().shape({
  threadTitle: yup
    .string()
    .label('Title')
    .required('Title is required')
    .min(10, 'Title must 10+ characters')
    .max(80, 'Title is too long'),
  postBody: yup
    .string()
    .label('Post')
    .required('Post cannot be empty')
    .min(1, 'Post cannot be empty')
    .max(500, 'Post cannot exceed 500 characters'),
});

export default function AddThreadScreen({navigation}) {
  const [selectedValue, setSelectedValue] = useState('Training');
  const date = new Date();
  const uid = Firebase.auth().currentUser.uid;
  const threadId = Firebase.database().ref('threads').push().key;

  Firebase.database()
    .ref('users/' + uid)
    .on('value', (snapshot) => {
      const user = snapshot.val();
      if (user) {
        Username = user.username;
      }
    });

  function addThread(values) {
    return Firebase.database()
      .ref('threads/' + threadId)
      .set({
        threadId: threadId,
        threadTitle: values.threadTitle,
        threadTopic: values.threadTopic,
        dateStamp: [
          date.getDate(),
          date.getMonth() + 1,
          date.getFullYear(),
        ].join('/'),
        timeStamp: [
          date.getHours(),
          (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        ].join(':'),
        createdBy: Username,
        uid: uid,
      })
      .then(
        Firebase.database()
          .ref('userThreads/' + uid + '/' + threadId)
          .set({
            threadId: threadId,
            threadTitle: values.threadTitle,
            threadTopic: values.threadTopic,
            dateStamp: [
              date.getDate(),
              date.getMonth() + 1,
              date.getFullYear(),
            ].join('/'),
            timeStamp: [
              date.getHours(),
              (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
            ].join(':'),
            createdBy: Username,
            uid: uid,
          })
          .then(
            (postId = Firebase.database()
              .ref('threads/' + threadId + '/posts/')
              .push().key),
          )
          .then(
            Firebase.database()
              .ref('threads/' + threadId + '/posts/' + postId)
              .set({
                postId: postId,
                postBody: values.postBody,
                dateStamp: [
                  date.getDate(),
                  date.getMonth() + 1,
                  date.getFullYear(),
                ].join('/'),
                timeStamp: [
                  date.getHours(),
                  (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
                ].join(':'),
                postedBy: Username,
                posterId: uid,
              }),
          ),
      );
  }

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <Formik
          initialValues={{
            threadTitle: '',
            postBody: '',
          }}
          onSubmit={(values, actions) => {
            console.log({values, selectedValue});
            Keyboard.dismiss();
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
            Alert.alert('Thread has been created.', 'Get to posting!', [
              {text: 'OK', onPress: () => navigation.goBack()},
            ]);
            addThread({
              threadTitle: values.threadTitle,
              threadTopic: selectedValue,
              postBody: values.postBody,
            });
          }}
          validationSchema={AddThreadSchema}>
          {(formikProps) => (
            <React.Fragment>
              <View style={globalStyles.addThreadContainer}>
                <ThreadInput
                  label="Title:"
                  formikProps={formikProps}
                  formikKey="threadTitle"
                  placeholder="Thread title"
                />
                <Text style={globalStyles.label}>Thread type:</Text>
                <Picker
                  mode="dialog"
                  prompt="Select an option"
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemPosition) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Training" value="Training" />
                  <Picker.Item label="Jobs" value="Jobs" />
                  <Picker.Item label="Courses" value="Courses" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
                <ThreadInput
                  label="Body:"
                  formikProps={formikProps}
                  formikKey="postBody"
                  placeholder="Post body"
                  multiline
                />
                <View style={globalStyles.addThreadButtonContainer}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="purple" />
                  ) : (
                    <TouchableOpacity
                      style={globalStyles.purpleButton}
                      onPress={formikProps.handleSubmit}>
                      <Text style={globalStyles.purpleButtonText}>
                        Submit discussion!
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
