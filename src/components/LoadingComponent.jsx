import React from 'react';
import {View} from 'react-native';
import {PulseIndicator} from 'react-native-indicators';

const LoadingComponent = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <PulseIndicator color="blue" />
  </View>
);

export default LoadingComponent;
