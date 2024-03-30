import { React, useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  Platform,
  Button,
} from "react-native";
import { Audio } from "expo-av";
import socket from "../utils/socket";
import * as FileSystem from "expo-file-system";


const WalkieTalkiePTT = () => {
  const [recording, setRecording] = useState(null);
  const [allowsRecordingIOS, setAllowsRecordingIOS] = useState(true);
  useEffect(() => {
    async function setAudioMode() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: allowsRecordingIOS,
          playsInSilentModeIOS: true,
        });
      } catch (error) {
        console.error("Failed to set audio mode:", error);
      }
    }

    setAudioMode();
  }, [allowsRecordingIOS]);

  async function startRecording() {
    console.log("startRecording called");
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        const recordingObject = new Audio.Recording();

        await recordingObject.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recordingObject);
        await recordingObject.startAsync();
        console.log("Recording started");
      } else {
        throw new Error("Permission not granted");
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  }

  async function stopRecording() {
    console.log("stopRecording called");
    try {
      await recording.stopAndUnloadAsync();
      const { sound: soundObject, status } =
        await recording.createNewLoadedSoundAsync();
      await soundObject.setVolumeAsync(1.0);

      const audioUri = recording.getURI();
      const audioData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await socket.emit("cmessage", audioData);
      console.log("Recording stopped and stored length:", audioData.length);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    } finally {
      setRecording(null);
    }
  }

  socket.on("smessage", async (msg) => {
    console.log("smessage length:", msg.length);
    const audioBase64 = msg;
    const audioUri = `data:audio/m4a;base64,${audioBase64}`;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      await sound.setVolumeAsync(1.0);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isBuffering) {
          sound.playAsync();
        }
      });
    } catch (err) {
      console.error("Failed to play the recording:", err);
    }
  });

  const handlePressIn = async () => {
    console.log("handlePressIn called");
    if (Platform.OS === "ios") {
      setAllowsRecordingIOS(true);
    }
    await startRecording();
  };

  const handlePressOut = async () => {
    console.log("handlePressOut called");
    await stopRecording();
    if (Platform.OS === "ios") {
      setAllowsRecordingIOS(false);
    }
  };

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={require("../assets/images/symbol_solider_w.png")}
          style={[styles.backgroundImage, { width: 200, height: 200 }]}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },

});

export default WalkieTalkiePTT;
