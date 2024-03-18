import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import AuthenticationScreen from "../functions/AuthenticationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <AuthenticationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});