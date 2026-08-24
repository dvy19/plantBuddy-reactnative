import { View, Text } from 'react-native'
import React, { useState , useEffect } from 'react'
import { NgoService } from '../services/NgoService';

import {
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Pressable
} from "react-native";

import {Campaign} from '../models/Ngo'

const CampaignList = () => {

    const[campaign,setCampaign]=useState<Campaign[]>([]);
    const[loading,setLoading]=useState(false);

    const loadActiveCampaign=async(is_active:boolean)=>{

        setLoading(true)

        try{

            const data=await NgoService.getActiveCampaigns(is_active)

            console.log(data.data)

            setCampaign(data.data)

        }

        catch(err){

            console.log(`${err}`)

        }
    };


    useEffect(()=>{
        loadActiveCampaign(true)
    }, [])


  return (

     <View style={styles.container}>

            <Text style={styles.title}>
                My Plants
            </Text>

            {campaign.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>
                        No saved plants yet 🌱
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={campaign}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>

                            <View>
                                <Image
                                source={{ uri: item.logo? }}
                                style={styles.image}
                            />

                             
                            </View>

                            <View style={styles.info}>

                                <Text style={styles.name}>
                                    {item.title}
                                </Text>

                               

                                <Text style={styles.type}>
                                    Type: {item.location}
                                </Text>

                                <Text style={styles.water}>
                                    Water: {item.required_volunteers}
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
    


export default CampaignList