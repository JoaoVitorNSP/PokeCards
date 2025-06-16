import React, { useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext'; 

/**
 * @param {Object} props 
 * @param {function} props.onPageChange 
 */
const Header = ({ onPageChange }) => {
    const { language, setLanguage, translate } = useContext(LanguageContext);

    return (
        <header className="bg-gray-900 text-white shadow-lg py-4 px-6 fixed w-full z-10 top-0">
            <div className="container mx-auto flex justify-between items-center">
                <h1
                    className="text-3xl font-bold text-blue-400 font-inter cursor-pointer"
                    onClick={() => onPageChange('home')} 
                >
                    PokeCards
                </h1>
                <nav className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onPageChange('home'); }}
                                className="hover:text-blue-400 transition-colors duration-300 font-inter"
                            >
                                {translate('home')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onPageChange('pokemons'); }}
                                className="hover:text-blue-400 transition-colors duration-300 font-inter"
                            >
                                {translate('pokemons')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onPageChange('about'); }}
                                className="hover:text-blue-400 transition-colors duration-300 font-inter"
                            >
                                {translate('about')}
                            </a>
                        </li>
                    </ul>
                    {/* Seletor de Idioma */}
                    <div className="relative">
                        <select
                            className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="pt">🇧🇷 PT</option>
                            <option value="en">🇺🇸 EN</option>
                        </select>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
