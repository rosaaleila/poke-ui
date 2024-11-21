import { getPokemonNames } from "../api/pokemonApi";
import { PokemonCard } from "components/pokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Input } from "components/ui/input";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function List() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(
        ["pokemonNames"],
        async ({ pageParam = 0 }) => {
            const offset = pageParam;
            const limit = 100;
            return await getPokemonNames(offset, limit);
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.next ? lastPage.next.split('=')[1] : undefined;
            },
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data.</div>;
    }
    
    // Filtramos o pokemons de acordo com a query da barra de pesquisa (se houver)
    const filteredPokemons = data?.pages
        .flatMap(page => page.results)
        .filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="flex gap-4 flex-col justify-center items-center p-[5px]">
            <Input 
                placeholder="Pesquisar" 
                className="mt-5 w-[50%]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />    
  
            <InfiniteScroll
                dataLength={filteredPokemons?.length || 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage || false}
                loader={<p>Carregando Pokédex...</p>}
                endMessage={<p>Fim dos pokemons :D</p>}
                className="flex gap-4 flex-col"
            >
                {filteredPokemons && filteredPokemons.length > 0 ? (
                    filteredPokemons.map((pokemon, index) => (
                        <PokemonCard
                            name={pokemon.name}
                            key={index}
                        />
                    ))
                ) : (
                    <div>Nenhum Pokémon encontrado</div>
                )}
            
            </InfiniteScroll>
        </div>
    );
}

export default List;