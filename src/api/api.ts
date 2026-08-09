import axios from "axios";
import { tokenStorage } from '../services/tokenStorage';
const api = axios.create({
    baseURL: "https://plantbuddybackend.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },

});

export default api;