import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";



const NavBar = ({navigation,route}) => {
  const { userDetails } = route?.params || {};
  const navOptions = [
    { icon: require("../assets/images/settings.png"), text: "הגדרות" },
    { icon: require("../assets/images/task.png"), text: "אירועים" },
    { icon: require("../assets/images/home.png"), text: "בית" },
    { icon: require("../assets/images/chat.png"), text: "צ'אט" },
  ];

  console.log("userDetails in NavBar:", userDetails);


  return (
    <View style={styles.container}>
      {navOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionContainer}
         onPress={() => {
              if (option.text === "בית") {
                navigation.navigate("Home",{ userDetails: userDetails });
              } else if (option.text === "צ'אט") {
                navigation.navigate("Users",{ userDetails: userDetails });
              }
              else if (option.text === "אירועים") {
                navigation.navigate("Events",{ userDetails: userDetails });
              }
            }}
          >
          
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


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     paddingBottom: 30,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//     backgroundColor: "#060606",
//     borderRadius: 20,
//     flexShrink: 1, // Ensure the NavBar doesn't take up extra space
//   },
//   optionContainer: {
//     alignItems: "center",
//     flex: 1,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 12,
//     color: "#fff",
//   },
// });




// export default NavBar;



//////
  // if (navigation) {
  //   return (
  //     <View style={styles.container}>
  //       {navOptions.map((option, index) => (
  //         <TouchableOpacity
  //           key={index}
  //           style={styles.optionContainer}
  //           onPress={() => {
  //             if (option.text === "בית") {
  //               navigation.navigate("Home");
  //             } else if (option.text === "צ'אט") {
  //               navigation.navigate("Users");
  //             }
  //           }}
  //         >
  //           <Image source={option.icon} style={styles.icon} />
  //           <Text style={styles.text}>{option.text}</Text>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // }
