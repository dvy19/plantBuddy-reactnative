
export interface WeatherResponse{

    main:Main;
    weather:Weather[];
    rain?:Rain | null;
    wind:Wind;
    sys:Sys;
    name:string;
}

export interface Main{
    temp:number;
    humidity:number;
}

export interface Rain{
    oneHour?:number | null;
}

export interface Weather{
    main:string;
    description:string;
}

export interface Wind{
    speed:number
}

export interface Sys { 
    sunrise: number; sunset: number;
 }

export type WeatherState =
     | { status: "idle" }
     | { status: "loading" }
     | { status: "success"; data: WeatherResponse }
     | { status: "error"; message: string };