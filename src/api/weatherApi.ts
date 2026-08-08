import axios from "axios";

const api = axios.create({
    baseURL: "https://api.openweathermap.org/",
    headers: {
        "Content-Type": "application/json",
    },

});


export default api;