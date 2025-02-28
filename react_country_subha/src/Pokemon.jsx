import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import "./index.css";
export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = res.json();
                return data;
            })
            const detailResponse = await Promise.all(detailedPokemonData);
            setPokemon(detailResponse);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPokemon();
    }, []);

    const searchData = pokemon.filter((curData) =>
        curData.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        );
    }
    
    if (error) {
        return (
            <div>
                <h1>Error: {error.message} </h1>
            </div>
        );
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Let Catch Pokémon</h1>
                </header>
                <div className="pokemon-search">
                    <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                    <ul className="cards">
                        {
                            searchData.map((curPokemon) => {
                                return (<PokemonCard key={curPokemon.id} pokemonData={curPokemon} />);
                            })
                        }
                    </ul>
                </div>
            </section>

        </>
    );
};