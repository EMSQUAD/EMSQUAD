import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import GreetingMessage from "./DateMessage";

const Header = () => {
  return (
    <View style={styles.headerContainer}>

    <View style={styles.contentlogo}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.circularImageContainer}>
        <Image
          source={require("../assets/images/person.png")}
          style={styles.circularImage}
        />
      </View>
      </View>

      {/* <View style={styles.centerTextContainer}>
       <View style={styles.centerText}>
      
        </View>
      </View> */}
      <View style={styles.centerText}>
      <GreetingMessage />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    // top: -20,
    alignItems: "center",
    backgroundColor: "#060606",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  
    height: 150,
    width: "100%",
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: "contain",
  },
  circularImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  circularImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  centerText: {
    position: "absolute",
    top: 100,
  },
  contentlogo: {
    width: "100%",
    display: "flex",
    padding: 20,
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default Header;
