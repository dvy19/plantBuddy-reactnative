
export const endpoints={

    REGISTER: "accounts/register/",
    LOGIN: "accounts/login/",

    WEATHER:"data/2.5/weather",

    GETFACTOFTHEDAY:"plants/getFactOfDay/",

    USERDETAIL:"accounts/create-profile/",

    GET_ALL_PLANTS: "plants/allPlants/",

    GET_SINGLE_PLANT: (id : number)=> `plants/singlePlants/${id}/`,

    GET_FAQ:"plants/plant-faq/",

    CREATE_NGO:"ngo/create/",
    CREATE_CAMPAIGN:"ngo/campaigns/",

    GET_CATEGORY:"plants/category-filter/",

    GET_OWN_CAMPAIGNS:"ngo/campaigns/my/",
    GET_ALL_NGO:"ngo/get/",

    GET_ACTIVE_CAMPAIGN:"ngo/campaigns/"

}