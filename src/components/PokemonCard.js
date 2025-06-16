import React, { useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext';

/**
 * @param {Object} props 
 * @param {Object} props.pokemon 
 * @param {function} props.onClick 
 */
const PokemonCard = ({ pokemon, onClick }) => {

    const { translate } = useContext(LanguageContext);

    if (!pokemon) return null;

    const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';

    const typeColors = {
        normal: 'bg-gray-500',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-blue-300',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-700',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-green-700',
        rock: 'bg-gray-700',
        ghost: 'bg-indigo-700',
        dragon: 'bg-indigo-800',
        steel: 'bg-gray-400',
        fairy: 'bg-pink-300',
        dark: 'bg-gray-800',
    };

    const cardBorderColor = typeColors[mainType] ? typeColors[mainType].replace('bg-', 'border-') : 'border-gray-600';
    const cardBgGradient = `bg-gradient-to-br from-gray-800 to-gray-900`;

    return (
        <div
            onClick={() => onClick(pokemon)} 
            className={`
                ${cardBgGradient}
                ${cardBorderColor}
                border-2 rounded-xl shadow-lg
                flex flex-col items-center p-6
                text-white font-inter
                transform transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl hover:border-blue-400
                relative overflow-hidden
                w-full sm:w-64 md:w-72 lg:w-80 h-auto cursor-pointer
            `}
        >
            {/* Efeito de brilho de fundo */}
            <div className={`
                absolute inset-0 opacity-10 rounded-xl
                ${typeColors[mainType] || 'bg-blue-500'}
                filter blur-xl
            `}></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-2xl font-bold capitalize text-blue-400">
                        {pokemon.name}
                    </h2>
                    <span className="text-lg text-gray-400">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>
                </div>

                <div className="w-40 h-40 bg-gray-700 rounded-full flex justify-center items-center mb-4 shadow-inner">
                    <img
                        src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                        // Fallback para erros de carregamento de imagem
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/333/FFF?text=No+Image"; }}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {pokemon.types.map(typeInfo => (
                        <span
                            key={typeInfo.type.name}
                            className={`
                                ${typeColors[typeInfo.type.name] || 'bg-gray-600'}
                                text-white text-sm font-semibold py-1 px-3 rounded-full capitalize shadow-md
                            `}
                        >
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
