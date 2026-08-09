import plantService from "../services/plantService";
import { useEffect, useState } from "react";
import { PlantDetailUiState } from "../models/PlantResponse";

function PlantDetailScreen(){

    const[plant,setPlant]=useState({});
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("")

    const[uiState,setUiState]=useState<PlantDetailUiState>(
        {status:"idle"}
    );

    const loadDetails=async(id : number)=>{

        setLoading(true)

        try{

            const data=await plantService.getSinglePlant(id)
            
            setPlant(data.data)

            setUiState({status:"success"})

        }
        catch(err){
            setUiState({
                status:"error",
                message:`${err}`
            })
        }

    }


    useEffect(
        ()=>{
            loadDetails()
        } ,[]
    )

}