import { NgoDetailsData } from "@/models/Ngo"
import { useState  , useEffect} from "react"

import { NgoService } from "../../../services/NgoService";

const community=()=>{

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

    
}