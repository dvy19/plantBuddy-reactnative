import { PlantPageResponse } from '../models/PlantResponse';
import {endpoints} from "../api/endpoints";
import api from "../api/api";

const plantService={

    getAllPlants:async(
        page:number,
        search?:string
    ): Promise<PlantPageResponse> => {

        
            const res=await api.get(endpoints.GET_ALL_PLANTS , {
                params:{
                    page,
                    search
                },
            })

            return res.data
        }


    
    
    
};

export default plantService;