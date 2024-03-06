
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('345678901');
  const [password, setPassword] = useState('S000009');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('Validation Error', 'Please enter both ID and password');
      console.log('Validation error');
      return;
    }

    setLoading(true);

    // try {
      // const response = await fetch('https://server-ems-74rn.onrender.com/user/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ id_use: parseInt(id), password }),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const responseData = await response.json();

      // if (response.status >= 200 && response.status < 300) {
      //   console.log('Login successful');

      // Save user details for future screens
      const userDetails = {
        id: '345678901',
        password: 'S000009',
        first_name: 'לירון',
        last_name: "שקד",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status_ability: "unavailable",
        type_user: "Solider",
        // Add other user details as needed
      };
      // console.log('Response Data:', responseData);

      // console.log('User Details:', userDetails);
      // Pass user details to HomeScreen
      //
      if (userDetails.type_user === 'Comander') {
        navigation.navigate('Home', { userDetails: userDetails });
      }
      //  if(userDetails.type_user==='Solider'){
      //   navigation.navigate('HomeSolider', { userDetails: userDetails });
      //  }
      if (userDetails.type_user === 'Solider') {
        navigation.navigate('HomeSoliderWalkie', { userDetails: userDetails });
      }


    // } else {
    //   console.error('Login failed:', responseData.message);
    //   Alert.alert('Login Failed', responseData.message || 'Login failed');
    // }
  // } catch (error) {
  //   console.error('Error during login:', error.message);
  //   Alert.alert('Error', 'An error occurred during login');
  // } finally {
    setLoading(false);
  // }
};


return (
  <View style={loginStyles.container}>
    <Image source={require("../assets/images/logo.png")} style={loginStyles.logo} />
    <View style={loginStyles.form}>
      <TextInput
        style={loginStyles.input}
        placeholder="תעודת זהות"
        placeholderTextColor="#A9A9A9"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="סיסמא"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={handleLogin} style={loginStyles.button} disabled={loading}>
        <Text style={loginStyles.buttonText}>{loading ? 'Loading...' : 'התחברות'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    marginBottom: 40,
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.9,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
