import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import ChangeUsername from '../database/ChangeUsername';
import ChangePassword from '../database/ChangePassword';
import {globalStyles} from '../style/Styles';

const EditWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const EditInput = ({formikProps, formikKey, ...rest}) => {
  return (
    <EditWrapper formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </EditWrapper>
  );
};

const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required('Username required (8 - 30 characters)')
    .min(8)
    .max(30),
});

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .label('Password')
    .required('Please enter your current password'),
  newPassword: yup
    .string()
    .label('New Password')
    .required('New password must be 8 - 20 characters')
    .min(8)
    .max(20),
  confirmPassword: yup
    .string()
    .required('Passwords must match')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    }),
});

export default class EditAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: Firebase.auth().currentUser.displayName,
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={globalStyles.settingsContainer}>
          <Formik
            initialValues={{
              username: this.state.Username,
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              ChangeUsername(values);
              Alert.alert(
                'Your username has been changed.',
                this.state.Username,
                [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.goBack(),
                  },
                ],
              );
              console.log(
                'USERNAME CHANGED SUCCESSFULLY:',
                this.state.Username,
                Date(Date.now()),
              );
            }}
            validationSchema={usernameSchema}>
            {(formikProps) => (
              <React.Fragment>
                <View>
                  <Text style={globalStyles.label}>Edit username:</Text>
                  <TextInput
                    //variable Username will be set to whatever is typed into this text input
                    onChangeText={(text) => this.setState({Username: text})}
                    value={this.state.Username}
                    style={globalStyles.placeholderText}
                  />
                  <View style={globalStyles.settingsButtonContainer}>
                    <TouchableOpacity
                      style={{...globalStyles.purpleButton, marginVertical: 30}}
                      onPress={formikProps.handleSubmit}>
                      <Text style={globalStyles.purpleButtonText}>
                        Change username
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>

          {/* new Formik - handles username and password edit seperately */}

          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => {
              ChangePassword(values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              Keyboard.dismiss();
              Alert.alert(
                'Your password was changed successfully.',
                'Thank you!',
                [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.goBack(),
                  },
                ],
              );
            }}
            validationSchema={changePasswordSchema}>
            {(formikProps) => (
              <React.Fragment>
                <View style={globalStyles.formField}>
                  <Text style={globalStyles.label}>Enter old password:</Text>
                  <EditInput
                    label="Current Password:"
                    formikProps={formikProps}
                    formikKey="currentPassword"
                    placeholder="Please enter your current password"
                    secureTextEntry
                  />
                  <Text style={globalStyles.label}>Enter new password:</Text>
                  <EditInput
                    label="New Password:"
                    formikProps={formikProps}
                    formikKey="newPassword"
                    placeholder="Please enter a new password"
                    secureTextEntry
                  />
                  <Text style={globalStyles.label}>Confirm new password:</Text>
                  <EditInput
                    label="Confirm Password:"
                    formikProps={formikProps}
                    formikKey="confirmPassword"
                    placeholder="Please confirm your new password"
                    secureTextEntry
                  />

                  <View style={globalStyles.submitButtonContainer}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" color="purple" />
                    ) : (
                      <View style={globalStyles.settingsButtonContainer}>
                        <TouchableOpacity
                          style={globalStyles.purpleButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={globalStyles.purpleButtonText}>
                            Change password
                          </Text>
                        </TouchableOpacity>
                      </View>
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
