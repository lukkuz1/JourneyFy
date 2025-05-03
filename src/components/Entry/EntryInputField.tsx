import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
  StyleProp,
  TextStyle,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  headerText: string;
  placeholderText: string;
  isPassword: boolean;
  postfix?: string;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  margin?: [top: number, bottom: number, left: number, right: number];
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export default function EntryInputField({
  headerText,
  placeholderText,
  isPassword,
  margin = [0, 12, 0, 0],
  keyboardType,
  style,
  headerStyle,
  postfix = "",
  onChangeText,
}: Props) {
  const [secure, setSecure] = useState(isPassword);

  return (
    <View
      style={[
        styles.rectangle,
        {
          marginTop: margin[0],
          marginBottom: margin[1],
          marginLeft: margin[2],
          marginRight: margin[3],
        },
        style,
      ]}
    >
      <Text style={[styles.typeFont, headerStyle]}>{headerText}</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={Colors.Gray}
          style={styles.insideFont}
          secureTextEntry={secure}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {isPassword ? (
          <Pressable
            onPress={() => setSecure((prev) => !prev)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={Colors.Gray}
            />
          </Pressable>
        ) : (
          postfix.length > 0 && (
            <Text style={styles.prefix}>{` ${postfix}`}</Text>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typeFont: {
    marginLeft: 15,
    color: Colors.Black,
    fontSize: 14,
    fontWeight: "400",
  },
  insideFont: {
    flex: 1,
    marginLeft: 15,
    color: Colors.Gray,
    fontSize: 16,
    fontWeight: "400",
  },
  prefix: {
    color: Colors.Gray,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 3,
  },
  rectangle: {
    width: 310,
    height: 70,
    borderRadius: 18,
    backgroundColor: Colors.White,
    shadowColor: "#000000",
    elevation: 3,
    zIndex: 999,
    justifyContent: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginRight: 15,
  },
});
