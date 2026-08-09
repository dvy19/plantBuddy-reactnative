import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function CategoryCard({
  title,
  icon,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && Platform.OS === "ios" && styles.pressed,
      ]}
      onPress={onPress}
      android_ripple={{
        color: "rgba(46, 125, 50, 0.12)",
        borderless: false,
      }}
    >
      <View style={styles.iconBadge}>
        <Ionicons name={icon} size={28} color="#2E7D32" />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%", 
    height: 124,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8F5E9",
    overflow: "hidden", // Required for android_ripple clipping within border radius

    // Elevation & Shadow styling for depth
    elevation: 2,
    shadowColor: "#1B5E20",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1B5E20",
    textAlign: "center",
    letterSpacing: 0.1,
  },
});