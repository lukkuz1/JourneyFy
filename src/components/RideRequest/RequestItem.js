import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RequestItem = ({ item, onPress, onRequestSheetPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      ...CommonStyles.rowAlignCenter,
      ...CommonStyles.shadow,
      backgroundColor: Colors.whiteColor,
      borderRadius: Sizes.fixPadding,
      padding: Sizes.fixPadding,
      marginHorizontal: Sizes.fixPadding * 2,
      marginBottom: Sizes.fixPadding * 2,
    }}
  >
    <View style={{ flex: 1 }}>
      <View style={{ ...CommonStyles.rowAlignCenter }}>
        <Ionicons name="calendar-outline" color={Colors.blackColor} size={14} />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor14Medium,
            marginLeft: Sizes.fixPadding - 5,
          }}
        >
          {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
        </Text>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding - 5,
            width: 1,
            backgroundColor: Colors.blackColor,
            height: "80%",
          }}
        />
        <Ionicons name="time-outline" color={Colors.blackColor} size={14} />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor14Medium,
            marginLeft: Sizes.fixPadding - 5,
          }}
        >
          {new Date(item.createdAt.seconds * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      <View style={{ marginVertical: Sizes.fixPadding - 5 }}>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View
            style={{
              ...styles.locationIconWrapper,
              borderColor: Colors.greenColor,
            }}
          >
            <MaterialIcons
              name="location-pin"
              color={Colors.greenColor}
              size={7}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              ...Fonts.grayColor12Medium,
              marginLeft: Sizes.fixPadding,
            }}
          >
            {item.pickup}
          </Text>
        </View>
        <DashedLine
          axis="vertical"
          dashLength={2}
          dashThickness={1}
          dashGap={1.5}
          dashColor={Colors.grayColor}
          style={{ height: 5, marginLeft: Sizes.fixPadding - 4 }}
        />
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View
            style={{
              ...styles.locationIconWrapper,
              borderColor: Colors.redColor,
            }}
          >
            <MaterialIcons
              name="location-pin"
              color={Colors.redColor}
              size={7}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              ...Fonts.grayColor12Medium,
              marginLeft: Sizes.fixPadding,
            }}
          >
            {item.drop}
          </Text>
        </View>
      </View>

      <Text style={Fonts.blackColor14SemiBold}>
        Automobilis: <Text style={Fonts.grayColor14Medium}>{item.car}</Text>
      </Text>
      <Text style={Fonts.blackColor14SemiBold}>
        Kaina: <Text style={Fonts.grayColor14Medium}>{item.price} €</Text>
      </Text>
      <Text style={Fonts.blackColor14SemiBold}>
        Vietų liko: <Text style={Fonts.grayColor14Medium}>{item.seats}</Text>
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: Sizes.fixPadding }}
      >
        {item.passengerList.map((p) => (
          <Image
            key={p.id}
            source={p.profile}
            style={{
              width: 25,
              height: 25,
              borderRadius: 12.5,
              marginRight: Sizes.fixPadding - 5,
            }}
          />
        ))}
      </ScrollView>
    </View>

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onRequestSheetPress}
      style={styles.requestCountButton}
    >
      <Text style={Fonts.primaryColor15SemiBold}>
        Prašymai ({item.requestCount})
      </Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = {
  locationIconWrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  requestCountButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: Sizes.fixPadding - 5,
    paddingHorizontal: Sizes.fixPadding + 2,
    paddingVertical: Sizes.fixPadding - 2,
  },
};

export default RequestItem;
