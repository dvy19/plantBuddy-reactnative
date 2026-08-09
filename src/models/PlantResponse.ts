
export interface PlantPageResponse{

    count:number;
    next?:string | null;
    previous?:string | null;

    results:PlantsResponse
}

export interface PlantsResponse{
    message:string;
    data:Plant[]
}

export interface Plant{
    id:number;
    category:PlantAttribute;
    plant_type:PlantAttribute;
    light_requirement: PlantAttribute,
    water_requirement: PlantAttribute,
    growth_rate: PlantAttribute,
    lifespan: PlantAttribute,
    soil_type: PlantAttribute,
    homePlace:PlantAttribute,
    best_planting_season: PlantAttribute,
    flowering_season: PlantAttribute  | null,
    fruiting_season: PlantAttribute | null,
    name: string,
    scientific_name: string,
    description: string,
    temperature_min: number,
    temperature_max: number,
    humidity: string,
    average_height: string,
    fertilizer: string,
    repotting_frequency: string,
    pruning_required: boolean,
    pet_friendly: boolean,
    air_purifying: boolean,
    edible: boolean,
    image_url: string,
    created_at: string,
    updated_at: string,
}

export interface SinglePlantResponse{
    message:string;
    data:Plant
}

export interface PlantAttribute{
    id:number;
    name:string;

}

export type PlantDetailUiState=
    | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export type PlantsUiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export interface SavedPlant {
    id: number;
    name: string;
    type: string;
    water_requirement: string;
    image_url: string;
};