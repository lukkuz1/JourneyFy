import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, backgroundColor } from 'react-native';
import Colors from './src/constants/Colors';

export default function App() {
  return (
    <View style={styles.container} backgroundColor={Colors.BackgroundGradientUpper}>
      <Text style={styles.fontColor}>JourneyFy</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontColor: {
    color: Colors.DarkGray,
  },
});
