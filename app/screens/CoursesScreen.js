import React from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../style/Styles';

export default function Courses() {
  return (
    <View style={globalStyles.screenContainer}>
      <TouchableOpacity
        style={globalStyles.coursesButton}
        onPress={() =>
          Linking.openURL('https://www.edx.org/search?q=cyber%20security')
        }>
        <Image
          style={globalStyles.coursesImage}
          source={require('../images/edx.jpg')}
        />
        <Text>
          <Text style={{fontWeight: 'bold'}}>edX</Text>
          {'\n'}Access 2500+ courses{'\n'}
          from 140 institutions,{'\n'}including Harvard,{'\n'}MIT and more!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.coursesButton}
        onPress={() =>
          Linking.openURL(
            'http://www.open.ac.uk/courses/choose/cyber-security?ps_kw=cyber%20security%20courses&cid=sem-9908678911&gclid=CjwKCAjw1ej5BRBhEiwAfHyh1Hq0p3FUTfws9kt2xl8YZEg_sA9uxJO74mQcE4aLx1fju4K27diE8RoC0wcQAvD_BwE&gclsrc=aw.ds',
          )
        }>
        <Image
          style={globalStyles.coursesImage}
          source={require('../images/tou.jpg')}
        />
        <Text>
          <Text style={{fontWeight: 'bold'}}>The Open University</Text>
          {'\n'}Innovative, award-winning{'\n'}education - providing{'\n'}over 2
          million students{'\n'}with qualifications.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.coursesButton}
        onPress={() =>
          Linking.openURL(
            'https://www.ncsc.gov.uk/information/certified-training',
          )
        }>
        <Image
          style={globalStyles.coursesImage}
          source={require('../images/ncsc.jpg')}
        />
        <Text>
          <Text style={{fontWeight: 'bold'}}>NCSC</Text>
          {'\n'}The NCSC Certified{'\n'}Training Scheme provides{'\n'}a
          benchmark for cyber{'\n'}security training.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
