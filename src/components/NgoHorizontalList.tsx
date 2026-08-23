
import { View, Text } from 'react-native'
import React from 'react'
import { NgoDetailsData } from "@/models/Ngo"
import { useState  , useEffect} from "react"

import {
    ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions
} from "react-native";

const CARD_WIDTH = Dimensions.get('window').width * 0.72;


import NgoCard from '../components/NgoCard'

import { NgoService } from "../services/NgoService";

const NgoHorizontalList = () => {

    const[ngo,setNgo]=useState<NgoDetailsData[]>();

    

    const[loading,setLoading]=useState(false);

    const[error,setError]=useState("");

    const loadNgos=async()=>{

        setLoading(true)

        try{

            const data=await NgoService.getAllNgo()

            setNgo(data.data)
            console.log(data.data)
        }
        catch(err){
            console.log(`${err}`)
        }
    }

    useEffect(()=>{
        loadNgos
    } , [])


  return (
     <View>
      <FlatList
        data={ngo}
        horizontal
        showsHorizontalScrollIndicator={false}
       
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <NgoCard ngo={item} />
          </View>
        )}
      />
    </View>
  )
}

export default NgoHorizontalList;


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