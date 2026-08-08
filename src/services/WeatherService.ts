import { WeatherResponse } from "@/models/weatherModels";

import api from '../api/weatherApi'

import {endpoints} from "../api/endpoints";


const WeatherService={

    getWeather : async(
        city:string,
        units: string = "metric"
    ) : Promise<WeatherResponse>=>{

        const response = await api.get<WeatherResponse>(
            endpoints.WEATHER,
            {
                params: {
                    q: city,
                    appid: "8267882bacb857c78cbec307780a8309",
                    units: units,
                },
            }
        );

        return response.data;



    }
};

export default WeatherService;