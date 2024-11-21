import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    headers: {
        "Content-Type": "application/json",
    },
});