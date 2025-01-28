import React from "react";
import { View, StyleSheet } from "react-native";

const Journey = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
});

export default Journey;
