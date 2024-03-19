import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import AuthenticationScreen from "../functions/AuthenticationScreen";

const FaceIDScreen = () => {
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

export default FaceIDScreen;
