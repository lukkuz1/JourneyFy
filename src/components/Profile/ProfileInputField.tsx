import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

interface ProfileInputFieldProps {
  label: string;
  value: string;
  setter: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  validate?: (text: string) => string;
  placeholder?: string;
}

const ProfileInputField: React.FC<ProfileInputFieldProps> = ({
  label,
  value,
  setter,
  keyboardType = "default",
  validate,
  placeholder,
}) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (validate) {
      setError(validate(value));
    }
  }, []);

  const handleChange = (text: string) => {
    setter(text);
    if (validate) {
      setError(validate(text));
    }
  };

  const handleBlur = () => {
    if (validate) {
      setError(validate(value));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.textFieldStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            onBlur={handleBlur}
            placeholderTextColor={Colors.grayColor}
            keyboardType={keyboardType}
            autoFocus={true}
            editable={true}
            returnKeyType="done"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const validateName = (name: string): string => {
  if (!name.trim()) return "Šis laukas privalomas";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Leidžiami tik raidės ir tarpai";
  return "";
};

export const validatePhoneNumber = (number: string): string => {
  if (!number.trim()) return "Būtina nurodyti telefono numerį";
  if (
    !/^\+?(\d{1,4})?[-.\s()]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      number
    )
  )
    return "Įveskite teisingą telefono numerį";
  return "";
};

export const validateDateOfBirth = (date: string): string => {
  if (!date.trim()) return "Būtina nurodyti gimimo datą";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "Įveskite teisingą gimimo datą (MMMM-MM-DD)";
  }

  const parsedDate = new Date(date);
  const [year, month, day] = date.split("-").map(Number);
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear) {
    return `Įveskite metus nuo 1900 iki ${currentYear}`;
  }

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() + 1 !== month ||
    parsedDate.getDate() !== day
  ) {
    return "Įveskite galiojančią datą (MMMM-MM-DD)";
  }

  return "";
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  label: {
    ...Fonts.blackColor15SemiBold,
    marginBottom: 5,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    borderBottomColor: Colors.lightGrayColor,
    borderBottomWidth: 1,
    paddingBottom: Sizes.fixPadding - 5,
  },
  errorText: {
    color: Colors.redColor,
    ...Fonts.redColor14Medium,
    marginTop: 5,
  },
});

export default ProfileInputField;
