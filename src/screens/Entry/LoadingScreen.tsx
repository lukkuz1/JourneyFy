import React from "react";
import { View, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 100,
    textAlign: "center",
  },
});

export default LoadingScreen;
