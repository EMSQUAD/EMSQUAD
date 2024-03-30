
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";



const NavBar = ({ navigation, route }) => {
    const { userDetails } = route?.params || {};
   console.log("userDetails in NavBar:", userDetails);
    const navOptions = [
      { icon: require("../assets/images/settings.png"), text: "הגדרות", screen: "SettingsSolider" },
      { icon: require("../assets/images/task.png"), text: "אירועים", screen: "Events" },
      { icon: require("../assets/images/home.png"), text: "בית", screen: "HomeSolider" },
      { icon: require("../assets/images/chat.png"), text: "צ'אט", screen: "Users" },
    ];
  
    const navigateToScreen = (screen) => {
      if (navigation && route && route.name !== screen) {
        navigation.navigate(screen, { userDetails });
      }
    };
  
    return (
      <View style={styles.container}>
        {navOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => navigateToScreen(option.screen)}>
            <Image source={option.icon} style={styles.icon} />
            <Text style={styles.text}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    height: "12%",
    backgroundColor: "#060606",
    borderColor: "red",
    borderRadius: 20,
    zIndex: 999, // Set a high value to ensure it appears on top
  },
  
    optionContainer: {
      alignItems: "center",
      flex: 1, 
    },
    icon: {
      width: 30,
      height: 30,
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      color: "#fff", // Adjust as needed
    },
  });
  
  export default NavBar;

