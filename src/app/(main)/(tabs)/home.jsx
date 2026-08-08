import { ScrollView  , View , StyleSheet, SafeAreaView , Pressable} from "react-native";
import WeatherCard from '../../../components/weatherCard'
import FactCard from '../../../components/FactCard'
import {useRouter} from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

const Home = () => {

  const router=useRouter();
 return (
    <SafeAreaView>
      <ScrollView >
       
            <WeatherCard />
          

            <FactCard />
         
      </ScrollView>

       <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/camera")}
      >
        <Ionicons name="camera" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  

  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: -200,

    width: 60,
    height: 60,

    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2E7D32",

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

});
export default Home;