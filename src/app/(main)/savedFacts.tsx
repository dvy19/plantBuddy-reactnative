import { View, Text , FlatList  , Pressable , StyleSheet} from 'react-native'
import React, { useState , useCallback } from 'react'
import { SaveFact } from '../../models/MiscModels'
import { deleteFact, getSavedFacts } from '../../database/factRepo';
import { useFocusEffect } from "expo-router";


const savedFacts = () => {

  const[facts,setFacts]=useState<SaveFact[]>([]);

  const[loading,setLoading]=useState(false);

  async function loadFacts(){

    try{
      
      const data=getSavedFacts()

      setFacts(data)
    }
    catch(err){
      console.log("err")
    }
  };


  const handleDelete=async(id:number)=>{
   
    try{
       deleteFact(id)
    loadFacts()
    console.log(`deleted ${id}`)
    }
    catch(err){
      console.log(`${err}`)
    }
  }

  
      useFocusEffect(
          useCallback(() => {
              loadFacts();
          }, [])
      );
  
 return (
        <View style={styles.container}>

            <Text style={styles.title}>
                My Plants
            </Text>

            {facts.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>
                        No saved Facts yet 🌱
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={facts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>

                            <View>
                               
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
                                    {item.title}
                                </Text>

                               

                                <Text style={styles.type}>
                                    Type: {item.fact}
                                </Text>

                                <Text style={styles.water}>
                                    Water: {item.category}
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

export default savedFacts