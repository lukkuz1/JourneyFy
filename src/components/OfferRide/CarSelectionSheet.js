// src/components/CarSelectionSheet.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Fonts, Sizes, screenHeight } from "../../constants/styles";

const CarSelectionSheet = ({ isVisible, carsList, onSelect, onClose }) => {
  return (
    <BottomSheet
      scrollViewProps={{ scrollEnabled: false }}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.sheetStyle}>
        <Text style={styles.sheetHeader}>Pasirinkite savo automobilį</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          <View>
            {carsList.map((item, index) => (
              <View key={`${index}`}>
                <Text
                  onPress={() => onSelect(item)}
                  style={{ ...Fonts.blackColor15SemiBold, textAlign: "center" }}
                >
                  {item}
                </Text>
                {index === carsList.length - 1 ? null : (
                  <View
                    style={{
                      backgroundColor: Colors.lightGrayColor,
                      height: 1.0,
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

export default CarSelectionSheet;
