import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleAlign: "left",
    });
  }, [navigation, userName, userImageUrl]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://server-ems-rzdd.onrender.com/messages/byIdUse/${userId}`
        );
        let fetchedMessages = response.data.data || [];
        fetchedMessages.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const transformedMessages = fetchedMessages.map((msg) => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.id_use,
            name: userName,
            avatar: userImageUrl,
          },
          image: msg.imageUrl,
        }));
        setMessages(transformedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Error", "Could not fetch messages.");
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const onSend = async (newMessages = []) => {
    if (newMessages.length > 0) {
      try {
        const messageToSend = {
          id_use: userId,
          text: newMessages[0].text,
        };
        await axios.post(
          "https://server-ems-rzdd.onrender.com/messages",
          messageToSend
        );
      } catch (error) {
        console.error("Error sending message:", error);
        Alert.alert("Error", "Could not send the message.");
      }
    }
  };

  const renderBubble = (props) => {
    const isCurrentUserMessage = props.currentMessage.user._id === userId;

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: isCurrentUserMessage ? "#0084ff" : "#e6e6e6",
          },
          left: {
            backgroundColor: !isCurrentUserMessage ? "#e6e6e6" : "#0084ff",
          },
        }}
        textStyle={{
          right: {
            color: isCurrentUserMessage ? "white" : "black",
          },
          left: {
            color: !isCurrentUserMessage ? "black" : "white",
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/chatImage.jpg")}
        style={styles.backgroundImage}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: userId }}
          renderBubble={renderBubble}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  imgAndTxt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  personImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  personName: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
});

export default ChatScreen;
