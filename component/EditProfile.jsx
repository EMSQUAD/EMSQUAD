import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

const EditProfileScreen = ({ route, navigation }) => {
  const { userDetails } = route.params;

  const [firstName, setFirstName] = useState(userDetails.first_name);
  const [lastName, setLastName] = useState(userDetails.last_name);
  const [phone, setPhone] = useState(userDetails.phone);
  const [certifications, setCertifications] = useState(
    userDetails.certifications
  );
  const [password, setPassword] = useState(userDetails.password || "");
  const [image, setImage] = useState(userDetails.image);
  const handleSubmit = async () => {
    if (!userDetails.id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        phone,
        certifications,
        password,
        image,
      };

      const url = `https://server-ems-rzdd.onrender.com/user/${userDetails.id}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        Alert.alert("Success", "Profile updated successfully.");
        navigation.goBack();
      } else {
        const errorMessage = await response.text();
        console.error("Response error:", errorMessage);
        Alert.alert(
          "Error",
          "An error occurred while updating the profile. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please check your connection and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={certifications}
        onChangeText={setCertifications}
        placeholder="Certifications"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>שמור</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlign: "right",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default EditProfileScreen;
