import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode,
    style?: any
}

export default function Card({children, style}: Props) {
  return (
    <View style={{ ...styles.card, ...style }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 10,
    borderRadius: 10
  },
});