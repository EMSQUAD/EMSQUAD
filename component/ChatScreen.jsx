import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Keyboard, ImageBackground, Alert } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from 'axios';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [persons, setPersons] = useState([]);

  const textInputRef = useRef(null);
  const userId = route.params ? route.params.userId : null;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    fetchPersons();
    fetchMessages();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('https://server-ems-rzdd.onrender.com/user');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons: ', error);
      Alert.alert('Error', 'Failed to fetch persons. Please try again.');
    }
  };

  const fetchMessages = async () => {
    console.log("userId chatScreen", userId);
    try {
      const response = await axios.get(`https://server-ems-rzdd.onrender.com/messages/${userId}`);
      console.log('Server response for messages:', response.data); // Log the response data
      setMessages(response.data.messages || []); // Ensure this is an array
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };
  

  const onSend = async (newMessages = []) => {
    // Check if there is at least one new message to send
    if (newMessages.length > 0) {
      const messageToSend = {
        id_use: userId, // Assuming userId is the sender's ID
        text: newMessages[0].text, // Taking the text from the first new message
      };
  
      try {
        // Use Axios to post the message to the server
        const response = await axios.post('https://server-ems-rzdd.onrender.com/messages', messageToSend);
  
        // Check for successful response
        if (response.status === 201) {
          // Assuming the server response includes the message object
          const savedMessage = response.data;
  
          // Add the new message to the local state to display it in the UI
          setMessages(previousMessages => GiftedChat.append(previousMessages, [{
            ...newMessages[0], // Original message data
            _id: savedMessage.createdAt, // Use createdAt as unique id for the message
            createdAt: savedMessage.createdAt, // Use the server-provided timestamp
            imageUrl: savedMessage.imageUrl, // Include the imageUrl if provided by the server
          }]));
  
          setText(''); // Clear input field after successful send
        } else {
          // Handle any non-successful responses
          console.error('Message send unsuccessful:', response);
          Alert.alert('Error', 'Message send unsuccessful. Please try again.');
        }
      } catch (error) {
        // Handle errors in sending message
        console.error('Error sending message: ', error);
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    } else {
      console.error('No new message to send');
    }
  };

  console.log("success");
  
  
  

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are required to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const newMessage = {
        _id: Math.random().toString(36).substr(2, 9),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
        image: result.uri,
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
    }
  };

  const handleTextInputChange = (newText) => {
    setText(newText);
  };

  const renderSend = (props) => (
    <TouchableOpacity
      style={styles.sendButton}
      onPress={() => {
        props.onSend({ text: props.text });
        setText('');
      }}
      disabled={props.text.trim().length === 0}
    >
      <Text style={styles.sendButtonText}>Send</Text>
    </TouchableOpacity>
  );

  const handlePlusButtonPress = () => {
    Alert.alert(
      'Add a Photo',
      'Would you like to take a photo or choose from the gallery?',
      [
        {
          text: 'Take Photo',
          onPress: () => handleTakePhoto(),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => handlePickImage(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permissions are required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const newMessage = {
        _id: Math.random().toString(36).substr(2, 9),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
        image: result.uri,
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
    }
  };

  const renderMessageBubble = (props) => {
    return (
      <View style={{ backgroundColor: props.currentMessage.firstMessageOfDay ? '#f0f0f0' : 'transparent' }}>
        <Bubble {...props} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/chatImage.jpg')} style={styles.backgroundImage}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Type something..."
          alwaysShowSend
          renderAvatar={null}
          renderUsernameOnMessage
          listViewProps={{ style: styles.listView }}
          textInputStyle={styles.textInput}
          renderSend={renderSend}
          text={text}
          onInputTextChanged={handleTextInputChange}
          timeFormat="HH:mm"
          keyboardShouldPersistTaps="never"
          onPressActionButton={handlePlusButtonPress}
          bottomOffset={0}
          renderBubble={renderMessageBubble}
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
  giftedChatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  textInput: {
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginRight: 10,
    height: 20,
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 5,
  },
  sendButton: {
    alignItems: 'center',
    height: 35,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'red',
  },
});

export default ChatScreen;
