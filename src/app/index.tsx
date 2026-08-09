import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../database/database';
export default function GetStarted() {

  useEffect(() => {
        try {
            initDatabase();
            console.log("SQLite database initialized");
        } catch (error) {
            console.error("SQLite initialization error:", error);
        }
    }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Visual / Illustration Area */}
      <View style={styles.imageContainer}>
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.emojiIcon}>🪴</Text>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <Text style={styles.badgeText}>WELCOME TO PLANTBUDDY</Text>
        <Text style={styles.title}>Keep your plants happy & thriving</Text>
        <Text style={styles.subtitle}>
          Track watering schedules, get smart care reminders, and identify plant diseases instantly.
        </Text>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push('/(main)/(tabs)/home')}
        >
          <Text style={styles.buttonText}>Start as a User</Text>
        </TouchableOpacity>

         {/* Action Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => router.push('/ngoregister')}
        >
          <Text style={styles.buttonText}>Continue as NGO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F4', // Soft botanical neutral background
  },
  imageContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustrationPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E8F3E8',
    justifyContent: 'center',
    alignItems: 'center',
    // Soft drop shadow
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  emojiIcon: {
    fontSize: 90,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 24,
    justifyContent: 'space-between',
    // Card elevation
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B2E1B',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#607260',
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2E7D32', // Vibrant plant green
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 12,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});