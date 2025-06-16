import React, { useCallback, useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext';

/**
 * @param {Object} props 
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
const FilterControls = ({
    filterType,
    setFilterType,
    filterGeneration,
    setFilterGeneration,
    searchTerm,
    setSearchTerm,
    applySearch,
    clearAllFilters,
    allTypes,
    allGenerations
}) => {
    const { translate } = useContext(LanguageContext);

    const handleSearchKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            applySearch();
        }
    }, [applySearch]);

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 p-4 bg-gray-900 rounded-lg shadow-md w-full max-w-4xl mx-auto">
            {/* Campo de pesquisa */}
            <div className="relative flex w-full md:w-1/3">
                <input
                    type="text"
                    placeholder={translate('searchPlaceholder')}
                    className="p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
                <button
                    onClick={applySearch}
                    className="p-3 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                    title={translate('searchPlaceholder')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Seletor de tipo */}
            <select
                className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
                value={filterType}
                onChange={(e) => {
                    setFilterType(e.target.value);
                    setSearchTerm('');
                    applySearch(); 
                }}
            >
                <option value="">{translate('filterByType')}</option>
                {allTypes.map(type => (
                    <option key={type} value={type} className="capitalize">{type}</option>
                ))}
            </select>

            {/* Seletor de geração */}
            <select
                className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
                value={filterGeneration}
                onChange={(e) => {
                    setFilterGeneration(e.target.value);
                    setSearchTerm(''); 
                    applySearch();
                }}
            >
                <option key="default-gen-option" value="">{translate('filterByGeneration')}</option>
                {allGenerations.map(gen => {
                    const formattedGenName = gen.replace('generation-', translate('generationPrefix'));
                    return (
                        <option key={gen} value={gen} className="capitalize">{formattedGenName}</option>
                    );
                })}
            </select>

            {/* Botão para limpar todos os filtros */}
            <button
                onClick={clearAllFilters}
                className="p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 w-full md:w-auto"
            >
                {translate('clearFilters')}
            </button>
        </div>
    );
};

export default FilterControls;
