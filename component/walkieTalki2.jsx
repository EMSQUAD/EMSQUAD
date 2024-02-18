// this 1 not really work
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




// this 2 work with logs
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import TalkButton from './TalkButton';

// const WalkieTalki2 = () => {
//   const handleRecordStart = () => {
//     // Implement the logic for record start
//     console.log('Recording started');
//   };

//   const handleRecordStop = () => {
//     // Implement the logic for record stop
//     console.log('Recording stopped');
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text>Your other components or UI elements</Text> */}
//       <TalkButton onRecordStart={handleRecordStart} onRecordStop={handleRecordStop} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#292424',
//   },
// });

// export default WalkieTalki2;



//2 try with database
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TalkButton from './TalkButton';

const WalkieTalki2 = () => {
  const [audioData, setAudioData] = useState(null);

  const handleRecordStart = () => {
    // Implement logic for starting recording
    console.log('Recording started');
  };

  const handleRecordStop = () => {
    // Implement logic for stopping recording
    console.log('Recording stopped');
    // Assuming 'audioBlob' is the recorded audio data in Blob format
    // Save the recording to the database (Replace 'saveRecordingToDatabase' with your actual API endpoint)
    saveRecordingToDatabase(audioBlob);
  };

  const saveRecordingToDatabase = async (audioBlob) => {
    // Example API endpoint for saving recordings
    const apiUrl = 'https://your-api-endpoint/save-recording';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/wav', // Adjust the content type based on your audio format
        },
        body: audioBlob,
      });

      if (response.ok) {
        console.log('Recording saved successfully');
      } else {
        console.error('Failed to save recording to the database');
      }
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  };

  const handlePlayRecording = async () => {
    // Example API endpoint for playing recordings
    const apiUrl = 'https://your-api-endpoint/play-recording';

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        // Assuming the response contains audio data in Blob format
        const audioData = await response.blob();
        setAudioData(audioData);
      } else {
        console.error('Failed to fetch recording from the database');
      }
    } catch (error) {
      console.error('Error fetching recording:', error);
    }
  };

  useEffect(() => {
    // Add any additional logic or cleanup for the audio player
    return () => {
      // Cleanup logic if needed
    };
  }, [audioData]);

  return (
    <View style={styles.container}>
      <TalkButton onRecordStart={handleRecordStart} onRecordStop={handleRecordStop} />
      <TouchableOpacity style={styles.button} onPress={handlePlayRecording}>
        <Text style={styles.text}>Play Recording</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green color for play button
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default WalkieTalki2;
