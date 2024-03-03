import React, { useState,useEffect } from "react";
import { View, Image, Text, StyleSheet, Dimensions,BackHandler  } from "react-native";
import GreetingMessage from "./DateMessage";
import { Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import DropDownPicker from "react-native-dropdown-picker";
// import { Modal } from "react-native-web";
import DropdownMenu from "./DropdownMenu";

const Header = ({ userDetails }) => {
  // const screenWidth = Dimensions.get("window").width;
  // const imageSize = screenWidth * 0.5;

  // const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  // const backHandler = BackHandler;


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


  // const handleBackButton = () => {
  //   if (showMenu) {
  //     setShowMenu(false);
  //     return true; // Tell React Navigation that we've handled the back button
  //   }
  //   return false; // Let the default back button behavior happen
  // };

  // useEffect(() => {
  //   const cleanup = navigation.addListener("blur", () => {
  //     // Close the dropdown when navigating away from the screen
  //     setShowMenu(false);
  //   });
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButton)
  //   return () => {
  //     cleanup();
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  //   };
  // }, [navigation, showMenu]);


  return (
    
  //   <View style={styles.headerContainer}>
  //     <View style={styles.contentlogo}>
  //       <Image
  //         source={require("../assets/images/logo.png")}
  //         style={styles.logo}
  //       />
  //       <TouchableOpacity onPress={toggleMenu}>
  //         <Image
  //           source={{ uri: userDetails.image }}
  //           style={styles.circularImage}
  //           // onError={(error) =>
  //           // console.error("Image Load Error:", error.nativeEvent.error)
  //         />
  //       </TouchableOpacity>
  //       <Modal
  //             animationType="slide"
  //             transparent={true}
  //             visible={showMenu}
  //             onShow={() => toggleMenu()}
  //             onDismiss={() => closeMenu()}
  //             onRequestClose={() => closeMenu()}
  //             presentationStyle="overFullScreen"
  //       >
  //        <DropdownMenu handleLogout={handleLogout} closeMenu={closeMenu}/>
  //       </Modal>
  //     </View>
  //     <View style={styles.centerText}>
  //       <GreetingMessage user={userDetails} />
  //     </View>
  //   </View>
  // );


  <TouchableOpacity
  style={styles.headerContainer}
  onPress={handleContainerPress}
  activeOpacity={1}
>
  <View style={styles.contentlogo}>
    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
    <TouchableOpacity onPress={toggleMenu}>
      <Image
        source={{ uri: userDetails.image }}
        style={styles.circularImage}
      />
    </TouchableOpacity>
    <Modal
      // animationType="slide"
      transparent={true}
      visible={showMenu}
      // onRequestClose={() => setShowMenu(false)}
      // onDismiss={() => setShowMenu(false)}
      // presentationStyle="overFullScreen"
      // isVisible={showMenu}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={() => setShowMenu(false)}
    >
      <DropdownMenu handleLogout={handleLogout} closeMenu={() => setShowMenu(false)} />
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
    // top: -20,
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
