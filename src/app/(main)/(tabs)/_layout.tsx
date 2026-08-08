import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          position: "absolute",

          
          margin:10,

          height: 65,

          borderRadius: 30,

          backgroundColor: "white",

          borderTopWidth: 1,

          elevation: 3,
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />


    </Tabs>
  );
}