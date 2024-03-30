import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

const defaultImageBase64 =
  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const AddUserScreen = () => {
  const [userDetails, setUserDetails] = useState({
    id_use: "",
    first_name: "",
    last_name: "",
    phone: "",
    type_user: "Solider",
    password: "",
    status_ability: "available",
    certifications: "none",
    image: defaultImageBase64,
    message: "",
    liveEvent: "No",
  });

  const handleInputChange = (name, value) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://server-ems-rzdd.onrender.com/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("משתמש נוסף בהצלחה");
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("id_use", text)}
        value={userDetails.id_use}
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("first_name", text)}
        value={userDetails.first_name}
        placeholder="שם פרטי"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("last_name", text)}
        value={userDetails.last_name}
        placeholder="שם משפחה"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("phone", text)}
        value={userDetails.phone}
        placeholder="פלאפון"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("type_user", text)}
        value={userDetails.type_user}
        placeholder="Type of User"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry={true}
        value={userDetails.password}
        placeholder="סיסמא"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("status_ability", text)}
        value={userDetails.status_ability}
        placeholder="Status Ability"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("certifications", text)}
        value={userDetails.certifications}
        placeholder="Certifications"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>שלח</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "black",
    textAlign: "right",
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddUserScreen;
