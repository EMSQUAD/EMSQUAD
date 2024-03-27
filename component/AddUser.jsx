import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Image, ScrollView,Text,TouchableOpacity } from 'react-native';

const defaultImageBase64 = 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const AddUserScreen = () => {
  const [userDetails, setUserDetails] = useState({
    id_use: '',
    first_name: '',
    last_name: '',
    phone: '',
    type_user: 'Soldier',
    password: '',
    status_ability: 'available',
    certifications: 'none',
    image: defaultImageBase64, // Default image is used initially
    message: '',
    liveEvent: 'No',
  });

  // Add handlers for the input changes, form submission, etc.

  const handleInputChange = (name, value) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://server-ems-rzdd.onrender.com/user', {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Specify the content type in the header
        },
        body: JSON.stringify(userDetails), // Convert the userDetails object into a string to send as the request body
      });
  
      if (response.ok) {
        const data = await response.json(); // Assuming the server responds with JSON
        console.log(data); // Log or process the response from the server
        alert('משתמש נוסף בהצלחה');
      } else {
        throw new Error('Failed to add user'); // Throw an error if the response is not ok
      }
    } catch (error) {
      console.error(error); // Log the error to the console
      alert('Error submitting form'); // Show an error message
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      {/* <Image source={{ uri: userDetails.image }} style={styles.image} /> */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('id_use', text)}
        value={userDetails.id_use}
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('first_name', text)}
        value={userDetails.first_name}
        placeholder="שם פרטי"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('last_name', text)}
        value={userDetails.last_name}
        placeholder="שם משפחה"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('phone', text)}
        value={userDetails.phone}
        placeholder="פלאפון"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('type_user', text)}
        value={userDetails.type_user}
        placeholder="Type of User"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry={true}
        value={userDetails.password}
        placeholder="סיסמא"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('status_ability', text)}
        value={userDetails.status_ability}
        placeholder="Status Ability"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('certifications', text)}
        value={userDetails.certifications}
        placeholder="Certifications"
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('message', text)}
        value={userDetails.message}
        placeholder="התראה"
      /> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={{ alignSelf: 'center' }}>Live Event:</Text>
        <Button
          title={userDetails.liveEvent === 'Yes' ? 'Yes' : 'No'}
          onPress={() => handleInputChange('liveEvent', userDetails.liveEvent === 'Yes' ? 'No' : 'Yes')}
        />
      </View> */}
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <TouchableOpacity
  onPress={handleSubmit}
  style={styles.submitButton}
>
  <Text style={styles.submitButtonText}>שלח</Text>
</TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C8C5C5',

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black', // Add this line to change text color to white
    textAlign: 'right', 
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
  
  },
  submitButton: {
    backgroundColor: 'red', // Set background color to red
    padding: 10,
    borderRadius: 5, // Optional: if you want rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically (if you have a fixed height)
    height: 50, // Optional: if you want a fixed height
    marginBottom: 20, // Optional: if you want to add some margin at the bottom
  },
  submitButtonText: {
    color: 'white', // Set text color to white
    fontSize: 16, // Optional: adjust the font size
  },
  
});

export default AddUserScreen;