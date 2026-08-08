

import {LoginRequest} from '../../models/AuthModels';
import authService from '../../services/authService';
import { useState } from 'react';

import { Ionicons } from "@expo/vector-icons";

import {    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import {router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login=()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try{
            const data:LoginRequest = { email, password };

            const response=await authService.login(data);

            Alert.alert('Login Successful', `Welcome back, ${email}!`);

            // Handle successful login (e.g., navigate to the main app screen)
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    
    }

    return(
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>
    
            <View style={styles.formContainer}>
              {/* Email Input */}
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
    
              {/* Password Input */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
    <TextInput
        style={styles.passwordInput}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
    />

    <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
    >
        <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#999"
        />
    </TouchableOpacity>
</View>
    
              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={loading}>
                <Text style={styles.submitButtonText}>{loading ? 'Loading...' : 'Success'}</Text>
              </TouchableOpacity>
    
              {/* Login Navigation Row */}
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Create an account? </Text>
                <TouchableOpacity onPress={()=>{router.push('/(auth)/register')}}>
                  <Text style={styles.loginLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    };
    
const styles = StyleSheet.create({
    passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
},

passwordInput: {
    flex: 1,
    paddingVertical: 12,
},
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
    
    export default Login;