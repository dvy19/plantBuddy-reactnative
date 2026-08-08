import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

interface RegisterProps {
  navigation?: any; // Replace with your navigation prop type (e.g., StackNavigationProp)
}

export const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Insert your registration API logic here
    Alert.alert('Success', `Account created for ${email}`);
  };

  const handleNavigateToLogin = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  return (
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
          <TextInput
            style={styles.input}
            placeholder="enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
            <Text style={styles.submitButtonText}>Register</Text>
          </TouchableOpacity>

          {/* Login Navigation Row */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleNavigateToLogin}>
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

export default RegisterScreen;