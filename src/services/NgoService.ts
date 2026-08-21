import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { tokenStorage } from "./tokenStorage";
import { NgoDetailsForm , NgoDetailResponse, CampaignForm, AllCampaignResponse , SingleCampaignResponse} from "../models/Ngo";

export const NgoService={

    createNgo:async(formData:NgoDetailsForm):Promise<NgoDetailResponse>=>{

        const token=await tokenStorage.getAccessToken()

        const data=new FormData()

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append("phone_number", formData.phone_number);
        data.append("website", formData.website);
        data.append("city", formData.city);

        if (formData.logo) {
                        data.append("logo", {
                                uri: formData.logo.uri,
                                name: formData.logo.name,
                                type: formData.logo.type,
                        } as any);
                        }

        const res=await api.post(endpoints.CREATE_NGO, data ,
            { 
                    headers:{ Authorization: `Bearer ${token}`,
                               "Content-Type": "multipart/form-data", 
                            },
            }
        );

        return res.data
    },


    createCampaign:async(formData:CampaignForm) : Promise<SingleCampaignResponse>=>{

        const token=await tokenStorage.getAccessToken()

        console.log(token)

        const data=new FormData()

        data.append("title",formData.title);
        data.append("location",formData.location);
        data.append("start_date",formData.start_date);
        data.append("end_date",formData.end_date);
        data.append("required_volunteers",String(formData.required_volunteers));
        data.append("description",formData.description);
        data.append("is_active",String(formData.is_active));
        data.append("goal_amount",String(formData.goal_amount));

        if (formData.logo) {
                        data.append("logo", {
                                uri: formData.logo.uri,
                                name: formData.logo.name,
                                type: formData.logo.type,
                        } as any);
                        }

        const res=await api.post(endpoints.CREATE_CAMPAIGN, data ,
            { 
                
                    headers:{ Authorization: `Bearer ${token}`,
                               "Content-Type": "multipart/form-data", 
                            },
            }
        );

        return res.data
    },


    getOwnActiveCamp:async(is_active:boolean):Promise<AllCampaignResponse>=>{

        const token=await tokenStorage.getAccessToken()

        console.log(`token on entry ${token}`)
        console.log("AUTH:", `Bearer ${token}`);

       
         const res=await api.get(endpoints.GET_OWN_CAMPAIGNS,{
            headers:{ Authorization: `Bearer ${token}`,
                               "Content-Type": "application/json", 
                            },
            params:{
                is_active:is_active
            }
        })

        return res.data
       

    
    }

}