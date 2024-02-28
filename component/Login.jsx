// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!id || !password) {
//       Alert.alert('Validation Error', 'Please enter both ID and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log('Attempting login with:', { id_use: id, password });

//       const response = await fetch('https://emsquad.onrender.com/user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id_use: id, password }),
//       });

//       const responseData = await response.text();

//       // Check if the response is valid JSON
//       let data;
//       try {
//         data = JSON.parse(responseData);
//       } catch (error) {
//         console.error('Invalid JSON response from server:', responseData);
//         Alert.alert('Error', 'Invalid response from server');
//         setLoading(false);
//         return;
//       }

//       console.log('Server Response:', data);

//       if (response.ok && data.success) {
//         console.log('Login successful');
//         navigation.navigate('Home');
//       } else {
//         console.error('Login failed:', data.message);
//         Alert.alert('Login Failed', data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       Alert.alert('Error', 'An error occurred during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/images/logo.png")} style={styles.logo} />
//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="תעודת זהות"
//           placeholderTextColor="#A9A9A9"
//           onChangeText={setId}
//           value={id}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="סיסמא"
//           placeholderTextColor="#A9A9A9"
//           secureTextEntry
//           onChangeText={setPassword}
//           value={password}
//         />
//         <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
//           <Text style={styles.buttonText}>{loading ? 'Loading...' : 'התחברות'}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#090909',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   logo: {
//     marginBottom: 40,
//     width: 200,
//     height: 50,
//     resizeMode: "contain",
//   },
//   form: {
//     width: '100%',
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginBottom: 20,
//     padding: 10,
//     borderRadius: 5,
//     color: 'white',
//   },
//   button: {
//     backgroundColor: 'red',
//     padding: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//     opacity: 0.9,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('Validation Error', 'Please enter both ID and password');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Attempting login with:', { id_use: id, password });
  
      const response = await fetch('https://emsquad.onrender.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_use: parseInt(id), password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Server Response:', responseData);
  
      if (responseData.success) {
        console.log('Login successful');
        navigation.navigate('Home');
      } else {
        console.error('Login failed:', responseData.message);
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


