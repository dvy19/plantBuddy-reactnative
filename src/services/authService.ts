import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserdetailRequest, UserdetailResponse} from "../models/AuthModels";
import {endpoints} from "../api/endpoints";
import api from "../api/api";

const authService = {

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        try {
            const response = await api.post<RegisterResponse>(endpoints.REGISTER, data);
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

        const res=await api.get(endpoints.USERDETAIL);
        return res.data
    }
    
};

export default authService;