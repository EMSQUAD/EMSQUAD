// import React, { useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity,View } from 'react-native';
// // import TalkButton from './component/TalkButton';
// import TalkButton from './TalkButton';


// // import UserList from './component/UserList';

// const talkButton = ({ isRecording, onRecordStart, onRecordStop }) => {
//   const [buttonColor, setButtonColor] = useState('#ccc');

//   const onPressIn = () => {
//     console.log('Button pressed in');
//     setButtonColor('#f00');
//     onRecordStart();
//   };

//   const onPressOut = () => {
//     console.log('Button pressed out');
//     setButtonColor('#ccc');
//     onRecordStop();
//   };

//   return (
//     <View>
//     <TouchableOpacity
//       style={[styles.button, { backgroundColor: buttonColor }]}
//       onPressIn={onPressIn}
//       onPressOut={onPressOut}
//     >
//       <Text style={styles.text}>לחץ והחזק לדבר</Text>
//     </TouchableOpacity>
//     {/* <UserList/> */}
//     <TalkButton/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: 200,
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: '#fff',
//   },
// });

// export default talkButton;

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TalkButton from './TalkButton';

const WalkieTalki2 = () => {
  const handleRecordStart = () => {
    // Implement the logic for record start
    console.log('Recording started');
  };

  const handleRecordStop = () => {
    // Implement the logic for record stop
    console.log('Recording stopped');
  };

  return (
    <View style={styles.container}>
      {/* <Text>Your other components or UI elements</Text> */}
      <TalkButton onRecordStart={handleRecordStart} onRecordStop={handleRecordStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292424',
  },
});

export default WalkieTalki2;
