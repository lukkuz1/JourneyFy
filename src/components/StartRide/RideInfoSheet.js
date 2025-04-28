import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const placeholderAvatar = require("../../assets/images/user/user9.png");

const RideInfoSheet = ({ ride, passengers = [] }) => {
  if (!ride) return null;

  return (
    <View style={styles.container}>
      <Text style={Fonts.secondaryColor17SemiBold}>Keleiviai</Text>
      <FlatList
        data={passengers}
        keyExtractor={(p) => p.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: Sizes.fixPadding }}
        renderItem={({ item }) => (
          <View style={styles.passenger}>
            <Image
              source={item.photoURL ? { uri: item.photoURL } : placeholderAvatar}
              style={styles.avatar}
            />
            <Text style={Fonts.grayColor12Medium}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding * 2,
    marginTop: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
  passenger: {
    alignItems: "center",
    marginRight: Sizes.fixPadding * 1.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: Sizes.fixPadding / 2,
  },
});

export default RideInfoSheet;