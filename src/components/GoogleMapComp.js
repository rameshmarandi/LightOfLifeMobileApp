import React, {useCallback} from 'react';
import {View, Linking, Text, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';

import MapView, {Marker, Callout} from 'react-native-maps';
import {getFontSize} from '../utility/responsive';
import {VectorIcon} from './VectorIcon';
import theme from '../utility/theme';
import {MapCoordinate} from '../config/constants';

const GoogleUIComp = () => {
  const handleCalloutPress = () => {
    // alert("sdfsd")
    // setPopupOpen(false);

    const latitude = 18.5890345;
    const longitude = 73.7925924;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handleMarkerPress = () => {
    setPopupOpen(true);
  };

  return (
    <>
      <MapView
        style={{width: '100%', height: '100%', borderRadius: 100}}
        initialRegion={{
          latitude: MapCoordinate.latitude,
          longitude: MapCoordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: MapCoordinate.latitude,
            longitude: MapCoordinate.longitude,
          }}
          title="Light of Life Church"
          description="Join us for worship, fellowship, and spiritual growth at Light of Life Church. All are welcome!"
          onPress={handleMarkerPress}
          icon={() => (
            <VectorIcon
              type={'FontAwesome6'}
              name={'location-dot'}
              size={getFontSize(29)}
              color={'red'}
              style={{}}
            />
          )}>
          {isPopupOpen && (
            <>
              <Callout>
                <TouchableWithoutFeedback onPress={handleCalloutPress}>
                <View>
                  <Text style={{ fontWeight: 'bold' , color : theme.color.primary}}>Light of Life Ministries</Text>
                  <Text>Join us for worship, fellowship, and spiritual growth.</Text>
                  <Text style={{ color: 'red', textDecorationLine: 'underline' }}>
                    Click to open in Google Maps
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              </Callout>
            </>
          )}
        </Marker>
      </MapView>
    </>
  );
};

// Wrap the component with React.memo and useCallback to prevent re-renders
const MemoizedGoogleMapComp = React.memo(GoogleUIComp);

const GoogleMapComp = () => {
  // Wrapping the component with useCallback to prevent unnecessary re-creation
  const memoizedCallback = useCallback(() => <MemoizedGoogleMapComp />, []);

  return memoizedCallback();
};

export default GoogleMapComp;
