import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import SubmitLogin from '../database/Login';
import {globalStyles} from '../style/Styles';

const LoginWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const LoginInput = ({formikProps, formikKey, ...rest}) => {
  return (
    <LoginWrapper formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </LoginWrapper>
  );
};

//client-side validation via yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required('Please provide your email.'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter your password.'),
});

export default class LoginScreen extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <TouchableWithoutFeedback
          touchSoundDisabled={true}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={globalStyles.authenticationContainer}>
            <View style={globalStyles.logoLoginContainer}>
              <Image
                style={{width: 185, height: 158, marginTop: 20}}
                source={require('../images/placeholder.png')}
              />
              <Text style={{color: 'black'}}>
                (Cyber Society placeholder image)
              </Text>
              <Text style={globalStyles.logoTag}>Cyber Society</Text>
            </View>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                Keyboard.dismiss;
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
                SubmitLogin(values, this.props.navigation);
              }}>
              {(formikProps) => (
                <React.Fragment>
                  <View>
                    <LoginInput
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Email"
                    />
                    <LoginInput
                      formikProps={formikProps}
                      formikKey="password"
                      placeholder="Password"
                      secureTextEntry
                    />
                    <View style={globalStyles.authenticationButtonContainer}>
                      {formikProps.isSubmitting ? (
                        <ActivityIndicator size="large" color="purple" />
                      ) : (
                        <TouchableOpacity
                          style={globalStyles.purpleButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={globalStyles.purpleButtonText}>
                            LOGIN
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={globalStyles.whiteButton}
                        onPress={() =>
                          this.props.navigation.navigate('Register')
                        }>
                        <Text style={globalStyles.whiteButtonText}>
                          New user?
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={globalStyles.forgotPassword}
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassword')
                        }>
                        <Text style={globalStyles.forgotPasswordText}>
                          Forgot password?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </React.Fragment>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
