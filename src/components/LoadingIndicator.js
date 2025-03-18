import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../constants/styles"

const LoadingIndicator = () => (
  <ActivityIndicator size="large" color={Colors.primaryColor} />
);

export default LoadingIndicator;