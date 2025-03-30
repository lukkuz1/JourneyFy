import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Colors, Sizes, Fonts } from "../../constants/styles";


const vehicleTypes = [
    "Sedanas", 
    "Hečbekas", 
    "Universalas", 
    "Kabrioletas", 
    "Kupė", 
    "Minivanas", 
    "Pikapas", 
    "Visureigis", 
    "Limuzinas", 
    "Furgonas", 
    "Kompaktinis automobilis"
  ];

const VehicleTypeSheet = ({ isVisible, onClose, selectedVehicleType, onSelectVehicleType }) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={onClose}
      scrollViewProps={{ scrollEnabled: false }}
    >
      <View style={styles.sheetStyle}>
        <Text style={styles.sheetHeader}>Mašinos tipas</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2 }}
        >
          <View>
            {vehicleTypes.map((type, index) => (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    onSelectVehicleType(type);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      selectedVehicleType === type
                        ? Fonts.secondaryColor16SemiBold
                        : Fonts.blackColor16SemiBold,
                      { textAlign: "center" },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
                {index === vehicleTypes.length - 1 ? null : (
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

const styles = StyleSheet.create({
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
});

export default VehicleTypeSheet;
