import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomComponent = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, {name}! Seja bem-vindo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    marginBottom: -70,
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#F5FCFF",
  },
});

export default CustomComponent;
