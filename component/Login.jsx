import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import Authenticate from './Authenticate';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  
  //     const data = await response.json();
  
  //     if (data.success) {
  //       console.log('Login successful');
  //     } else {
  //       console.error('Login failed:', data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.0.9:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_use: username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Login successful');
        // Save user data to state or context for further use in the app
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <View style={styles.titleContainer}>
      </View>
      <TextInput
        style={styles.input}
        placeholder="תעודת זהות"
        placeholderTextColor="#A9A9A9"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>התחברות</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090909',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logo: {
    position: 'absolute',
    top: 140,
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    width: '80%',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
