import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  CommonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Key from '../../constants/key';
import {Input} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';
import Geocoder from 'react-native-geocoding';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const SPACE = 0.01;
const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickLocationScreen = ({navigation, route}) => {
  const [currentmarker, setCurrentMarker] = useState({
    latitude: LATITUDE - SPACE,
    longitude: LONGITUDE - SPACE,
  });
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Geocoder.init(Key.apiKey);
    getAddress({location: currentmarker});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.bodyBackColor}}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        {headerBg()}
        {header()}
        {mapView()}
        <View style={styles.footer}>
          {locationInfo()}
          {pickLocationButton()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  function headerBg() {
    return <View style={styles.headerBg}></View>;
  }

  function header() {
    return (
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={24}
          style={{marginTop: Sizes.fixPadding}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <View style={styles.searchFieldWrapStyle}>
          <Ionicons
            name="search"
            color={Colors.grayColor}
            size={20}
            style={{marginTop: Sizes.fixPadding - 3.0}}
          />
          <GooglePlacesAutocomplete
            placeholder={'Search location here'}
            onPress={data => {
              setSearch(data.description);
              setTheMarkerAccordingSearch({address: data.description});
            }}
            styles={{
              textInput: {height: 40, marginRight: -20.0},
            }}
            query={{
              key: Key.apiKey,
              language: 'en',
            }}
            textInputProps={{
              InputComp: Input,
              value: search,
              onChangeText: value => {
                setSearch(value);
              },
              inputContainerStyle: {borderBottomWidth: 0.0, height: 40.0},
              inputStyle: {...Fonts.blackColor16SemiBold},
              containerStyle: {marginLeft: -Sizes.fixPadding, height: 40.0},
              selectionColor: Colors.primaryColor,
            }}
          />
          {search && Platform.OS == 'android' ? (
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.grayColor}
              style={{marginTop: Sizes.fixPadding - 3.0}}
              onPress={() => {
                setSearch('');
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }

  function locationInfo() {
    return (
      <View style={{...styles.locationInfoWrapStyle}}>
        <View
          style={{
            borderColor:
              route.params.addressFor == 'pickup'
                ? Colors.greenColor
                : Colors.redColor,
            ...styles.locationIconWrapper,
          }}>
          <MaterialIcons
            name="location-pin"
            color={
              route.params.addressFor == 'pickup'
                ? Colors.greenColor
                : Colors.redColor
            }
            size={18}
          />
        </View>
        <Text
          numberOfLines={2}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Medium,
          }}>
          {address}
        </Text>
      </View>
    );
  }

  function pickLocationButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: {address: address, addressFor: route.params.addressFor},
            merge: true,
          });
        }}
        style={{
          ...CommonStyles.button,
          marginVertical: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.whiteColor18Bold}}>Pick this location</Text>
      </TouchableOpacity>
    );
  }

  async function setTheMarkerAccordingSearch({address}) {
    Geocoder.from(address)
    .then(json => {
      var location = json.results[0].geometry.location;
      const userSearchLocation = {
        latitude: location.lat,
        longitude: location.lng,
      };
      setCurrentMarker(userSearchLocation);
      setAddress(address);
    })
    .catch(error => console.warn(error));
  }

  function mapView() {
    return (
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentmarker.latitude,
          longitude: currentmarker.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={currentmarker}
          onDragEnd={e => {
            setCurrentMarker(e.nativeEvent.coordinate);
            getAddress({location: e.nativeEvent.coordinate});
          }}
          draggable>
          <Image
            source={require('../../assets/images/icons/marker.png')}
            style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
          />
        </Marker>
      </MapView>
    );
  }

  function getAddress({location}) {
    Geocoder.from(location.latitude, location.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  }
};

export default PickLocationScreen;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.bodyBackColor,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.5,
    marginTop: -Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow,
  },
  locationInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
  },
  searchFieldWrapStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding - 6.0,
    marginLeft: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  locationIconWrapper: {
    width: 24.0,
    height: 24.0,
    borderRadius: 12.0,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBg: {
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 90.0,
    zIndex: 90,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    padding: Sizes.fixPadding * 2.0,
  },
});
