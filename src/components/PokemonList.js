import React, { useState, useEffect, useCallback, useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext'; 
import PokemonCard from './PokemonCard'; 
import PokemonDetailsModal from './PokemonDetailsModal'; 
import FilterControls from './FilterControls';

/**
 * @param {Object} props 
 * @param {Array} props.pokemons 
 * @param {boolean} props.loading 
 * @param {Object} props.error 
 * @param {function} props.loadMorePokemons 
 * @param {boolean} props.hasMore 
 * @param {string} props.filterType 
 * @param {function} props.setFilterType 
 * @param {string} props.filterGeneration 
 * @param {function} props.setFilterGeneration 
 * @param {string} props.searchTerm 
 * @param {function} props.setSearchTerm 
 * @param {function} props.applySearch 
 * @param {function} props.clearAllFilters 
 * @param {Array} props.allTypes 
 * @param {Array} props.allGenerations 
 */
const PokemonList = ({
    pokemons,
    loading,
    error,
    loadMorePokemons,
    hasMore,
    filterType,
    setFilterType,
    filterGeneration,
    setFilterGeneration,
    searchTerm,
    setSearchTerm,
    applySearch,
    clearAllFilters,
    allTypes,
    allGenerations,
}) => {

    const { translate } = useContext(LanguageContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const openDetailsModal = useCallback((pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    }, []);

    const closeDetailsModal = useCallback(() => {
        setSelectedPokemon(null);
        setIsModalOpen(false);
    }, []);

    const handleScroll = useCallback(() => {
        if (!filterType && !filterGeneration && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && hasMore && !loading) {
            loadMorePokemons();
        }
    }, [hasMore, loading, loadMorePokemons, filterType, filterGeneration]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (error) {
        return (
            <div className="text-red-500 text-center text-xl mt-20 font-inter">
                {translate('errorLoading')} {error.message}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20"> {/* Adiciona margem superior para o cabeçalho fixo */}
            <h2 className="text-4xl font-bold text-blue-400 mb-10 font-inter">
                {translate('explorePokemonWorld')}
            </h2>

            {/* Controles de filtro e pesquisa para a lista de Pokémon */}
            <FilterControls
                filterType={filterType}
                setFilterType={setFilterType}
                filterGeneration={filterGeneration}
                setFilterGeneration={setFilterGeneration}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                applySearch={applySearch}
                clearAllFilters={clearAllFilters}
                allTypes={allTypes}
                allGenerations={allGenerations}
            />

            {/* Grade de cartas de Pokémon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                {pokemons.length > 0 ? (
                    pokemons.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={openDetailsModal} />
                    ))
                ) : (
                    !loading && <p className="text-gray-400 text-center col-span-full text-xl">{translate('noPokemonFound')}</p>
                )}
            </div>
            {loading && <LoadingSpinner />} {/* Exibe spinner de carregamento */}
            {/* Mensagem quando todos os Pokémon foram vistos e não está carregando */}
            {!hasMore && !loading && pokemons.length > 0 && (
                <p className="text-gray-400 text-center mt-8 font-inter">
                    {translate('allPokemonsSeen')}
                </p>
            )}

            {/* Modal de detalhes do Pokémon (exibido condicionalmente) */}
            {isModalOpen && selectedPokemon && (
                <PokemonDetailsModal
                    pokemon={selectedPokemon}
                    onClose={closeDetailsModal}
                />
            )}
        </div>
    );
};

export default PokemonList;
