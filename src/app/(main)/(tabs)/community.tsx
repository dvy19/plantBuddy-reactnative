
import { ScrollView  , View , StyleSheet, SafeAreaView , Pressable , Text} from "react-native";

import NgoHorizontalList from "../../../components/NgoHorizontalList";

const community=()=>{

    return(
        <ScrollView style={styles.home} >

            <NgoHorizontalList></NgoHorizontalList>

            </ScrollView>
        
    )

    

    
}

const styles = StyleSheet.create({

 
  home:{

    paddingHorizontal:12,

  }
}
)