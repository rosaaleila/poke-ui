export type IGetPokemonNames = (offset: number, limit: number) => Promise<IPokemonNames>;

export type IGetPokemonData = (name: string) => Promise<IFullPokemonData>;

export interface IPokemonNames {
    count: number;
    next: string;
    previous: null | number;
    results: IPokemonData[];
};

export interface IPokemonData {
    name: string;
    url: string;
};

export interface IFullPokemonData {
    id: number;
    name: string;
    abilities: IAbility[]; 
    sprites: {
        front_default: string;
    };
    types: IType[];
}

export interface IType {
    type: {
        name: string;
        url: string;
    }
}

export interface IAbility {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string,
        url: string
    };
};