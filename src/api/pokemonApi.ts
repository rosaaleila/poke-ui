import { IGetPokemonNames, IGetPokemonData } from "../types/api";
import { axiosClient } from "./axios";

export const getPokemonNames : IGetPokemonNames = async (offset = 0, limit = 100) => {
    const response = await axiosClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
};

export const getPokemon : IGetPokemonData = async (name: string) => {
    const response = await axiosClient.get(`/pokemon/${name}`);
    return response.data;
};