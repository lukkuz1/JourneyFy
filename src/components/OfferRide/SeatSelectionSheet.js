import React from "react";
import { View, Text, ScrollView } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Fonts, Sizes, screenHeight } from "../../constants/styles";

const SeatSelectionSheet = ({
  isVisible,
  seats,
  selectedSeat,
  onSelect,
  onClose,
}) => {
  return (
    <BottomSheet
      scrollViewProps={{ scrollEnabled: false }}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.sheetStyle}>
        <Text style={styles.sheetHeader}>Vietų sk.</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          <View>
            {seats.map((item, index) => (
              <View key={`${index}`}>
                <Text
                  onPress={() => onSelect(item)}
                  style={{
                    ...(selectedSeat === item
                      ? { ...Fonts.secondaryColor16SemiBold }
                      : { ...Fonts.blackColor16SemiBold }),
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
                {index === seats.length - 1 ? null : (
                  <View
                    style={{
                      height: 1.0,
                      backgroundColor: Colors.lightGrayColor,
                      marginVertical: Sizes.fixPadding * 2.0,
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
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    paddingTop: Sizes.fixPadding * 2.0,
    maxHeight: screenHeight - 150,
  },
  sheetHeader: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "center",
    ...Fonts.primaryColor16SemiBold,
    marginBottom: Sizes.fixPadding * 2.0,
  },
};

export default SeatSelectionSheet;
