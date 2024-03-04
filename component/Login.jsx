import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!id || !password) {
        throw new Error('Validation Error: Please enter both ID and password');
      }
  
      setLoading(true);
      console.log('Attempting login with:', { id_use: id, password });
  
      const requestBody = { id_use: id, password };
  
      const response = await fetch('https://emsquad.onrender.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Server Error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Server Response:', responseData);
  
      if (responseData && responseData._id) {
        console.log('Login successful');
        navigation.navigate('Home');
      } else {
        console.error('Login failed:', responseData.message || 'Unknown error');
        Alert.alert('Login Failed', responseData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="תעודת זהות"
          placeholderTextColor="#A9A9A9"
          onChangeText={setId}
          value={id}
        />
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'התחברות'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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


