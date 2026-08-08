import {endpoints} from "../api/endpoints";
import api from "../api/api";
import { FactResponse } from "@/models/MiscModels";

const miscService={

    getFactOfTheDay:async() : Promise<FactResponse>=>{

        const data=await api.get(endpoints.GETFACTOFTHEDAY);

        return data.data

    }

};

export default miscService;


/*
here data is an AxiosResponse, which looks roughly like:

AxiosResponse
├── data
├── status
├── headers

so always we have to return data.data or res.data 
*/