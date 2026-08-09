import { View, Text, Pressable, StyleSheet, Platform , SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";import React, { useEffect, useState } from 'react'
import { tokenStorage } from '../../../services/tokenStorage';
import {router} from 'expo-router'
import authService from "../../../services/authService";
import { UserdetailResponse } from "@/models/AuthModels";

const profile = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [profile, setProfile] = useState<UserdetailResponse | null>(null);

const getProfile = async () => {
  try {
    const userProfile = await authService.getProfile();

    console.log("PROFILE:", userProfile);

    setProfile(userProfile);
  } catch (error) {
    console.log("GET PROFILE ERROR:", error);
  }
}

const checkLogin = async () => {
  try {
    const token = await tokenStorage.getAccessToken();

    console.log("TOKEN EXISTS:", !!token);

    if (!token) {
      setIsLoggedIn(false);
      setProfile(null);
      return;
    }

    console.log("USER IS LOGGED IN");

    const userProfile = await authService.getProfile();

    console.log("PROFILE RECEIVED:", userProfile);

    setProfile(userProfile);
    setIsLoggedIn(true);

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    setIsLoggedIn(false);
  }
};

useEffect(() => {
  checkLogin();
}, []);

const handleLogout = async () => {
  await tokenStorage.clearTokens();

  setIsLoggedIn(false);
  setProfile(null);
};


 return (
    <View>
        {!isLoggedIn && 
                <View style={styles.container}>
              <View style={styles.textGroup}>
                <View style={styles.welcomeBadge}>
                  <Ionicons name="sparkles-outline" size={14} color="#2E7D32" />
                  <Text style={styles.welcomeText}>WELCOME TO PLANT CARE</Text>
                </View>

                <Text style={styles.heading}>Grow Your Personal Jungle</Text>
                <Text style={styles.subheading}>
                  Create an account to track watering schedules, save favorite plants, and get personalized tips.
                </Text>
              </View>

              <View style={styles.buttonGroup}>
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && Platform.OS === "ios" && styles.pressed,
                  ]}
                  onPress={()=>router.push('/(auth)/register')}
                  android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                >
                  <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>Create Your Account</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && Platform.OS === "ios" && styles.pressed,
                  ]}
                  onPress={()=>router.push('/(auth)/login')}
                  android_ripple={{ color: "rgba(46, 125, 50, 0.08)" }}
                >
                  <Ionicons name="log-in-outline" size={18} color="#2E7D32" />
                  <Text style={styles.secondaryButtonText}>Log In</Text>
                </Pressable>

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
              </View>
            </View>
        }

        {isLoggedIn  &&


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
         

          {/* User Details */}
          <Text style={styles.userName}>{profile?.data?.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color="#6B7280" />
            <Text style={styles.userCity}>{profile?.data?.city}</Text>
          </View>
        </View>

        {/* Menu Navigation Group */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="leaf-outline"
            title="Your Plants"
            subtitle="Manage your personal garden & care reminders"
            onPress={()=>router.push('/(main)/SavedPlantScreen')}
            badgeCount={5}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="settings-outline"
            title="Settings"
            subtitle="App preferences, notifications & account"
           // onPress={onNavigateSettings}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="grid-outline"
            title="More Options"
            subtitle="Help center, feedback & about plant care"
            //onPress={onNavigateMore}
          />
        </View>

        {/* Bottom Logout Action */}
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
      </ScrollView>

        }

    </View>

  );
}

// Reusable List Item Component
function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  badgeCount,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
  badgeCount?: number;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && Platform.OS === "ios" && styles.pressed,
      ]}
      onPress={onPress}
      android_ripple={{ color: "rgba(46, 125, 50, 0.08)" }}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconBg}>
          <Ionicons name={icon} size={20} color="#2E7D32" />
        </View>
        <View style={styles.menuTextGroup}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.menuItemRight}>
        {badgeCount !== undefined && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{badgeCount}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </Pressable>
  );
}


export default profile;

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8F5E9",

    // Android elevation & iOS shadow
    elevation: 2,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#E8F5E9",
  },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#2E7D32",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: -0.2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  userCity: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E8F5E9",
    overflow: "hidden",

    elevation: 2,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  iconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 72, // Aligns divider with text start
  },
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
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#E8F5E9",

    // Soft Android Elevation & iOS Shadow
    elevation: 3,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  textGroup: {
    alignItems: "center",
    marginBottom: 24,
  },

  welcomeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 12,
  },

  welcomeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
    letterSpacing: 0.8,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.3,
  },

  subheading: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  buttonGroup: {
    gap: 12,
  },

  primaryButton: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#2E7D32",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    overflow: "hidden", // Required for android_ripple clip

    elevation: 2,
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },

  secondaryButton: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E7D32",
    letterSpacing: 0.2,
  },
});