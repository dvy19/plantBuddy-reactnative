import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserdetailRequest, UserdetailResponse} from "../models/AuthModels";
import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { tokenStorage } from "./tokenStorage";

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

        const res=await api.post(endpoints.USERDETAIL,data);
        return res.data
    },

    getProfile:async():Promise<UserdetailResponse>=>{

        const token = await tokenStorage.getAccessToken();

        const res=await api.get(endpoints.USERDETAIL ,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }, }
        );
        return res.data
    }
    
};

export default authService;