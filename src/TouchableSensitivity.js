import { TouchableNativeFeedback, Platform, TouchableOpacity } from 'react-native';
import React from 'react';

const TouchableSensitivity = ({ props, color }) => {
  if (Platform.OS === 'ios') {
    return <TouchableOpacity onPress={props.onPress}>{props.children}</TouchableOpacity>;
  } else {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(color ? color : 'rgba(0,0,0,0.3)')}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableNativeFeedback>
    );
  }
};

export default TouchableSensitivity;
