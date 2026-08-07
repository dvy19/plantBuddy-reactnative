import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../models/AuthModels";
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
    }
};

export default authService;