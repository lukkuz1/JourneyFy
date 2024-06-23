import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';


type Props = {
  text: string;
  textColor: string;
  buttonColor: string;
  margin?: [top: number, bottom: number, left: number, right: number];
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;

}

export default function EntryButton({ text, textColor, buttonColor, margin = [0, 0, 0, 0],  style, onPress }: Props) {

  return (
    <View
      style={[
        styles.rectangle,
        {
          backgroundColor: buttonColor,
          marginTop: margin[0],
          marginBottom: margin[1],
          marginLeft: margin[2],
          marginRight: margin[3],
          overflow: 'hidden',
        },
        style
      ]}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      >
        <View style={styles.inside}>
          <Text style={[styles.text, { color: textColor }]} >{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 310,
    height: 50,
    flexShrink: 0,
    borderRadius: 50,
  },
  inside: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  svg: {
    flex: 1,
    position: 'absolute',
    left: 13,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});