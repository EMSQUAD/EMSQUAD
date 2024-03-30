import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const DropdownMenu = ({ closeMenu }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("User logged out!");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeMenu} style={styles.menuItem}>
        <View style={styles.rowContainer}>
          {/* AntDesign chevron-right icon */}
          <Text style={styles.text}> חזור</Text>
          <AntDesign name="left" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.menuItem}> התנתקות</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.menuItem}>יציאה מהאפליקציה</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    right: 10,
    backgroundColor: "#8A8990",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "right",
  },

  closeButton: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "right",
  },
  icon: {
    fontSize: 20,
    paddingRight: 5,
    textAlign: "right",
  },
  rowContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  text: {
    fontSize: 16,
    textAlign: "right",
    alignItems: "flex-end",
  },
});

export default DropdownMenu;
