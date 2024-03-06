import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-elements';
import { useRoute,useNavigation  } from '@react-navigation/native';
import Header from './Header';
import NavBar from './Navbar';

const StatusSwitch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isAvailable, setAvailable] = useState(false);
  const userDetails = route.params ? route.params.userDetails : null;

  const handleSwitchToggle = () => {
    setAvailable((prev) => !prev);
  };

  return (
    <View style={styles.container}>
    
    <View style={styles.content}>
      <Text style={styles.title}>{isAvailable ? 'Available' : 'Unavailable'}</Text>
      <Switch value={isAvailable} onValueChange={handleSwitchToggle} />
    </View>
    <Header userDetails={userDetails} />
    <NavBar navigation={navigation}/>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#242424',
    alignContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
   
  },
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }], // Increase the size
    
  },
  title: {
    marginTop: 20,
    fontSize: 40, // Adjust the fontSize as needed
    color: 'white', // Change the color to your desired color
    padding: 40,
  },
});

export default StatusSwitch;
