import { ScrollView  , View , StyleSheet, SafeAreaView} from "react-native";
import WeatherCard from '../../components/weatherCard'
import FactCard from '../../components/FactCard'

const Home = () => {
 return (
    <SafeAreaView>
      <ScrollView >
       
            <WeatherCard />
          

            <FactCard />
         
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;