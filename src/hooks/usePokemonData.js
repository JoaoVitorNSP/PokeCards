import { useState, useEffect, useCallback } from 'react';

import { getPokemonList, getPokemonDetails, getPokemonsByType, getPokemonsByGeneration } from './../services/pokeApiService';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * @param {string} filterType
 * @param {string} filterGeneration
 * @param {string} appliedSearchTerm
 * @param {number} triggerFetch 
 * @returns {Object} 
 */
const usePokemonData = (filterType, filterGeneration, appliedSearchTerm, triggerFetch) => {
    const [pokemons, setPokemons] = useState([]);
    const [allFetchedPokemons, setAllFetchedPokemons] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [offset, setOffset] = useState(0); 
    const [hasMore, setHasMore] = useState(true); 
    const limitPerFetch = 20; 

    /**
     * @param {number} currentOffset
     * @param {string} type
     * @param {string} generation 
     * @param {boolean} reset
     */
    const fetchPokemons = useCallback(async (currentOffset, type, generation, reset = false) => {
        setLoading(true);
        setError(null);
        try {
            let fetchedData = []; 
            let totalAvailable = 0; 

            if (type) {
                fetchedData = await getPokemonsByType(type);
                totalAvailable = fetchedData.length;
                setHasMore(false); 
                setOffset(0); 
            } else if (generation) {
                fetchedData = await getPokemonsByGeneration(generation);
                totalAvailable = fetchedData.length;
                setHasMore(false); 
                setOffset(0); 
            } else {
                const listData = await getPokemonList(limitPerFetch, currentOffset);
                const detailedPokemonPromises = listData.results.map(p => getPokemonDetails(p.url));
                fetchedData = await Promise.all(detailedPokemonPromises);
                totalAvailable = listData.count;
            }

            setAllFetchedPokemons(prev => {
                if (type || generation || reset) {
                    return fetchedData;
                } else {
                    const newPokemons = fetchedData.filter(
                        (newPoke) => !prev.some((existingPoke) => existingPoke.id === newPoke.id)
                    );
                    return [...prev, ...newPokemons];
                }
            });

            if (!type && !generation) {
                setOffset(currentOffset + fetchedData.length);
                setHasMore(currentOffset + fetchedData.length < totalAvailable);
            }

        } catch (err) {
            console.error("Erro em fetchPokemons:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [filterType, filterGeneration]); 

    useEffect(() => {
        setOffset(0);
        setHasMore(true); 
        setAllFetchedPokemons([]); 
        fetchPokemons(0, filterType, filterGeneration, true); 
    }, [filterType, filterGeneration, triggerFetch, fetchPokemons]); 

    const loadMorePokemons = useCallback(() => {
        if (!loading && hasMore && !filterType && !filterGeneration) { 
            fetchPokemons(offset, filterType, filterGeneration, false); 
        }
    }, [loading, hasMore, offset, filterType, filterGeneration, fetchPokemons]); 

    useEffect(() => {
        if (!appliedSearchTerm) {
            setPokemons(allFetchedPokemons); 
            return;
        }
        const lowerCaseSearchTerm = appliedSearchTerm.toLowerCase();
        const filtered = allFetchedPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            String(pokemon.id).includes(lowerCaseSearchTerm)
        );
        setPokemons(filtered); 
    }, [allFetchedPokemons, appliedSearchTerm]); 

    return {
        pokemons, 
        loading,
        error,
        loadMorePokemons,
        hasMore,
    };
};

export default usePokemonData;
