import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const VehicleForm = ({ 
  vehicleData, 
  onChange, 
  onOpenImagePicker, 
  onOpenVehicleTypePicker, 
  onOpenSeatPicker 
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onOpenImagePicker} style={styles.vehicleImageWrapper}>
        {vehicleData.carImage ? (
          <Image 
            source={{ uri: vehicleData.carImage }} 
            style={{ width: 100, height: 100, borderRadius: 8 }} 
          />
        ) : (
          <>
            <Ionicons name="camera-outline" color={Colors.grayColor} size={35} />
            <Text style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 5 }}>
              Pridėkite mašinos nuotrauką
            </Text>
          </>
        )}
      </TouchableOpacity>
      
      {renderInput("Mašinos pavadinimas", "vehicleName", vehicleData.vehicleName, onChange)}
      
      {renderSelectInput(
        "Mašinos tipas",
        vehicleData.vehicleType,
        "Pasirinkite mašinos tipą",
        onOpenVehicleTypePicker
      )}
      
      {renderInput("Mašinos reg. nr.", "regNo", vehicleData.regNo, onChange)}
      {renderInput("Mašinos spalva", "color", vehicleData.color, onChange)}
      
      {renderSelectInput(
        "Vietų skaičius",
        vehicleData.seat ? `${vehicleData.seat} vietų` : "",
        "Pasirinkite vietų sk.",
        onOpenSeatPicker
      )}
      
      {renderInput("Įranga (pvz., kondicionierius, muzika)", "facility", vehicleData.facility, onChange)}
    </View>
  );
};

const renderInput = (label, field, value, onChange, keyboardType = "default") => (
  <View style={{ margin: Sizes.fixPadding * 2 }}>
    <Text style={{ ...Fonts.blackColor15SemiBold, marginBottom: Sizes.fixPadding }}>
      {label}
    </Text>
    <View style={styles.valueBox}>
      <TextInput
        placeholder={`Įveskite ${label.toLowerCase()}`}
        style={styles.textFieldStyle}
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
        cursorColor={Colors.primaryColor}
        value={value}
        keyboardType={keyboardType}
        onChangeText={(text) => onChange(field, text)}
      />
    </View>
  </View>
);

const renderSelectInput = (label, value, placeholder, onPress) => (
  <View style={{ margin: Sizes.fixPadding * 2 }}>
    <Text style={{ ...Fonts.blackColor15SemiBold, marginBottom: Sizes.fixPadding }}>
      {label}
    </Text>
    <TouchableOpacity onPress={onPress} style={styles.selectInput}>
      <Text style={value ? Fonts.blackColor16SemiBold : Fonts.grayColor16SemiBold}>
        {value ? value : placeholder}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5,
    borderRadius: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    height: 20,
    padding: 0,
  },
  vehicleImageWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 4,
    margin: Sizes.fixPadding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  selectInput: {
    padding: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
  },
});

export default VehicleForm;