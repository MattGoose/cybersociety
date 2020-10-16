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
import ResetPassword from '../database/ForgotPassword';
import {globalStyles} from '../style/Styles';

const ResetWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const ResetInput = ({formikProps, formikKey, ...rest}) => {
  return (
    <ResetWrapper formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </ResetWrapper>
  );
};

// client side validation with yup
const passwordSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
});

export default class ForgotPasswordScreen extends Component {
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
              initialValues={{email: ''}}
              onSubmit={(values, actions) => {
                ResetPassword(values, this.props.navigation);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
              validationSchema={passwordSchema}>
              {(formikProps) => (
                <React.Fragment>
                  <View>
                    <ResetInput
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Please enter your email"
                    />
                    <View style={globalStyles.authenticationButtonContainer}>
                      {formikProps.isSubmitting ? (
                        <ActivityIndicator size="large" color="purple" />
                      ) : (
                        <TouchableOpacity
                          style={globalStyles.purpleButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={globalStyles.purpleButtonText}>
                            SUBMIT
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
