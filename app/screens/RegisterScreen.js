import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import SubmitRegister from '../database/Register';
import {globalStyles} from '../style/Styles';

const RegisterWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    {/* <Text style={globalStyles.label}>{label}</Text> */}
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const RegisterInput = ({formikProps, label, formikKey, ...rest}) => {
  return (
    <RegisterWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </RegisterWrapper>
  );
};

const RegisterSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <RegisterWrapper
    label={label}
    formikKey={formikKey}
    formikProps={formikProps}>
    <Switch
      trackColor={{false: 'maroon', true: 'purple'}}
      value={formikProps.values[formikKey]}
      onValueChange={(value) => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </RegisterWrapper>
);

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required('Username required (8 - 30 characters)')
    .min(8)
    .max(30),
  email: yup
    .string()
    .label('Email')
    .email('Please provide a valid email')
    .required('Please provide a valid email'),
  password: yup
    .string()
    .label('Password')
    .required('Password must be 8 - 20 characters')
    .min(8)
    .max(20),
  confirmPassword: yup
    .string()
    .required('Passwords must match')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      (value) => value === true,
    ),
});

export default class RegisterScreen extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <TouchableWithoutFeedback
          touchSoundDisabled={true}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={globalStyles.authenticationContainer}>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
              }}
              onSubmit={(values, actions) => {
                console.log(values);
                Keyboard.dismiss();
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
                SubmitRegister(values, this.props.navigation);
              }}
              validationSchema={registerSchema}>
              {(formikProps) => (
                <React.Fragment>
                  <View>
                    <RegisterInput
                      // label="Username:"
                      formikProps={formikProps}
                      formikKey="username"
                      placeholder="Username"
                    />
                    <RegisterInput
                      // label="Email:"
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Email"
                    />
                    <RegisterInput
                      // label="Password:"
                      formikProps={formikProps}
                      formikKey="password"
                      placeholder="Password"
                      secureTextEntry
                    />
                    <RegisterInput
                      // label="Confirm Password:"
                      formikProps={formikProps}
                      formikKey="confirmPassword"
                      placeholder="Confirm password"
                      secureTextEntry
                    />
                    <Text style={globalStyles.label}>
                      I have read and agree to the Terms:
                    </Text>
                    <RegisterSwitch
                      // label="I have read and agree to the Terms:"
                      formikKey="agreeToTerms"
                      formikProps={formikProps}
                    />
                    <View style={globalStyles.authenticationButtonContainer}>
                      {formikProps.isSubmitting ? (
                        <ActivityIndicator size="large" color="purple" />
                      ) : (
                        <TouchableOpacity
                          style={globalStyles.purpleButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={globalStyles.purpleButtonText}>
                            REGISTER
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
      </ScrollView>
    );
  }
}
