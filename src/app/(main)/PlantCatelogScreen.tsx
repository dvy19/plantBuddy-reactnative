import { View, Text } from 'react-native'
import React from 'react'

import {useState, useEffect } from 'react'

import { PlantsUiState } from '../../models/PlantResponse'
import {Plant} from '../../models/PlantResponse'
import PlantCard from '../../components/PlantCard'
import CatalogCard from '../../components/CatalogCard'
import plantService from '../../services/plantService'
import {
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  ActivityIndicator,
} from "react-native";

const PlantCatelogScreen = () => {

    const[plants,setPlants]=useState<Plant[]>([]);;
    const[page,setPage]=useState(1);

    const[loading,setLoading]=useState(false);
    const[hasNextPage,setHasNextPage]=useState(true)

    const [search, setSearch] = useState("");


   const [uiState, setUiState] = useState<PlantsUiState>({
        status: "idle",
    });

   const loadPlants = async (
  pageNumber: number,
  searchQuery: string = search
) => {

  if (loading) return;

  try {
    setLoading(true);

    const res = await plantService.getAllPlants(
      pageNumber,
      searchQuery
    );

    const newPlants = res.results.data;

    if (pageNumber === 1) {
      // First page / new search
      setPlants(newPlants);
    } else {
      // Next page
      setPlants((prev) => [
        ...prev,
        ...newPlants,
      ]);
    }

    setHasNextPage(res.next !== null);
    setPage(pageNumber);

  } catch (error) {
    console.log("Error loading plants:", error);

  } finally {
    setLoading(false);
  }
};
    
        useEffect(() => {
        loadPlants(1);
            }, []);

            /*
        const handleSearch = (text: string) => {
            setSearch(text);

            loadPlants(1, text);
        };
        */

        useEffect(() => {
        const timer = setTimeout(() => {
            loadPlants(1, search);
        }, 500);

        return () => clearTimeout(timer);
        }, [search]);
const handleViewMore = () => {
  if (hasNextPage && !loading) {
    loadPlants(page + 1, search);
  }
};
  return (
    <FlatList
      data={plants}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}

      ListHeaderComponent={
        <TextInput
          style={styles.search}
          placeholder="Search plants..."
          value={search}
          onChangeText={setSearch}
        />
      }

      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <CatalogCard plant={item} />
        </View>
      )}

      onEndReached={handleViewMore}
      onEndReachedThreshold={0.5}

       ListFooterComponent={
            loading ? (
            <ActivityIndicator
                size="large"
                style={{ marginVertical: 20 }}
            />
            ) : null
        }

      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={true}
      

    />
  );
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

export default PlantCatelogScreen