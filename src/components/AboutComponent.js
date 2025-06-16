import React, { useContext } from 'react';
import { LanguageContext } from './../contexts/LanguageContext'; 

const AboutComponent = () => {

    const { translate } = useContext(LanguageContext);

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-64px)] text-center px-4 py-8 mt-20">
            <h2 className="text-4xl font-bold text-blue-400 mb-10 font-inter animate-fade-in-up">
                {translate('aboutTitle')}
            </h2>

            <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto flex flex-col items-center">
                {/* Contêiner da foto */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-blue-400 shadow-md">
                    <img
                        src="https://placehold.co/200x200/333/FFF?text=Sua+Foto"
                        alt={translate('myPhotoAlt')}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/333/FFF?text=Sua+Foto"; }}
                    />
                </div>

                {/* Título do nome */}
                <h3 className="text-3xl font-semibold text-white mb-4 font-inter">
                    João Vitor Tocha
                </h3>

                {/* Área de texto para descrição */}
                <p className="text-gray-300 text-base leading-relaxed text-center px-4">
                    {translate('aboutDescriptionPlaceholder')}
                </p>
            </div>
        </div>
    );
};

export default AboutComponent;
