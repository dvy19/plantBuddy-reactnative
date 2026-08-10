import React, { useEffect, useState } from 'react'
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

import {NgoService} from '../../../services/NgoService';

import {router} from 'expo-router'

import { tokenStorage } from '../../../services/tokenStorage';

const createCampaign = () => {


    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[location,setLocation]=useState("");
    const[requiredVolun,setRequiredVolun]=useState("");
    const[goalAmount,setGoalAmount]=useState("");
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[isActive,setIsActive]=useState(true)

    const[loading,setLoading]=useState(false);


    const[loggedIn,setIsLoggedIn]=useState(false);

    const checkLogin=async()=>{
      const token=await tokenStorage.getAccessToken()

      if(token){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    };

    useEffect(()=>{
      checkLogin()
    },[]);

    
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


      const handleSubmit=async()=>{
        setLoading(true)

          try{
            const res=await NgoService.createCampaign({
                title,
                location,
                description,
                is_active:isActive,
                end_date:endDate,
                start_date:startDate,
                logo,
                required_volunteers:requiredVolun,
                goal_amount:goalAmount
            })

            setLoading(false)
            console.log("success")
        }
        catch(err){
          console.log(`${err}`)
        }
      };

  return (

    <>

    {loggedIn && (
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
          value={title}
          onChangeText={setTitle}
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
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
  
        <View style={styles.dates}> 
              <TextInput
              style={styles.datesinput}
              placeholder="Start Date"
              value={startDate}
              onChangeText={setStartDate}
            />
      
            <TextInput
              style={styles.datesinput}
              placeholder="End Date"
              value={endDate}
              onChangeText={setEndDate}
              autoCapitalize="none"
            />
        </View>
  
        <TextInput
          style={styles.input}
          placeholder="Required Volunteers"
          value={requiredVolun}
          onChangeText={setRequiredVolun}
        />

        <TextInput
          style={styles.input}
          placeholder="Goal Amount"
          value={goalAmount}
          onChangeText={setGoalAmount}
        />
  
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    ) }

    {!loggedIn && (
      <View>
        <Text>
          Please login to create a campaign.
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/ngologin')}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        </View>
        )} 
    </>
  
  
      
    );
}


  
const styles = StyleSheet.create({

  dates:{

    display:"flex",
    flex:1,
    flexDirection:"row",
    gap:10,
    marginHorizontal:6,
  },

  datesinput:{
    width:"50%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,

  },
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
      marginBottom:80,
    },
  
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  export default createCampaign