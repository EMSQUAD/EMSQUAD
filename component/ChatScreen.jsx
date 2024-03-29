// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Keyboard, ImageBackground, Alert, Image } from 'react-native';
// import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import * as ImagePicker from 'expo-image-picker';
// import { useRoute, useNavigation } from "@react-navigation/native";
// import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';

// const ChatScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
//   const [persons, setPersons] = useState([]);

//   const textInputRef = useRef(null);
//   const userId = route.params ? route.params.userId : null;

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
//     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     fetchPersons();
//     fetchMessages();
//   }, []);


//   const navigation = useNavigation();
//   const { userName, userImageUrl } = route.params;

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: () => (
//         <View style={styles.imgAndtxt}>
//           <Text style={styles.personName}>{userName}</Text>
//           <Image source={{ uri: userImageUrl }} style={styles.personImage} />
//         </View>
//       ),
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//       ),
//       headerStyle: {
//         backgroundColor: 'black',
//         height: 200, // Attempting to increase the height
//       },
//       headerTintColor: '#fff',
//       headerTitleAlign: 'left',
//     });
//   }, [navigation, userName, userImageUrl]);
  

//   const fetchPersons = async () => {
//     try {
//       const response = await axios.get('https://server-ems-rzdd.onrender.com/user');
//       setPersons(response.data);
//     } catch (error) {
//       console.error('Error fetching persons: ', error);
//       Alert.alert('Error', 'Failed to fetch persons. Please try again.');
//     }
//   };

//   // const fetchMessages = async () => {
//   //   console.log("userId chatScreen", userId);
//   //   try {
//   //     const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/${userId}`);
//   //     console.log('Server response for messages:', response.data); // Log the response data
//   //     setMessages(response.data.messages || []); // Ensure this is an array
//   //   } catch (error) {
//   //     console.error('Error fetching messages: ', error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchMessages();
//     const intervalId = setInterval(fetchMessages, 2000);
//     return () => clearInterval(intervalId);
//   }, []);

  
//   // const fetchMessages = async () => {
//   //   try {
//   //     const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/${userId}`);
//   //     const fetchedMessages = response.data.messages || [];
//   //     setMessages(prevMessages => {
//   //       const updatedMessages = GiftedChat.append(prevMessages, fetchedMessages);
//   //       console.log('Updated Messages:', updatedMessages);
//   //       return updatedMessages;
//   //     });
//   //   } catch (error) {
//   //     console.error('Error fetching messages: ', error);
//   //   }

//   // };
  
//   // const fetchMessages = async () => {
//   //   try {
//   //     const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/byIdUse/${userId}`);
//   //     const fetchedMessages = response.data.data || []; // Ensure this matches the structure of your response
//   //     setMessages(previousMessages => GiftedChat.append(previousMessages, fetchedMessages.map(msg => ({
//   //       ...msg,
//   //       _id: msg._id || Math.random().toString(36),
//   //       user: {
//   //         _id: msg.id_use,
//   //         // Add other user properties here
//   //       },
//   //       createdAt: new Date(msg.createdAt),
//   //       text: msg.text,
//   //       image: msg.imageUrl,
//   //     }))));
//   //   } catch (error) {
//   //     console.error('Error fetching messages: ', error);
//   //   }
//   // };
  
//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/byIdUse/${userId}`);
//       const fetchedMessages = response.data.data || [];
//       setMessages(GiftedChat.append([], fetchedMessages.map(msg => ({
//         _id: msg._id,
//         text: msg.text,
//         createdAt: new Date(msg.createdAt),
//         user: { _id: msg.id_use },
//         image: msg.imageUrl,
//       }))));
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };
  

  


  

//   const onSend = async (newMessages = []) => {
//     if (newMessages.length > 0) {
//       try {
//         const messageToSend = {
//           id_use: userId,
//           text: newMessages[0].text,
//           // Add imageUrl if you're sending images
//         };
  
//         const response = await axios.post('https://server-ems-rzdd.onrender.com/messages', messageToSend);
//         if (response.status === 201) {
//           console.log("Message sent successfully:", response.data);
//           // Optionally, you could fetch messages again here to refresh the list
//         } else {
//           console.error('Message send unsuccessful:', response);
//         }
//       } catch (error) {
//         console.error('Error sending message: ', error);
//       }
//     }
//   };
  


//   const handlePickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Camera roll permissions are required to upload images.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       const newMessage = {
//         _id: Math.random().toString(36).substr(2, 9),
//         text: '',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//         },
//         image: result.uri,
//       };
//       setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
//     }
//   };

//   const handleTextInputChange = (newText) => {
//     setText(newText);
//   };

//   const renderSend = (props) => (
//     <TouchableOpacity
//       style={styles.sendButton}
//       onPress={() => {
//         props.onSend({ text: props.text });
//         setText('');
//       }}
//       disabled={props.text.trim().length === 0}
//     >
//       <Text style={styles.sendButtonText}>Send</Text>
//     </TouchableOpacity>
//   );

//   const handlePlusButtonPress = () => {
//     Alert.alert(
//       'Add a Photo',
//       'Would you like to take a photo or choose from the gallery?',
//       [
//         {
//           text: 'Take Photo',
//           onPress: () => handleTakePhoto(),
//         },
//         {
//           text: 'Choose from Gallery',
//           onPress: () => handlePickImage(),
//         },
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleTakePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Camera permissions are required to take photos.');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       const newMessage = {
//         _id: Math.random().toString(36).substr(2, 9),
//         text: '',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//         },
//         image: result.uri,
//       };
//       setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
//     }
//   };

//   const renderMessageBubble = (props) => {
//     return (
//       <View style={{ backgroundColor: props.currentMessage.firstMessageOfDay ? '#f0f0f0' : 'transparent' }}>
//         <Bubble {...props} />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('../assets/images/chatImage.jpg')} style={styles.backgroundImage}>
//         <GiftedChat
//           messages={messages}
//           onSend={newMessages => onSend(newMessages)}
//           user={{ _id: 1 }}
//           placeholder="Type something..."
//           alwaysShowSend
//           renderAvatar={null}
//           renderUsernameOnMessage
//           listViewProps={{ style: styles.listView }}
//           textInputStyle={styles.textInput}
//           renderSend={renderSend}
//           text={text}
//           onInputTextChanged={handleTextInputChange}
//           timeFormat="HH:mm"
//           keyboardShouldPersistTaps="never"
//           onPressActionButton={handlePlusButtonPress}
//           bottomOffset={0}
//           renderBubble={renderMessageBubble}
//         />
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   giftedChatContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   listView: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   textInput: {
//     fontSize: 16,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//     marginRight: 10,
//     height: 20,
//     textAlign: 'right',
//     paddingRight: 10,
//     paddingTop: 5,
//   },
//   sendButton: {
//     alignItems: 'center',
//     height: 35,
//     marginBottom: 5,
//     justifyContent: 'center',
//     backgroundColor: 'black',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//   },
//   sendButtonText: {
//     color: 'red',
//   },
//   imgAndtxt: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     position: "absolute",
//     left: 90,
//   },

//   personImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     marginLeft: 20,
//     marginBottom: 5,
//   },
//   personName: {
//     color: 'white',
//     fontSize: 20,
//     paddingBottom: 10,
//   },
// });

// export default ChatScreen;



import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { userId, userName, userImageUrl } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.imgAndTxt}>
          <Text style={styles.personName}>{userName}</Text>
          <Image source={{ uri: userImageUrl }} style={styles.personImage} />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'left',
    });
  }, [navigation, userName, userImageUrl]);

  
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/byIdUse/${userId}`);
  //       let fetchedMessages = response.data.data || [];
  //       // Sort messages by createdAt in ascending order
  //       fetchedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //       // Transform messages to fit GiftedChat's format
  //       const transformedMessages = fetchedMessages.map(msg => ({
  //         _id: msg._id,
  //         text: msg.text,
  //         createdAt: new Date(msg.createdAt),
  //         user: {
  //           _id: msg.id_use,
  //           name: userName,
  //           avatar: userImageUrl,
  //         },
  //         image: msg.imageUrl,
  //       }));
  //       setMessages(transformedMessages);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //       Alert.alert('Error', 'Could not fetch messages.');
  //     }
  //   };

  //   fetchMessages();
  //   const intervalId = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
  //   return () => clearInterval(intervalId);
  // }, [userId]);
// Assume you have currentUserId available
const currentUserId = 'yourCurrentUserId'; // Replace with actual logic to obtain this

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/byIdUse/${userId}`);
      let fetchedMessages = response.data.data || [];
      fetchedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const transformedMessages = fetchedMessages.map(msg => ({
        _id: msg._id,
        text: msg.text,
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg.id_use.toString(), // Ensure _id is a string
          name: msg.id_use === parseInt(currentUserId) ? "You" : userName, // Adjust based on your needs
          avatar: userImageUrl,
        },
        // image: msg.imageUrl, // Uncomment if your messages include images
      }));
      setMessages(transformedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      Alert.alert('Error', 'Could not fetch messages.');
    }
  };

  fetchMessages();
  const intervalId = setInterval(fetchMessages, 5000);
  return () => clearInterval(intervalId);
}, [userId, currentUserId]); // Add currentUserId to dependency array if it's dynamic




  const onSend = async (newMessages = []) => {
    if (newMessages.length > 0) {
      try {
        const messageToSend = {
          id_use: userId,
          text: newMessages[0].text,
          // Include additional fields if necessary
        };
        await axios.post('https://server-ems-rzdd.onrender.com/messages', messageToSend);
        // You can choose to fetch messages here again or just append the new message to the local state
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Could not send the message.');
      }
    }
  };

 // Customizes the appearance of the message bubble
 const renderBubble = (props) => {
  // Swap the colors and positions based on the user._id
  const isCurrentUserMessage = props.currentMessage.user._id === userId;
  
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: isCurrentUserMessage ? '#0084ff' : '#e6e6e6', // Change color for sent messages
        },
        left: {
          backgroundColor: !isCurrentUserMessage ? '#e6e6e6' : '#0084ff', // Change color for received messages
        },
      }}
      textStyle={{
        right: {
          color: isCurrentUserMessage ? 'white' : 'black', // Optional: Change text color for better readability
        },
        left: {
          color: !isCurrentUserMessage ? 'black' : 'white', // Optional
        },
      }}
    />
  );
};

return (
  <View style={styles.container}>
    <ImageBackground source={require('../assets/images/chatImage.jpg')} style={styles.backgroundImage}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userId }} // This is important to distinguish between sent and received messages
        renderBubble={renderBubble}
      />
    </ImageBackground>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imgAndTxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  personImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  personName: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
});

export default ChatScreen;
