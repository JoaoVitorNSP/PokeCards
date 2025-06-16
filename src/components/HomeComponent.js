import React, { useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext';

/**
 * @param {Object} props 
 * @param {function} props.onPageChange 
 */
const HomeComponent = ({ onPageChange }) => {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-64px)] text-center px-4 py-8">
            <h2 className="text-6xl font-extrabold text-blue-400 mb-8 animate-fade-in-up">
                {translate('welcomeMessage')}
            </h2>

            {/* Elemento visual para a Página Inicial - Logo internacional Pokémon */}
            <div className="mb-12 relative w-full max-w-lg mx-auto">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                    alt="International Pokémon logo"
                    className="w-full h-auto object-contain animate-fade-in-scale drop-shadow-xl"
                />
            </div>

            <p className="text-xl text-gray-300 max-w-2xl mb-12 animate-fade-in-up delay-200">
                {translate('homeDescription')}
            </p>

            {/* Botão para navegar para a página de Pokémons */}
            <button
                onClick={() => onPageChange('pokemons')}
                className="p-4 rounded-lg bg-blue-600 text-white text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fade-in-up delay-600"
            >
                {translate('startExploration')}
            </button>
        </div>
    );
};

export default HomeComponent;
