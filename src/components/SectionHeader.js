import React, {components, createRef, useRef, useState} from 'react';
import {
  TextInput as RNInput,
  Platform,
  StyleSheet,
  Text,
  TouchableSensitivity,
  View,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import {Button} from 'react-native-elements';

import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  getResWidth,
  getResHeight,
  wp,
  hp,
} from '../utility/responsive';
import theme from '../utility/theme';
import { textColorHandler } from './commonHelper';

const SectionHeader = props => {
  const { titleTextStyle , sectionTitle} = props;
  return (
    <View
      style={[
        {
        //   marginTop: '5%',
        //   flexDirection: 'row',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        },
        props.containerStyle,
      ]}>
      <Text
        style={[
          {
        
            color: textColorHandler(),
            fontSize: getFontSize(16),
            fontFamily: theme.font.semiBold,
                      },
        //   titleTextStyle,
        ]}>
        {sectionTitle}
      </Text>
      
    </View>
  );
};

export default SectionHeader;
// export default React.memo(SectionHeader);
