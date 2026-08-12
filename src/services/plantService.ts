import { PlantPageResponse,  SinglePlantResponse } from '../models/PlantResponse';
import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { FaqRequest  , FaqResponse} from '../models/MiscModels';

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
        },


    getSinglePlant:async(id:number):Promise<SinglePlantResponse>=>{

        const res=await api.get(`${endpoints.GET_SINGLE_PLANT(id)}`)

        return res.data

    },

    getFaq:async(request:FaqRequest):Promise<FaqResponse>=>{

        const res=await api.post(endpoints.GET_FAQ,request)

        return res.data
    },


    getCategoryPlants:async(categoryId:number)=>{

        const data=await api.get(endpoints.GET_CATEGORY,
            {
                 params: {
                            category: categoryId,
                        },
            }
        )

        return data.data
    }


    
    
    
};

export default plantService;