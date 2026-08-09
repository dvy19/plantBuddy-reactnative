import { useState , useEffect } from "react"
import  {Plant }from '../models/PlantResponse'
import plantService from '../services/plantService'
import {
    ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

import PlantCard from "./PlantCard";

const CARD_WIDTH = Dimensions.get('window').width * 0.72;
import {PlantsUiState} from '../models/PlantResponse'
const PlantHorizontalList=()=>{


    const[plants,setPlants]=useState<Plant[]>([]);;
    const[page,setPage]=useState(1);

    const[loading,setLoading]=useState(false);
    const[hasNextPage,setHasNextPage]=useState(true)

   const [uiState, setUiState] = useState<PlantsUiState>({
        status: "idle",
    });

    const loadPlants=async(pageNumber:number)=>{

        if(loading) return;
        
        const res=await plantService.getAllPlants(pageNumber)

        setPlants((prev) => [...prev, ...res.results.data]);

        // Django pagination gives next = null on last page
        setHasNextPage(res.next !== null);

        setPage(pageNumber);
    }
    
    useEffect(() => {
    loadPlants(1);
        }, []);

  const handleViewMore = () => {
    if (hasNextPage && uiState.status !== "loading") {
      loadPlants(page + 1);
    }
  };

  

  return (
    <View>
      <FlatList
        data={plants}
        horizontal
        showsHorizontalScrollIndicator={false}
       snapToInterval={CARD_WIDTH + 12} // Smooth snap scrolling effect
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <PlantCard plant={item} />
          </View>
        )}
        ListFooterComponent={
          hasNextPage ? (
            <Pressable
              style={styles.viewMoreCard}
              onPress={handleViewMore}
              disabled={uiState.status === 'loading'}
            >
              {uiState.status === 'loading' ? (
                <ActivityIndicator color="#2E7D32" />
              ) : (
                <Text style={styles.viewMoreText}>View More →</Text>
              )}
            </Pressable>
          ) : null
        }
      />
    </View>
  
  );
};

export default PlantHorizontalList;

const styles = StyleSheet.create({
    container: {
    marginVertical: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: 12,
  },
  viewMoreCard: {
    width: 130,
    height: 200, // Matches PlantCard height
    backgroundColor: '#E8F3E8',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginRight: 16,
  },
  viewMoreText: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    width: 180,
    height: 180,
    marginRight: 12,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  scientificName: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 5,
  },


  center: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  retry: {
    marginTop: 10,
    fontWeight: "bold",
  },
});