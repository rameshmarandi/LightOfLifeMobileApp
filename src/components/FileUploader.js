import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {
  getResHeight,
  getFontSize,
  SCREENHEIGHT,
  SCREENWIDTH,
} from '../utility/responsive';
import {backgroundColorHandler, textColorHandler} from './commonHelper';
import {VectorIcon} from './VectorIcon';
import theme from '../utility/theme';

const FileUploader = props => {
  const {fileType} = props;
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>{
        alert("sdfsd")
      }}>
        <View
          style={{
            height: getResHeight(180),
            width: '100%',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: textColorHandler(),
            borderStyle: 'dashed',
            backgroundColor: backgroundColorHandler(),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon
            type={'Ionicons'}
            name={'cloud-upload'}
            size={getFontSize(33)}
            color={textColorHandler()}
          />
          <Text style={{color: textColorHandler(),
        fontSize: getFontSize(11),
        fontFamily: theme.font.regular
        
        }}>Click here to upload file</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default FileUploader;
