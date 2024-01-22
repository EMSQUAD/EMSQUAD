import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:100,
    height: 50
  },
  Image: {
    width: 20,
    height: 50,
  },
});

export default HomeScreen;
