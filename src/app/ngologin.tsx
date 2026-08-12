import React from 'react'
import {
  SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import { tokenStorage } from '../services/tokenStorage';
import {useState, useEffect} from 'react'
import authService from '@/services/authService';

import { LoginRequest } from '../models/AuthModels';

import {router} from 'expo-router'

const NgoLoginScreen = () => {

    const[mail,setMail]=useState("");
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");

    const[role,serRole]=useState("role")

    const handleSubmit=async()=>{

         if (!mail || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
                }
        
        Alert.alert('form submitted', `Email: ${mail}, Password: ${password}`);
        
        setLoading(true);
        

        try{

            const data: LoginRequest = { email: mail, password: password}; 
            
            const res=await authService.login(data)

            setLoading(false)


            await tokenStorage.saveTokens(
                          res.tokens.access,
                          res.tokens.refresh
            )


            await tokenStorage.saveRole(res.role)

            router.push('/ngo/ngoHome')

        }
        catch(err){
                    setLoading(false);
                    setError(`${err}`);
                    Alert.alert("Error Loging User")
            }

    };


   return(
     <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.innerContainer}
       >
         <View style={styles.headerContainer}>
           <Text style={styles.title}>Continue with NGOs Account</Text>
           <Text style={styles.subtitle}>Enter to get started</Text>
         </View>
 
         <View style={styles.formContainer}>

           <Text style={styles.label}>Official Email Address</Text>
           <TextInput
             style={styles.input}
             placeholder="enter your email"
             placeholderTextColor="#999"
             keyboardType="email-address"
             autoCapitalize="none"
             autoCorrect={false}
             value={mail}
             onChangeText={setMail}
           />
 
           <Text style={styles.label}>Password</Text>
           <TextInput
             style={styles.input}
             placeholder="enter your password"
             placeholderTextColor="#999"
             secureTextEntry
             value={password}
             onChangeText={setPassword}
           />
 
           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
             <Text style={styles.submitButtonText}>{loading ? 'Logging...' : 'Login'}</Text>
           </TouchableOpacity>
 
           <View style={styles.loginRow}>
             <Text style={styles.loginText}>New Here? </Text>
             <TouchableOpacity onPress={()=>{router.push('/(auth)/register')}}>
               <Text style={styles.loginLink}>Log In</Text>
             </TouchableOpacity>
           </View>
         </View>
       </KeyboardAvoidingView>
     </SafeAreaView>
   );
 };
 
const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#ffffff',
   },
   innerContainer: {
     flex: 1,
     justifyContent: 'center',
     paddingHorizontal: 24,
   },
   headerContainer: {
     marginBottom: 32,
   },
   title: {
     fontSize: 28,
     fontWeight: '700',
     color: '#1a1a1a',
     marginBottom: 8,
   },
   subtitle: {
     fontSize: 16,
     color: '#666666',
   },
   formContainer: {
     width: '100%',
   },
   label: {
     fontSize: 14,
     fontWeight: '600',
     color: '#333333',
     marginBottom: 6,
   },
   input: {
     height: 50,
     borderWidth: 1,
     borderColor: '#e0e0e0',
     borderRadius: 8,
     paddingHorizontal: 16,
     fontSize: 16,
     backgroundColor: '#f9f9f9',
     color: '#333333',
     marginBottom: 20,
   },
   submitButton: {
     height: 50,
     backgroundColor: '#007AFF',
     borderRadius: 8,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 10,
     shadowColor: '#007AFF',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.2,
     shadowRadius: 4,
     elevation: 3,
   },
   submitButtonText: {
     color: '#ffffff',
     fontSize: 16,
     fontWeight: '600',
   },
   loginRow: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 24,
   },
   loginText: {
     fontSize: 14,
     color: '#666666',
   },
   loginLink: {
     fontSize: 14,
     color: '#007AFF',
     fontWeight: '600',
   },
 });
 
 export default NgoLoginScreen;