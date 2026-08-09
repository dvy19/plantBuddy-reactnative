import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tokenStorage } from '../../../services/tokenStorage';
import {router} from 'expo-router'
const profile = () => {

  const[isLoggedIn,setIsLoggedIn]=useState(false);


  const checkLogin=async()=>{

    const token=await tokenStorage.getAccessToken();

    if(token){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }

  }

  useEffect(
    ()=>{checkLogin()}
  );

  const handleLogout = async () => {
    await tokenStorage.clearTokens();
    setIsLoggedIn(false);
};


 return (
    <View>
        {isLoggedIn === false && 
        
        <View>
          
        </View>
          }

           {isLoggedIn === true && 
         <Button
                    title="Log out Here"
                    onPress={() => handleLogout()}
          />
          }
    </View>

  );
}

export default profile