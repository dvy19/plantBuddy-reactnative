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

    

      <Drawer.Screen
        name="savedFacts"
        options={{
          title: "Saved Facts",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="bookmark"
              size={size}
              color={color}
            />

            
          ),
        }}
      />

      <Drawer.Screen
        name="PlantCatelogScreen"
        options={{
          title: "Plant Catelog",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="albums-outline"
              size={size}
              color={color}
            />

            
          ),
        }}
      />


      



      
    </Drawer>
  );
}