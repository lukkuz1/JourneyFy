import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ImageStyle, ViewStyle, TextStyle } from 'react-native';
import MyStatusBar from '../../components/myStatusBar';
import { Colors, Sizes, Fonts, screenWidth, CommonStyles } from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NavigationProps = {
  push: (screen: string, params?: object) => void;
};

interface WalletScreenProps {
  navigation: NavigationProps;
}

const Wallet: React.FC<WalletScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
          {walletImage()}
          {balanceInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function balanceInfo() {
    return (
      <View style={styles.balanceInfoWrapper}>
        <View style={{ alignItems: 'center', margin: Sizes.fixPadding * 4.0 }}>
          <Text style={{ ...Fonts.primaryColor30Medium }}>$150</Text>
          <Text style={{ ...Fonts.grayColor18Medium }}>Available balance</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            //add menu here
          }}
          style={styles.optionWrapper as ViewStyle}>  
          <View style={styles.circle40}>
            <MaterialCommunityIcons
              name="swap-vertical"
              color={Colors.secondaryColor}
              size={22}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
              Transaction
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14Medium,
                marginTop: Sizes.fixPadding - 8.0,
              }}>
              View all transaction list
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            color={Colors.blackColor}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            //add menu here
          }}
          style={styles.optionWrapper as ViewStyle}>
          <View style={styles.circle40}>
            <MaterialCommunityIcons
              name="wallet-plus-outline"
              color={Colors.secondaryColor}
              size={20}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
              Add money
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14Medium,
                marginTop: Sizes.fixPadding - 8.0,
              }}>
              You can easily add money
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            color={Colors.blackColor}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            //add menu
          }}
          style={styles.optionWrapper as ViewStyle}>
          <View style={styles.circle40}>
            <MaterialCommunityIcons
              name="credit-card-plus-outline"
              color={Colors.secondaryColor}
              size={22}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
              Send to bank
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor14Medium,
                marginTop: Sizes.fixPadding - 8.0,
              }}>
              Easily send money to the bank
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            color={Colors.blackColor}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function walletImage() {
    return (
      <Image
        source={require('../../assets/images/wallet.png')}
        style={styles.walletImageStyle as ImageStyle} 
      />
    );
  }

  function header() {
    return (
      <View style={styles.header}>
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Wallet</Text>
      </View>
    );
  }
};

export default Wallet;

const styles = StyleSheet.create({
  balanceInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.shadow,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding + 5.0,
  },
  header: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletImageStyle: {
    width: screenWidth / 2.0,
    height: screenWidth / 2.0,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  circle40: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    flexDirection: 'row',  // Make sure to set flexDirection directly here
    alignItems: 'center',  // Also set alignItems here, to avoid conflicting styles
  },
});
