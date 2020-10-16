import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from '../style/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import DeleteUser from '../database/DeleteAccount';
import Firebase from 'firebase';

const DeleteWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const DeleteInput = ({formikProps, formikKey, ...rest}) => {
  return (
    <DeleteWrapper formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </DeleteWrapper>
  );
};

//client-side validation with yup
const deleteAccountSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter your registered email'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter your current password'),
});

export default class DeleteAccountScreen extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={globalStyles.settingsContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
              console.log(values);
              this.deletePosts();
              DeleteUser(values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              Keyboard.dismiss();
              Alert.alert('You deleted your account.', ':(', [
                {
                  text: 'OK',
                },
              ]);
            }}
            validationSchema={deleteAccountSchema}>
            {(formikProps) => (
              <React.Fragment>
                <View>
                  <DeleteInput
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Enter your email"
                  />
                  <DeleteInput
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                  <View style={globalStyles.settingsButtonContainer}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" color="#28A966" />
                    ) : (
                      <TouchableOpacity
                        style={globalStyles.whiteButton}
                        onPress={formikProps.handleSubmit}>
                        <Text style={globalStyles.whiteButtonText}>
                          Delete My Account
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
