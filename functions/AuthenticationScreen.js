import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import authenticate from "./authenticate";

const AuthenticationScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await authenticate();
      setIsAuthenticated(status);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <FontAwesome name="check-circle" size={100} color="#4CAF50" />
      ) : (
        <FontAwesome name="times-circle" size={100} color="#FF5252" />
      )}
      <Text style={styles.title}>
        {isAuthenticated ? "Hoşgeldiniz!" : "Oops!"}
      </Text>
      <Text style={isAuthenticated ? styles.successText : styles.errorText}>
        {isAuthenticated
          ? "Sizin için özel bilgiler burada."
          : "Doğrulama yapılamadı. Lütfen tekrar deneyin."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  successText: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FF5252",
    textAlign: "center",
  },
});

export default AuthenticationScreen;