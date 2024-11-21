import { Card, CardContent, CardHeader } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "api/pokemonApi";
import { Badge } from "./ui/badge";
import { colorsByType } from "utils/colorsByType";

interface IPokemonCardProps {
    name: string
}

export const PokemonCard = ({name}: IPokemonCardProps) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: ({queryKey}) => {
            const [_, name] = queryKey;
            return getPokemon(name);
        }
    });

    if (isLoading) {
        return <div>Carregando...</div>;
    };

    if (isError) {
        return <div>Erro ao buscar o Pokémon.</div>;
    };

    const colorByType = colorsByType[data.types[0].type.name];
    const getInitialLetters = () => data.name.split(' ').map(name => name[0]?.toUpperCase() || '').join(' ');

    return (
        <Card className="p-6 flex flex-col w-full" key={data.name}>
            <CardHeader>
                {data.name 
                ? <img src={data.sprites.front_default} alt={data.name} className={'w-[100px] h-[100px] rounded-[100%]'}/>
                    : <div className="w-[100px] h-[100px] rounded-[100%] text-center flex items-center justify-center" style={{'backgroundColor': colorByType}}>
                        <p>{getInitialLetters()}</p>
                    </div>
                }
            </CardHeader>
            <CardContent>
                <p>{data.name}</p>
            </CardContent>
            <CardContent className="flex gap-2">
                {data.abilities.map((ability) => (
                    <Badge key={ability.ability.name} style={{'backgroundColor': colorByType}}>{ability.ability.name}</Badge>
                ))}
            </CardContent>
        </Card>

    );

};