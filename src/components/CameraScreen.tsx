import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {router} from 'expo-router'
import { File, Paths } from "expo-file-system";
export default function CameraScreen() {

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const [photo, setPhoto] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Camera permission is required</Text>

        <Button
          title="Allow Camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const takePhoto = async () => {
  if (!cameraRef.current) return;

  const result = await cameraRef.current.takePictureAsync();

  if (!result?.uri) return;

  console.log("Temporary URI:", result.uri);

  try {
    const fileName = `plant_${Date.now()}.jpg`;

    const destination = new File(Paths.document, fileName);

    const source = new File(result.uri);

    source.copy(destination);

    console.log("Permanent URI:", destination.uri);

    router.push({
      pathname: "/addNote",
      params: {
        imageUri: destination.uri,
      },
    });

  } catch (error) {
    console.log("Error saving image:", error);
  }
};

  return (
    <View style={styles.container}>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePhoto}
        >
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },

  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  captureInner: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "white",
  },

  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});