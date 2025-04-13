// src/components/RequestSheet.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Fonts, Sizes, screenHeight, CommonStyles } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";

const RequestSheet = ({ isVisible, requestUsers, count, onClose }) => {
  const usersToShow = requestUsers.slice(0, count);

  return (
    <BottomSheet
      scrollViewProps={{ scrollEnabled: false }}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.sheetStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {usersToShow.map((item) => (
            <View key={item.id} style={styles.requestWrapper}>
              <View style={{ ...CommonStyles.rowAlignCenter }}>
                <Image
                  source={item.profile}
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: Sizes.fixPadding - 5,
                  }}
                />
                <View style={styles.requestDetailWrapper}>
                  <Text style={{ ...Fonts.blackColor15SemiBold }}>{item.name}</Text>
                  <View>
                    <View style={{ ...CommonStyles.rowAlignCenter }}>
                      <View style={{ ...styles.locationIconWrapper, borderColor: Colors.greenColor }}>
                        <MaterialIcons name="location-pin" color={Colors.greenColor} size={7} />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          ...Fonts.grayColor12Medium,
                          marginLeft: Sizes.fixPadding,
                        }}
                      >
                        Mumbai,2464 Royal South
                      </Text>
                    </View>

                    <DashedLine
                      axis="vertical"
                      dashLength={2}
                      dashThickness={1}
                      dashGap={1.5}
                      dashColor={Colors.grayColor}
                      style={{
                        height: 5,
                        marginLeft: Sizes.fixPadding - 4,
                      }}
                    />

                    <View style={{ ...CommonStyles.rowAlignCenter }}>
                      <View style={{ ...styles.locationIconWrapper, borderColor: Colors.redColor }}>
                        <MaterialIcons name="location-pin" color={Colors.redColor} size={7} />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          ...Fonts.grayColor12Medium,
                          marginLeft: Sizes.fixPadding,
                        }}
                      >
                        Pune, 2464 Royal Ln. Mesa
                      </Text>
                    </View>
                  </View>
                  <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                    {item.amount} ({item.seat} seat)
                  </Text>
                </View>
              </View>
              <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 2 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onClose}
                  style={{ backgroundColor: Colors.whiteColor, ...styles.sheetButton, marginRight: Sizes.fixPadding }}
                >
                  <Text style={{ ...Fonts.primaryColor16SemiBold }}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    onClose();
                    // You can add navigation to StartRide here if needed
                  }}
                  style={{ ...styles.sheetButton, backgroundColor: Colors.secondaryColor, marginLeft: Sizes.fixPadding }}
                >
                  <Text style={{ ...Fonts.whiteColor16SemiBold }}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = {
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    borderTopRightRadius: Sizes.fixPadding * 4,
    paddingTop: Sizes.fixPadding * 3,
    maxHeight: screenHeight - 150,
  },
  requestWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
  },
  requestDetailWrapper: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    height: 82,
    justifyContent: "space-between",
  },
  locationIconWrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetButton: {
    flex: 1,
    ...CommonStyles.shadow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5,
    padding: Sizes.fixPadding,
  },
};

export default RequestSheet;
