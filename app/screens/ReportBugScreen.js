import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
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
import {Formik} from 'formik';
import * as yup from 'yup';
import ReportBug from '../database/ReportBug';
import {globalStyles} from '../style/Styles';

const BugWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const BugInput = ({formikProps, formikKey, ...rest}) => {
  return (
    <BugWrapper formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.placeholderText}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </BugWrapper>
  );
};

//client-side validation with yup
const reportSchema = yup.object().shape({
  bugDescription: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description.')
    .max(100, 'Description too long.'),
});

export default function ReportBugScreen({navigation}) {
  const [selectedValue, setSelectedValue] = useState('Performance');
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={globalStyles.settingsContainer}>
          <Formik
            initialValues={{bugDescription: ''}}
            onSubmit={(values, actions) => {
              Alert.alert('The bug has been logged for review.', 'Thank you.', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Settings'),
                },
              ]);
              console.log({selectedValue, values});
              Keyboard.dismiss();
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 2000);
              ReportBug({
                bugDescription: values.bugDescription,
                bugType: selectedValue,
              });
            }}
            validationSchema={reportSchema}>
            {(formikProps) => (
              <React.Fragment>
                <View>
                  <Text style={globalStyles.label}>Report type:</Text>
                  <Picker
                    mode="dialog"
                    prompt="Select an option"
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemPosition) =>
                      setSelectedValue(itemValue)
                    }>
                    <Picker.Item
                      label="Performance i.e. crashes, stutters"
                      value="Performance"
                    />
                    <Picker.Item
                      label="Functionality i.e. broken links, buttons"
                      value="Functionality"
                    />
                    <Picker.Item
                      label="Display i.e. screens not showing, messy UI"
                      value="Display"
                    />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                  <BugInput
                    formikProps={formikProps}
                    formikKey="bugDescription"
                    placeholder="Write bug description here..."
                    multiline
                  />
                  <View style={globalStyles.settingsButtonContainer}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" color="purple" />
                    ) : (
                      <TouchableOpacity
                        style={globalStyles.whiteButton}
                        onPress={formikProps.handleSubmit}>
                        <Text style={globalStyles.whiteButtonText}>
                          Submit Report
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
