import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { useState } from "react";

export default function AddNoteScreen() {

  const router = useRouter();

 const { imageUri } = useLocalSearchParams<{
    imageUri?: string;
  }>();

  console.log("IMAGE URI:", imageUri);


  const [note, setNote] = useState<string>("");

  const handleSave = () => {

    console.log("Image URI:", imageUri);

    console.log("Note:", note);

    // We will add SQLite saving here later

    router.back();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Add Note
      </Text>

      {/* Photo */}

  <Text>
        {imageUri ?? "No URI received"}
      </Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
          onLoad={() => console.log("IMAGE LOADED")}
          onError={(error) => {
            console.log(
              "IMAGE ERROR:",
              error.nativeEvent
            );
          }}
        />
      )}

      {/* Note */}

      <Text style={styles.label}>
        Note
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Write something about this plant..."
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />

      {/* Save */}

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 300,
  
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    height: 120,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});