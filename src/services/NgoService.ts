import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { tokenStorage } from "./tokenStorage";
import { NgoDetailsForm , NgoDetailResponse } from "../models/Ngo";

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

    




    }

}