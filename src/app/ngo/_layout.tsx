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
      name="(tabs)"
      options={{
        title: "Home",
        drawerItemStyle: {
          display: "none",
        },
      }}
    />

    




      



      
    </Drawer>
  );
}