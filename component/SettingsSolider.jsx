// export default SettingsPage;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure react-native-vector-icons is installed

const settingsOptions = [
    {
        title: 'הוסף משימות',
        icon: 'tasks',
        navigateTo: 'AddTask',
    },
    {
        title: 'סטטוס',
        icon: 'check-circle',
        navigateTo: 'Status',
    },
    {
        title: 'רשימת צוות',
        icon: 'list',
        navigateTo: 'List',
    },
    {
        title: 'עריכת פרופיל',
        icon: 'edit',
        navigateTo: 'EditProfile',
    },
    // Add more settings options as needed
    ];

const SettingsSoliderPage = ({ navigation, route }) => {
    return (
        <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
        key={index}
        style={styles.optionContainer}
        onPress={() => navigation.navigate(option.navigateTo,{ userDetails })}
      >
        <Icon name={option.icon} size={24} color="black" style={styles.icon} />
        <Text style={styles.optionText}>{option.title}</Text>
      </TouchableOpacity>
      ))}
    </ScrollView>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 20,
//     },
//     option: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     optionText: {
//         fontSize: 18,
//         marginLeft: 20,
//     },
// });
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    optionContainer: {
      flexDirection: 'row', // Lay out items in a row
      justifyContent: 'space-between', // Place content at the edges
      alignItems: 'center', // Vertically align items in the middle
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      width: '100%', // Ensure the container takes up the full width
    },
    icon: {
      // Icon styles if needed, e.g., padding
    },
    optionText: {
      fontSize: 18,
      flex: 1, // Take up the remaining space to push the icon to the edge
      textAlign: 'right', // Align text to the right
      paddingRight: 20, // Optional: Adjust based on your layout needs
    },
  });

export default SettingsSoliderPage;