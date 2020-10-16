import React from 'react';
import {Icon} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
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

const PostWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    {/* <Text>{label}</Text> */}
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const PostInput = ({label, formikProps, formikKey, ...rest}) => {
  return (
    <PostWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </PostWrapper>
  );
};

const AddPostSchema = yup.object().shape({
  postBody: yup
    .string()
    .label('Post')
    .required('Post cannot be empty')
    .min(1, 'Post cannot be empty')
    .max(500, 'Post cannot exceed 500 characters'),
});

export default function AddPostScreen({navigation, route}) {
  const threadDetails = route.params;
  const date = new Date();
  const uid = Firebase.auth().currentUser.uid;

  Firebase.database()
    .ref('users/' + uid)
    .on('value', (snapshot) => {
      const user = snapshot.val();
      if (user) {
        Username = user.username;
      }
    });

  const key = Firebase.database()
    .ref('threads/' + threadDetails.threadId + '/posts/')
    .push().key;

  function addPost(values) {
    return Firebase.database()
      .ref('threads/' + threadDetails.threadId + '/posts/' + key)
      .set({
        postId: key,
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
      });
  }

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <Formik
          initialValues={{postBody: ''}}
          onSubmit={(values, actions) => {
            console.log({values});
            Keyboard.dismiss();
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
            Alert.alert('Post has been added.', 'Go back to thread.', [
              {text: 'OK', onPress: () => navigation.goBack()},
            ]);
            addPost({
              postBody: values.postBody,
            });
          }}
          validationSchema={AddPostSchema}>
          {(formikProps) => (
            <React.Fragment>
              <View style={globalStyles.addThreadContainer}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 5,
                  }}>
                  Posting to...{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {threadDetails.threadTitle}
                  </Text>
                </Text>
                <PostInput
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
                        Submit post
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
