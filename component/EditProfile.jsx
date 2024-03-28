import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';



const EditProfileScreen = ({ route }) => {
    const userDetails = route.params.userDetails;
  // Initial user profile state with empty fields
  const [userProfile, setUserProfile] = useState({
    id_use: userDetails?.id || '',
    first_name: userDetails?.first_name || '',
    last_name: userDetails?.last_name || '',
    phone: userDetails?.phone || '',
    type_user: userDetails?.type_user || '',
    status_ability: userDetails?.status_ability || '',
    certifications: userDetails?.certifications || '',
    password: userDetails?.password || '',
    image: userDetails?.image || '',
  });

  useEffect(() => {
    console.log("userDetails received in EditProfileScreen:", userDetails);
    console.log("userDetails received:", userDetails);
    console.log("Phone number:", userDetails?.phone);
    console.log("User certification:", userProfile?.certifications);
    if (!userDetails) {
        fetchUserData();
    }
  }, []);

  console.log("userDetails received:", userDetails);

  const handleSave = async () => {
    try {
      const response = await fetch('https://server-ems-rzdd.onrender.com/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_use: userProfile.id_use,
          password: userProfile.password,
        //   certifications: userProfile.certifications,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        const result = await response.json();
        throw new Error(result.message || 'An error occurred while updating the profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleInputChange = (name, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (!userProfile.id_use) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: userProfile.image }} style={styles.profileImage} />
      <Text style={styles.label}>שם פרטי: {userProfile.first_name}</Text>
      <Text style={styles.label}>שם משפחה: {userProfile.last_name}</Text>
      <Text style={styles.label}>פלאפון: {userProfile.phone}</Text>
      <Text style={styles.label}>סוג משתמש: {userProfile.type_user}</Text>
      <Text style={styles.label}>סטטוס: {userProfile.status_ability}</Text>
      <Text style={styles.label}>אישורים: {userProfile.certifications}</Text>
      
      <View style={styles.formRow}>
        <Text style={styles.label}>סיסמא:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />
      </View>
      
      {/* <View style={styles.formRow}>
        <Text style={styles.label}>אישורים:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.certifications}
          onChangeText={(text) => handleInputChange('certifications', text)}
        />
      </View> */}
      
      <Button title="שמירת שינויים" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formRow: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    marginRight: 5,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    height: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default EditProfileScreen;
