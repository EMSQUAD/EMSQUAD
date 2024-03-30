import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "./Header";
import NavBar from "./NavbarSoliser";
import Axios from "axios";

const StatusSwitch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isAvailable, setAvailable] = useState(false);
  const userDetails = route.params ? route.params.userDetails : null;

  useEffect(() => {
    fetchStatusFromServer();
  }, []);

  const fetchStatusFromServer = async () => {
    try {
        console.log("userDetails", userDetails);
      const response = await Axios.get(
        `https://server-ems-rzdd.onrender.com/user/${userDetails.id}`
      );
    //   console.log("response", response);
      setAvailable(response.data.status_ability === "available");
      console.log("\n response.data.status_ability:", response.data.status_ability);
    } catch (error) {
      console.error("Error fetching status from server:", error.message);
    }
  };

  //   const handleSwitchToggle = () => {
  //     setAvailable((prev) => !prev);
  //   };
  const handleSwitchToggle = async () => {
    try {
      const newStatus = isAvailable ? "unavailable" : "available";

  
      await Axios.put(`https://server-ems-rzdd.onrender.com/user/${userDetails.id}`, {
        status_ability: newStatus,
      });

      setAvailable(!isAvailable);
    } catch (error) {
      console.error("Error updating status on server:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{isAvailable ? "זמין" : "לא זמין"}</Text>
        <Switch value={isAvailable} onValueChange={handleSwitchToggle} />
      </View>
      <Header userDetails={userDetails} />
      <NavBar navigation={navigation} route={route}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#242424",
    alignContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }], // Increase the size
  },
  title: {
    marginTop: 20,
    fontSize: 40, // Adjust the fontSize as needed
    color: "white", // Change the color to your desired color
    padding: 40,
  },
});

export default StatusSwitch;
