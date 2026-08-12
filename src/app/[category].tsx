import { View, Text } from 'react-native'
import React, { useState , useEffect } from 'react'

import { useLocalSearchParams } from 'expo-router';
import plantService from '@/services/plantService';
import {
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import {Plant} from '../models/PlantResponse'
import PlantCard from '@/components/PlantCard';
const CategoryScreen = () => {

    const { category } = useLocalSearchParams<{
                category: string;
    }>();

    const[plants,setPlants]=useState<Plant[]>([]);
    const[loading,setLoading]=useState(false)
    

    
    const loadPlants = async (category: number) => {
        try {
            setLoading(true);

            const response = await plantService.getCategoryPlants(category);

            setPlants(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            loadPlants(Number(category));
        }
        }, [category]);

  return (
     <FlatList
      data={plants}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}

     

      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <PlantCard plant={item} />
        </View>
      )}

      onEndReachedThreshold={0.5}


      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={true}
      

    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    margin:12,
  },

  search: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 16,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom:10,
    backgroundColor: "#FFF",
  },

  row: {
    gap:10,
    marginBottom: 6,

  },

  cardWrapper: {
    width: "48%",
  },
});

export default CategoryScreen