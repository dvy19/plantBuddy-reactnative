import React, { useState , useEffect } from "react";
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
  Modal,
  SafeAreaView
} from "react-native";

import * as ImagePicker from "expo-image-picker";


import {router} from 'expo-router'
import authService from "../../services/authService";
import { VolunteerResponse } from "@/models/MiscModels";

export default function VolteerProfileScreen() {

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const[hasProfile,setHasProfile]=useState(false)

  const[volunteer,setVolunteer]=useState<VolunteerResponse>()

  const checkProfile=async()=>{

    try{
        const data=await authService.getVolunteerProfile()

        setHasProfile(true)

        setVolunteer(data)
    }
    catch(err){
        console.log(`${err}`)
    }
  }

  useEffect(()=>{
    checkProfile()
  } , [])

  const genderOptions = ['Male', 'Female', 'Other'];

  const [isGenderModalVisible, setGenderModalVisible] = useState(false);

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handlePhoneChange = (text : string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setPhone(cleaned);
    }
  };

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

      setImage({
        uri: asset.uri,
        name: asset.fileName ?? "ngo_logo.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleSubmit = async () => {

    try{

        const data=await authService.createVolunteerProfile({
            name,
            phone,
            image,
            city,
            gender
        })

        console.log(data.message)
    }
    catch(err){
        console.log(`${err}`)
    }
        
  };

  return (

   <View>

    {! hasProfile && 
     <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>NGO Details</Text>

        {/* Profile / Logo Image */}
        <TouchableOpacity
          style={styles.imagePickerContainer}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.cameraIcon}>+</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.imageText}>Add NGO Logo</Text>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>NGO Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter NGO name"
            placeholderTextColor="#9EA5B1"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Gender Dropdown Trigger */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Gender</Text>
          <TouchableOpacity
            style={[styles.input, styles.dropdownInput]}
            onPress={() => setGenderModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={gender ? styles.inputText : styles.placeholderText}>
              {gender || 'Select Gender'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Address Input */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Address</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Enter full address"
            placeholderTextColor="#9EA5B1"
            value={city}
            onChangeText={setCity}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Phone Input with +91 Prefix */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <View style={[styles.input, styles.phoneInputContainer]}>
            <Text style={styles.prefixText}>+91</Text>
            <View style={styles.prefixDivider} />
            <TextInput
              style={styles.phoneInputField}
              placeholder="10-digit number"
              placeholderTextColor="#9EA5B1"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* City Input */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="#9EA5B1"
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>

        {/* Gender Selection Modal */}
        <Modal
          visible={isGenderModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setGenderModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              {genderOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.optionItem,
                    gender === item && styles.optionItemSelected,
                  ]}
                  onPress={() => {
                    setGender(item);
                    setGenderModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      gender === item && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
    }

    {hasProfile && 

    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.profileContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Volunteer Profile</Text>

        {/* Volunteer Profile Card */}
        <View style={styles.card}>
          {/* Avatar Header */}
          <View style={styles.avatarSection}>
            <Image source={{ uri: volunteer?.data.image?.uri }} style={styles.profilePic} />
            <Text style={styles.volunteerName}>{volunteer?.data.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active Volunteer</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Details List */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{volunteer?.data.gender}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>City</Text>
              <Text style={styles.detailValue}>{volunteer?.data.city}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{volunteer?.data.phone}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            //onPress={handleEdit}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.profileButton, styles.deleteButton]}
            //onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

    }



   </View>

   
  );
}

const styles = StyleSheet.create({

    safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D1F',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },

  /* Card Container Styling */
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,

    // Soft Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#2E7D32',
  },
  volunteerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F3F5',
    marginVertical: 12,
  },

  /* Profile Details Styling */
  detailsContainer: {
    paddingTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '600',
  },

  /* Button Controls Styling */
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2E7D32',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE3E3',
  },
  deleteButtonText: {
    color: '#E03131',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D1F',
    textAlign: 'center',
    marginBottom: 24,
  },

  /* Image Picker Styles */
  imagePickerContainer: {
    alignSelf: 'center',
  },
  profilePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E9ECEF',
    borderWidth: 2,
    borderColor: '#DEE2E6',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  cameraIcon: {
    fontSize: 32,
    color: '#6C757D',
    fontWeight: '300',
  },
  imageText: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
    textAlign: 'center',
  },

  /* Form & Input Styles */
  formGroup: {
    width: '100%',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: '#212529',
  },
  inputText: {
    fontSize: 15,
    color: '#212529',
  },
  placeholderText: {
    fontSize: 15,
    color: '#9EA5B1',
  },
  multiline: {
    height: 90,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },

  /* Custom Field Variants */
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6C757D',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  prefixText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
  },
  prefixDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#CED4DA',
    marginHorizontal: 10,
  },
  phoneInputField: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#212529',
  },

  /* Action Button */
  profileButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* Modal Layout */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D1F',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionItemSelected: {
    backgroundColor: '#E8F5E9',
  },
  optionText: {
    fontSize: 15,
    color: '#343A40',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});