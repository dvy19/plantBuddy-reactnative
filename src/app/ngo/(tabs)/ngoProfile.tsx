import { View, Text, Pressable, StyleSheet, Platform , SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";import React, { useEffect, useState } from 'react'
import { tokenStorage } from '@/services/tokenStorage';
import { router } from 'expo-router';

const ngoProfile = () => {

  const handleLogout=async()=>{

    await tokenStorage.clearTokens()
    await tokenStorage.removeRole()


    router.push('/ngoLogin')
  }


      

  return (

    <Pressable
                    style={({ pressed }) => [
                      styles.logoutButton,
                      pressed && Platform.OS === "ios" && styles.pressed,
                    ]}
                    onPress={handleLogout}
                    android_ripple={{ color: "rgba(220, 38, 38, 0.08)" }}
                  >
                    <Ionicons name="log-out-outline" size={20} color="#DC2626" />
                    <Text style={styles.logoutText}>Log Out</Text>
                  </Pressable>

    
    
  )
}

const styles=StyleSheet.create({

  logoutButton: {
    flexDirection: "row",
    height: 52,
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#DC2626",
  },
  pressed: {
    opacity: 0.85,
  },


}
)

export default ngoProfile