import * as Speech from "expo-speech";

export const speakText = (text: string) => {
  Speech.stop();

  Speech.speak(text, {
    language: "hi-In",
    pitch: 2,
    rate: 0.6,
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};