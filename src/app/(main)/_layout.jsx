import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function MainLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,

        drawerStyle: {
          width: 280,
        },

        drawerActiveTintColor: "#2E7D32",
        drawerInactiveTintColor: "#555",
      }}
    >
      <Drawer.Screen
        name="savedFacts"
        options={{
          title: "Saved Facts",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="bookmark-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />



      
    </Drawer>
  );
}