import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Sizes, Fonts } from "../../constants/styles";


const seats = Array.from({ length: 7 }, (_, i) => i + 1);

const NoOfSeatSheet = ({ isVisible, onClose, selectedSeat, onSelectSeat }) => {
  return (
    <BottomSheet
      scrollViewProps={{ scrollEnabled: false }}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.sheetStyle}>
        <Text style={styles.sheetHeader}>Vietų sk.</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2 }}>
          <View>
            {seats.map((item, index) => (
              <View key={index}>
                <Text
                  onPress={() => {
                    onSelectSeat(item);
                    onClose();
                  }}
                  style={{
                    ...(selectedSeat === item ? Fonts.secondaryColor16SemiBold : Fonts.blackColor16SemiBold),
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
                {index === seats.length - 1 ? null : (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: Colors.lightGrayColor,
                      marginVertical: Sizes.fixPadding * 2,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
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
    paddingTop: Sizes.fixPadding * 2,
  },
  sheetHeader: {
    marginHorizontal: Sizes.fixPadding * 2,
    textAlign: "center",
    ...Fonts.primaryColor16SemiBold,
    marginBottom: Sizes.fixPadding * 2.5,
  },
};

export default NoOfSeatSheet;
