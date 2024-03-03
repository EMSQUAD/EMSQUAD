// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const GreetingMessage = ({ user }) => {
  
//   const getGreetingMessage = () => {
//     const currentHour = new Date().getHours();

//     if (currentHour >= 5 && currentHour < 12) {
//       return 'בוקר טוב '; 
//     } else if (currentHour >= 12 && currentHour < 17) {
//       return 'צהריים טובים '; 
//     } else if (currentHour >= 17 && currentHour < 22) {
//       return 'ערב טוב '; 
//     } else {
//       return 'לילה טוב ' ; 
//     }
//   };

//   return (
//     <View style={styles.greetingContainer}>
//       <Text style={styles.greetingText}>{`${getGreetingMessage()} ${user ? user.first_name : ''}`}</Text>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     greetingContainer: {
//         width: "100%",
//     },
//     greetingText: {
//         color: 'white',
//         fontSize: 24,
//     },
// });


// export default GreetingMessage;

// GreetingMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GreetingMessage = ({ user }) => {
  // console.log('user:', user);
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'בוקר טוב '; 
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'צהריים טובים '; 
    } else if (currentHour >= 17 && currentHour < 22) {
      return 'ערב טוב '; 
    } else {
      return 'לילה טוב ' ; 
    }
  };

  return (
    <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>{`${getGreetingMessage()} ${user ? user.first_name : ''}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    width: '100%',
  },
  greetingText: {
    color: 'white',
    fontSize: 24,
  },
});

export default GreetingMessage;
