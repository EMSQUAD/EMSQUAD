import { Audio } from "expo-av";

let alarmSound;

const loadSound = async () => {
  try {
    alarmSound = new Audio.Sound();
    await alarmSound.loadAsync(
      require("../assets/sounds/security-alarm.mp3")
    );
  } catch (error) {
    console.error("Error loading sound:", error);
  }
};

const playSound = async () => {
  try {
    if (alarmSound) {
      await alarmSound.playAsync();
    }
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

const stopSound = async () => {
  try {
    if (alarmSound) {
      await alarmSound.stopAsync();
      await alarmSound.unloadAsync();
      alarmSound = null; // Reset the sound instance
    }
  } catch (error) {
    console.error("Error stopping sound:", error);
  }
};

export { loadSound, playSound, stopSound };
