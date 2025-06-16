import React, { useState, useEffect, useCallback } from 'react';

import { LanguageProvider } from './contexts/LanguageContext';
import usePokemonData from './hooks/usePokemonData';
import { getAllTypes, getAllGenerations } from './services/pokeApiService';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';


const globalStyles = `
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-scale {
  animation: fadeInScale 1s ease-out forwards;
}

@keyframes fadeInMoveUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInMoveUp 0.8s ease-out forwards;
}

/* Modal specific styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out forwards;
}

.modal-content {
    background-color: #1f2937; /* Equivalent to gray-800 */
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    position: relative;
    max-width: 90%; /* Ajuste a largura máxima */
    max-height: 90%; /* Permitir que a altura seja maior */
    width: 24rem; /* Definir uma largura fixa ou max-w-xs para torná-la mais estreita */
    height: auto; /* Deixar a altura se ajustar ao conteúdo */
    overflow-y: auto;
    animation: scaleIn 0.3s ease-out forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
`;

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const [filterType, setFilterType] = useState('');
    const [filterGeneration, setFilterGeneration] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(0);

    const [allTypes, setAllTypes] = useState([]);
    const [allGenerations, setAllGenerations] = useState([]);

    useEffect(() => {
        const fetchFiltersData = async () => {
            const types = await getAllTypes();
            setAllTypes(types);
            const generations = await getAllGenerations();
            setAllGenerations(generations);
        };
        fetchFiltersData();
    }, []);

    const {
        pokemons,
        loading,
        error,
        loadMorePokemons,
        hasMore,
    } = usePokemonData(filterType, filterGeneration, appliedSearchTerm, triggerFetch);

    const applySearch = useCallback(() => {
        setAppliedSearchTerm(searchTerm);
    }, [searchTerm]);

    const clearAllFilters = useCallback(() => {
        setFilterType('');
        setFilterGeneration('');
        setSearchTerm('');
        setAppliedSearchTerm('');
        setTriggerFetch(prev => prev + 1);
    }, []);

    const handlePageChange = useCallback((page) => {
        if (currentPage === 'pokemons' && page !== 'pokemons') {
            clearAllFilters();
        }
        setCurrentPage(page);
    }, [currentPage, clearAllFilters]);

    return (
        <LanguageProvider>
            {/* Estilos globais injetados diretamente aqui */}
            <style>{globalStyles}</style>
            <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-800 text-gray-100 font-inter">
                <Header onPageChange={handlePageChange} />
                <main className="pt-16">
                    {currentPage === 'home' && (
                        <HomeComponent
                            onPageChange={handlePageChange}
                        />
                    )}
                    {currentPage === 'pokemons' && (
                        <PokemonList
                            pokemons={pokemons}
                            loading={loading}
                            error={error}
                            loadMorePokemons={loadMorePokemons}
                            hasMore={hasMore}
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
                    )}
                    {currentPage === 'about' && (
                        <AboutComponent />
                    )}
                </main>
            </div>
        </LanguageProvider>
    );
}

export default App;
