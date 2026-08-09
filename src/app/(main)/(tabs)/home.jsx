import { ScrollView  , View , StyleSheet, SafeAreaView , Pressable , Text} from "react-native";
import WeatherCard from '../../../components/weatherCard'
import FactCard from '../../../components/FactCard'
import {useRouter} from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

import PlantHorizontalList from '../../../components/PlantHorizontalList'

import CategoryCard from '../../../components/CategoryCard'

const Home = () => {

  const router=useRouter();
 return (
    <SafeAreaView>
      <ScrollView >
       
            <WeatherCard />
          

            <FactCard />

            <PlantHorizontalList></PlantHorizontalList>

            <View style={styles.categorySection} >

              <View >
                <Text style={styles.categoryHeading}>Explore Your Finds</Text>
              </View>


              <View style={styles.grid}>

                <CategoryCard
                  title="Home"
                  icon="home-outline"
                  onPress={() => router.push("/plants/home")}
                />

                <CategoryCard
                  title="Outside"
                  icon="sunny-outline"
                  onPress={() => router.push("/plants/outside")}
                />

                <CategoryCard
                  title="Kitchen"
                  icon="restaurant-outline"
                  onPress={() => router.push("/plants/kitchen")}
                />

                <CategoryCard
                  title="Garden"
                  icon="leaf-outline"
                  onPress={() => router.push("/plants/garden")}
                />

              </View>
         
            </View>
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

  categorySection:{

    marginTop:5,
    marginBottom:100
  },

  categoryHeading:{
    left:12,
    fontSize:20,
    fontWeight:500

  },

   grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    gap:10,
  },
  

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