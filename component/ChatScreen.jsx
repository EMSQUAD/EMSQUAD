import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Keyboard, ImageBackground, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const textInputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    try {
      await axios.post('YOUR_API_ENDPOINT/messages', newMessages);
      setText('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
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
      'Would you like to take a photo or choose from gallery?',
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
      alert('Sorry, we need camera permissions to make this work!');
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

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/chatImage.jpg')} style={styles.backgroundImage}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Type a message..."
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
          bottomOffset={34}
        />
        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={handlePickImage}>
              <Text style={styles.optionText}>Pick Image</Text>
            </TouchableOpacity>
          </View>
        )}
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
  optionsContainer: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  optionButton: {
    padding: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ChatScreen;