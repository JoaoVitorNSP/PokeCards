import axios from 'axios';

// Base URL para a PokeAPI
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Busca uma lista paginada de Pokémon da PokeAPI.
 * @param {number} limit - O número de Pokémon a serem retornados.
 * @param {number} offset - O ponto de partida para a busca.
 * @returns {Promise<Object>} - Uma promessa que resolve para os dados da lista de Pokémon.
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar lista de Pokémons:", error);
        throw error;
    }
};

/**
 * Busca informações detalhadas para um Pokémon específico a partir de sua URL.
 * @param {string} url - A URL do endpoint de detalhes do Pokémon.
 * @returns {Promise<Object>} - Uma promessa que resolve para os dados detalhados do Pokémon.
 */
export const getPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar detalhes do Pokémon de URL ${url}:`, error);
        throw error;
    }
};

/**
 * Busca uma lista de Pokémon de um tipo específico, retornando os detalhes completos.
 * @param {string} typeName - O nome do tipo de Pokémon.
 * @returns {Promise<Array>} - Uma promessa que resolve para um array de objetos de Pokémon detalhados.
 */
export const getPokemonsByType = async (typeName) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/type/${typeName}`);
        const pokemonRefsFromType = response.data.pokemon.map(p => p.pokemon);
        const detailedPokemonPromises = pokemonRefsFromType.map(p => getPokemonDetails(p.url));
        const detailedPokemons = await Promise.all(detailedPokemonPromises);
        return detailedPokemons; // Retorna os Pokémon detalhados diretamente
    } catch (error) {
        console.error(`Erro ao buscar Pokémons do tipo ${typeName}:`, error);
        throw error;
    }
};

/**
 * Busca uma lista de Pokémon de uma geração específica, retornando os detalhes completos das formas padrão.
 * @param {number|string} generationId - O ID ou nome da geração.
 * @returns {Promise<Array<Object>>} - Uma promessa que resolve para um array de objetos de Pokémon detalhados.
 */
export const getPokemonsByGeneration = async (generationId) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/generation/${generationId}`);
        const species = response.data.pokemon_species;

        const defaultPokemonDetailsPromises = species.map(async (s) => {
            try {
                const speciesDetailResponse = await axios.get(s.url);
                // Encontra a variedade padrão do Pokémon (geralmente a forma base)
                const defaultVariety = speciesDetailResponse.data.varieties.find(v => v.is_default);
                if (defaultVariety && defaultVariety.pokemon && defaultVariety.pokemon.url) {
                    return await getPokemonDetails(defaultVariety.pokemon.url); // Busca os detalhes completos do Pokémon
                }
                return null;
            } catch (error) {
                console.error(`Erro ao buscar detalhes da espécie ${s.name}:`, error);
                return null;
            }
        });

        const detailedPokemons = await Promise.all(defaultPokemonDetailsPromises);
        return detailedPokemons.filter(p => p !== null); // Filtra quaisquer valores nulos resultantes de erros
    } catch (error) {
        console.error(`Erro ao buscar Pokémons da geração ${generationId}:`, error);
        throw error;
    }
};

/**
 * Busca todos os tipos de Pokémon disponíveis.
 * @returns {Promise<Array>} - Uma promessa que resolve para um array de nomes de tipos.
 */
export const getAllTypes = async () => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/type?limit=100`);
        return response.data.results.map(type => type.name);
    } catch (error) {
        console.error("Erro ao buscar todos os tipos:", error);
        return [];
    }
};

/**
 * Busca todas as gerações de Pokémon disponíveis.
 * @returns {Promise<Array>} - Uma promessa que resolve para um array de nomes de gerações.
 */
export const getAllGenerations = async () => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/generation?limit=100`);
        return response.data.results.map(gen => gen.name);
    } catch (error) {
        console.error("Erro ao buscar todas as gerações:", error);
        return [];
    }
};
