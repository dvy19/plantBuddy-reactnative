import * as Speech from "expo-speech";

export const speakText = (text: string) => {
  Speech.stop();

  Speech.speak(text, {
    language: "hi-In",
    pitch: 1,
    rate: 0.7,
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};

