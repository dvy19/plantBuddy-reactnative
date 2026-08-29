import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserdetailRequest, UserdetailResponse} from "../models/AuthModels";
import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { tokenStorage } from "./tokenStorage";
import { VolunteerProfile, VolunteerResponse } from "@/models/MiscModels";

const authService = {

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        try {
            const response = await api.post<RegisterResponse>(endpoints.REGISTER,
                 data,
                 { headers: { "Content-Type": "application/json", }, }
                );
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },

    login: async (data: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>(endpoints.LOGIN, data);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },

    createProfile:async(data:UserdetailRequest) : Promise<UserdetailResponse>=>{
        const token = await tokenStorage.getAccessToken();

        const res=await api.post(endpoints.USERDETAIL,data,
            { 
                    headers:{ Authorization: `Bearer ${token}`,
                               "Content-Type": "application/json", 
                            },
            }
        );
        return res.data
    },

    getProfile:async():Promise<UserdetailResponse>=>{

        const token = await tokenStorage.getAccessToken();

        console.log("USERDETAIL:", endpoints.USERDETAIL);
        console.log("TOKEN:", token);
        console.log("BASE URL:", api.defaults.baseURL);

        const res=await api.get(endpoints.USERDETAIL ,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }, }
        );
        return res.data
       
    },


    createVolunteerProfile:async(formData:VolunteerProfile):Promise<VolunteerResponse>=>{

        const data=new FormData()
        const token=await tokenStorage.getAccessToken()

        data.append("name",formData.name)
        data.append("city", formData.city)
        data.append("gender",formData.gender)
        data.append("phone" , formData.phone)

        if (formData.image) {
                        data.append("image", {
                                uri: formData.image.uri,
                                name: formData.image.name,
                                type: formData.image.type,
                        } as any);
                        }         
        const res=await api.post(endpoints.CREATE_VOLUNTEER_PROFILE,data , {

            headers:{ Authorization: `Bearer ${token}`,
                               "Content-Type": "multipart/form-data", 
                            },
        })

        return res.data
    },

    getVolunteerProfile:async():Promise<VolunteerResponse>=>{

        const token=await tokenStorage.getAccessToken()

        const res=await api.get(endpoints.CREATE_VOLUNTEER_PROFILE)

        return res.data



    }
    
};

export default authService;