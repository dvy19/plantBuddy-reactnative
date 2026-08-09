import { View, Text } from 'react-native'
import {
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Pressable
} from "react-native";
import { deletePlant, getSavedPlants } from '../../database/plantRepo';
import {SavedPlant }from '../../models/PlantResponse'
import { useFocusEffect } from "expo-router";

import PlantCard from '../../components/PlantCard';
import React, { useCallback, useState } from "react";

const SavedPlantScreen = () => {

    const[plants,setPlants]=useState<SavedPlant[]>([]);
    const[loading,setLoading]=useState(false);

    const loadPlants=async()=>{

        try{
            const data=await getSavedPlants();
            
            setPlants(data)
        }
        catch (error) {
            console.error("Error loading saved plants:", error);
        } finally {
            setLoading(false);
        }

    };

    const[del,setDel]=useState(false);

    

    useFocusEffect(
        useCallback(() => {
            loadPlants();
        }, [])
    );

    
    const handleDelete = async (id: number) => {
            try {
                await deletePlant(id);
                loadPlants();
            } catch (error) {
                console.log("Delete error:", error);
            }
};


   return (
        <View style={styles.container}>

            <Text style={styles.title}>
                My Plants
            </Text>

            {plants.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>
                        No saved plants yet 🌱
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={plants}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>

                            <View>
                                <Image
                                source={{ uri: item.image_url }}
                                style={styles.image}
                            />

                             <Pressable
                                onPress={()=>handleDelete(item.id)}
                             >
                                <Text style={styles.deletePlant}>
                                    Delete
                                </Text>
                             </Pressable>
                            </View>

                            <View style={styles.info}>

                                <Text style={styles.name}>
                                    {item.name}
                                </Text>

                               

                                <Text style={styles.type}>
                                    Type: {item.type}
                                </Text>

                                <Text style={styles.water}>
                                    Water: {item.water_requirement}
                                </Text>

                            </View>

                        </View>
                    )}
                />
            )}

        </View>
    );
};


const styles = StyleSheet.create({

   

    deletePlant:{
        position:"absolute",
        left:-5,
        top:-4,
        borderRadius:10,
        padding:8,
        color:"white",
        backgroundColor:"green",
        fontSize:12,
        shadowColor: '#191a1a',
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 6,
        borderColor:"white",
        borderWidth:1.5
    },

    container: {
        flex: 1,
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },

    info: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    type: {
        fontSize: 14,
        marginBottom: 4,
    },

    water: {
        fontSize: 14,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 16,
    },
});

export default SavedPlantScreen;