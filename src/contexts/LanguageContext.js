import React, { createContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
    pt: {
        home: "Início",
        pokemons: "Pokémons",
        about: "Sobre",
        welcomeMessage: "Bem-vindo ao PokeCards!",
        homeDescription: "Explore uma vasta coleção de Pokémons e descubra detalhes sobre suas habilidades, estatísticas e muito mais. Use os filtros e a pesquisa para encontrar seus favoritos!",
        explorePokemonWorld: "Explore o Mundo Pokémon",
        searchPlaceholder: "Pesquisar Pokémon",
        filterByType: "Filtrar por Tipo",
        filterByGeneration: "Filtrar por Geração",
        clearFilters: "Limpar Filtros",
        noPokemonFound: "Nenhum Pokémon encontrado com os filtros aplicados.",
        allPokemonsSeen: "Você viu todos os Pokémons por enquanto!",
        errorLoading: "Erro ao carregar Pokémons:",
        clickForDetails: "Clique para ver detalhes",
        pokemonDetails: "Detalhes do Pokémon",
        abilities: "Habilidades:",
        baseStats: "Estatísticas Base:",
        height: "Altura:",
        weight: "Peso:",
        generationPrefix: "Geração ",
        morePokemons: "Ainda há mais Pokémons para explorar!",
        startExploration: "Inicie sua exploração",
        close: "Fechar",
        aboutTitle: "Sobre Mim",
        myPhotoAlt: "Minha Foto de Perfil",
        aboutDescriptionPlaceholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    en: {
        home: "Home",
        pokemons: "Pokémons",
        about: "About",
        welcomeMessage: "Welcome to PokeCards!",
        homeDescription: "Explore a vast collection of Pokémons and discover details about their abilities, stats, and more. Use filters and search to find your favorites!",
        explorePokemonWorld: "Explore the Pokémon World",
        searchPlaceholder: "Search Pokémon",
        filterByType: "Filter by Type",
        filterByGeneration: "Filter by Generation",
        clearFilters: "Clear Filters",
        noPokemonFound: "No Pokémon found with applied filters.",
        allPokemonsSeen: "You've seen all Pokémons for now!",
        errorLoading: "Error loading Pokémons:",
        clickForDetails: "Click for details",
        pokemonDetails: "Pokémon Details",
        abilities: "Abilities:",
        baseStats: "Base Stats:",
        height: "Height:",
        weight: "Weight:",
        generationPrefix: "Generation ",
        morePokemons: "There are still more Pokémons to explore!",
        startExploration: "Start your exploration",
        close: "Close",
        aboutTitle: "About Me",
        myPhotoAlt: "My Profile Photo",
        aboutDescriptionPlaceholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('pt'); 

    const translate = useCallback((key) => {
        return translations[language][key] || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext };
