import React, { useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext'; 
import { Heart, Swords, Shield, Zap, ShieldOff, Gauge, Lightbulb, Ruler, Scale } from 'lucide-react'; 

/**
 * @param {Object} props 
 * @param {Object} props.pokemon 
 * @param {function} props.onClose 
 */
const PokemonDetailsModal = ({ pokemon, onClose }) => {

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

    const modalBorderColor = typeColors[mainType] ? typeColors[mainType].replace('bg-', 'border-') : 'border-gray-600';

    const statDetails = {
        hp: { label: 'HP', icon: <Heart size={16} className="inline mr-1 text-red-400" /> },
        attack: { label: 'Ataque', icon: <Swords size={16} className="inline mr-1 text-orange-400" /> },
        defense: { label: 'Defesa', icon: <Shield size={16} className="inline mr-1 text-blue-400" /> },
        'special-attack': { label: 'Atq. Esp.', icon: <Zap size={16} className="inline mr-1 text-purple-400" /> },
        'special-defense': { label: 'Def. Esp.', icon: <ShieldOff size={16} className="inline mr-1 text-green-400" /> },
        speed: { label: 'Velocidade', icon: <Gauge size={16} className="inline mr-1 text-yellow-400" /> },
    };

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${modalBorderColor} border-2 text-white font-inter rounded-xl p-6 relative`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl font-bold"
                    aria-label={translate('close')}
                >
                    &times;
                </button>
                <h3 className="text-3xl font-bold capitalize text-blue-400 mb-6 text-center">
                    {translate('pokemonDetails')}: {pokemon.name} #{String(pokemon.id).padStart(3, '0')}
                </h3>

                {/* Seções de conteúdo principal empilhadas verticalmente */}
                <div className="flex flex-col gap-y-6 w-full items-start">
                    {/* Seção de Habilidades */}
                    <div className="w-full">
                        <h4 className="text-xl font-semibold text-gray-300 mb-3 flex items-center">
                            <Lightbulb size={20} className="inline mr-2 text-yellow-300" /> {translate('abilities')}
                        </h4>
                        <ul className="list-disc list-inside text-gray-400 text-base pl-5 space-y-1">
                            {pokemon.abilities.map(abilityInfo => (
                                <li key={abilityInfo.ability.name} className="capitalize">
                                    {abilityInfo.ability.name.replace('-', ' ')}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Seção de Estatísticas */}
                    <div className="w-full">
                        <h4 className="text-xl font-semibold text-gray-300 mb-3 flex items-center">
                            <Scale size={20} className="inline mr-2 text-pink-300" /> {translate('baseStats')}
                        </h4>
                        <ul className="text-gray-400 text-base pl-5 space-y-1 w-full">
                            {pokemon.stats.map(statInfo => {
                                const stat = statDetails[statInfo.stat.name];
                                return (
                                    <li key={statInfo.stat.name} className="capitalize flex justify-between items-center w-full">
                                        <span className="flex items-center">
                                            {stat?.icon} {stat?.label || statInfo.stat.name.replace('-', ' ')}:
                                        </span>
                                        <span className="font-bold text-gray-200">{statInfo.base_stat}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Seções de Altura e Peso empilhadas verticalmente abaixo das outras */}
                <div className="flex flex-col items-start w-full mt-6 gap-y-4 text-gray-300 text-lg">
                    <p className="flex items-center">
                        <Ruler size={20} className="inline mr-2 text-teal-300" /> {translate('height')} {pokemon.height / 10} m
                    </p>
                    <p className="flex items-center">
                        <Scale size={20} className="inline mr-2 text-lime-300" /> {translate('weight')} {pokemon.weight / 10} kg
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailsModal;
