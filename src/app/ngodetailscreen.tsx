import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {NgoService} from '../services/NgoService';

import {router} from 'expo-router'

export default function NgoDetailsScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");

  const [logo, setLogo] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setLogo({
        uri: asset.uri,
        name: asset.fileName ?? "ngo_logo.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleSubmit = async () => {
            console.log({
              name,
              description,
              address,
              phone,
              website,
              city,
              logo,
            });


    try{
      const res=await NgoService.createNgo(
      {
        name,
        description,
        address,
        phone_number:phone,
        website,
        city,
        logo
      }
    )

    router.push('/ngo/(tabs)/ngoHome')
    }
    catch(err:any){
        console.log("ERROR:", err.response?.data || err.message);

    }

    // ngoService.createNgo({...})
  };

  return (

    <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>NGO Details</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        {logo ? (
          <Image source={{ uri: logo.uri }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.cameraText}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.imageText}>Add NGO Logo</Text>

      <TextInput
        style={styles.input}
        placeholder="NGO Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },

  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  cameraText: {
    fontSize: 40,
    color: "#666",
  },

  imageText: {
    marginTop: 10,
    marginBottom: 25,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  multiline: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#2E7D32",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});