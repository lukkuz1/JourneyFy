import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Fonts, Sizes, Colors } from "../../constants/styles";

const RouteList = ({ ride }) => {
  if (!ride) return null;

  const { pickupAddress, destinationAddress, status } = ride;
  const stops = [
    {
      id: "pickup",
      title: "Paėmimo taškas",
      address: pickupAddress,
      completed: status !== "pending",
    },
    {
      id: "dropoff",
      title: "Galutinis kelionės taškas",
      address: destinationAddress,
      completed: status === "finished",
    },
  ];

  return (
    <View style={{ marginTop: Sizes.fixPadding * 2 }}>
      {stops.map((s, i) => {
        const color = s.completed ? Colors.grayColor : Colors.primaryColor;
        return (
          <View
            key={s.id}
            style={{
              flexDirection: "row",
              marginHorizontal: Sizes.fixPadding * 2,
            }}
          >
            <View>
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: color,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="location-pin" size={10} color={color} />
              </View>
              {i < stops.length - 1 && (
                <DashedLine
                  axis="vertical"
                  dashLength={3}
                  dashThickness={1}
                  dashColor={Colors.lightGray}
                  style={{ height: 45, marginLeft: Sizes.fixPadding - 2 }}
                />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
              <Text style={Fonts.grayColor14Medium}>{s.title}</Text>
              <Text
                style={{
                  ...Fonts.blackColor14Medium,
                  marginTop: Sizes.fixPadding - 8,
                }}
              >
                {s.address}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RouteList;
