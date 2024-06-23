import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Journey() {
  return (
    <View style={styles.container}>
      <Text>Kelionių langas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});