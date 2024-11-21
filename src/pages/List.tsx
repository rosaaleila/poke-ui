import { getPokemonNames } from "../api/pokemonApi";
import { PokemonCard } from "components/pokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Input } from "components/ui/input";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function List() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Effect adicionado devido a necessidade de um listener da pagina toda
    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            // Atalho para focar no input de pesquisa
            if ((event.ctrlKey || event.metaKey) && event.key === "/") {
                searchInputRef.current?.focus();
                setIsSearchFocused(true);
            }
            
            if(isSearchFocused) return; // Se estiver no input de pesquisa, pulamos a navegação 

            // Navegação por teclado com as setas, que só é ativa se estiver com um card em foco
            if(focusedIndex !== null) {

                let newFocusedIndex: number | null = null;

                if (event.key === "ArrowDown") {
                    // Math.min garante que nunca vamos ultrapassar o indice minimo
                    newFocusedIndex = Math.min(filteredPokemons.length - 1, focusedIndex + 1); 
                } else if (event.key === "ArrowUp") {
                    // Math.max garante que nunca vamos ultrapassar o indice maximo
                    newFocusedIndex = Math.max(0, focusedIndex - 1);
                }
            
                if (newFocusedIndex !== null) {
                    setFocusedIndex(newFocusedIndex);
                }
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [focusedIndex]);

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
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Não foi possivel carregar sua pokédex...</div>;
    }
    
    // Filtramos o pokemons de acordo com a query da barra de pesquisa (se houver)
    const filteredPokemons = data?.pages
        .flatMap(page => page.results)
        .filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Setamos a indice do elemento com foco
    const handleMouseEnter = (index: number) => {
        setFocusedIndex(index);
    };

    return (
        <div className="flex gap-4 flex-col justify-center items-center p-[5px]">
            <Input 
                ref={searchInputRef}
                placeholder="Pesquisar" 
                className="mt-5 w-[50%]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
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
                            isFocused={focusedIndex === index}
                            onMouseEnter={() => handleMouseEnter(index)}
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