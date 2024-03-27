// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const SettingsPage = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Settings</Text>
//       <Button title="Add User" onPress={() => navigation.navigate('AddUser')} />
//       {/* Add more settings options here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default SettingsPage;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure react-native-vector-icons is installed

// const settingsOptions = [
//   {
//     title: 'הוספת משתמש חדש',
//     icon: 'user-plus',
//     navigateTo: 'AddUser',
//   },
//   {
//     title: 'Account Settings',
//     icon: 'cogs',
//     navigateTo: 'AccountSettings',
//   },
//   {
//     title: 'Privacy',
//     icon: 'lock',
//     navigateTo: 'PrivacySettings',
//   },
//   // Add more settings options as needed
// ];

// const SettingsPage = ({ navigation }) => {
//   return (
//     <ScrollView style={styles.container}>
//       {settingsOptions.map((option, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.optionContainer}
//           onPress={() => navigation.navigate(option.navigateTo)}
//         >
//           <View style={styles.optionContent}>
//             <Text style={styles.optionText}>{option.title}</Text>
//             <Icon name={option.icon} size={24} color="black" style={styles.icon} />
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   optionContainer: {
//     flexDirection: 'row-reverse', // Align items to the right
//     // alignItems: 'center',
//     justifyContent: 'flex-start', // Align text and icon to the right
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCCCCC',
//   },
//   optionContent: {
//     flexDirection: 'row-reverse', // Ensure icon appears to the left of text
//     alignItems: 'center',
//   },
//   icon: {
//     textAlign: 'left', // Ensure icon is right-aligned
//     // marginRight: 20, // Add space on the left side of the icon
//   },
//   optionText: {
//     fontSize: 18,
//     textAlign: 'right', // Ensure text is right-aligned
//   },
// });

// export default SettingsPage;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure react-native-vector-icons is installed

const settingsOptions = [
  {
    title: 'הוספת משתמש חדש',
    icon: 'user-plus',
    navigateTo: 'AddUser',
  },
  {
    title: 'Account Settings',
    icon: 'cogs',
    navigateTo: 'AccountSettings',
  },
  {
    title: 'Privacy',
    icon: 'lock',
    navigateTo: 'PrivacySettings',
  },
  // Add more settings options as needed
];

const SettingsPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => navigation.navigate(option.navigateTo)}
        >
          {/* Icon aligned to left */}
          <Icon name={option.icon} size={24} color="black" style={styles.icon} />
          {/* Text aligned to right */}
          <Text style={styles.optionText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

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

export default SettingsPage;

