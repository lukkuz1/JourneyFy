import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Journey = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Kelionių puslapis</Text>
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

export default Journey;
