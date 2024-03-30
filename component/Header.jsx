import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
} from "react-native";
import GreetingMessage from "./DateMessage";
import { Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropdownMenu from "./DropdownMenu";

const Header = ({ userDetails }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = () => {
    console.log("User logged out!");
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleContainerPress = () => {
    setShowMenu(!showMenu);
  };

  return (
    <TouchableOpacity
      style={styles.headerContainer}
      onPress={handleContainerPress}
      activeOpacity={1}
    >
      <View style={styles.contentlogo}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={{ uri: userDetails.image }}
            style={styles.circularImage}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={showMenu}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          onBackdropPress={() => setShowMenu(false)}
        >
          <DropdownMenu
            handleLogout={handleLogout}
            closeMenu={() => setShowMenu(false)}
          />
        </Modal>
      </View>
      <View style={styles.centerText}>
        <GreetingMessage user={userDetails} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    backgroundColor: "#060606",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    height: 170,
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
    height: 70,
    width: 70,
    resizeMode: "cover",
    borderRadius: 100,
    right: 10,
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
