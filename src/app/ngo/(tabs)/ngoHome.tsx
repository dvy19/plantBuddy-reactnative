import { ScrollView  , View , StyleSheet, SafeAreaView , Pressable , Text} from "react-native";
import React from 'react'
import CampaignCard from "../../../components/CampaignCard";

const ngoHome = () => {
  return (
   <ScrollView style={styles.home} >

    <CampaignCard></CampaignCard>

    </ScrollView>
  )
}


const styles = StyleSheet.create({

 
  home:{

    paddingHorizontal:12,

  },

})

export default ngoHome