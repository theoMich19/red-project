import React, { useState } from 'react';

const CardInfo = ({ title, content }: any) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="w-full max-w-sm cursor-pointer perspective"
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`relative w-full h-64 transition-transform duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute backface-hidden w-full h-full bg-white flex items-center justify-center">
                    <h2 className="text-black text-lg">Information</h2>
                </div>
                <div className="absolute rotate-y-180 backface-hidden w-full h-full bg-white flex items-center justify-center">
                    <p className="text-black">"Enigmatique" est un jeu captivant où l'objectif est de dévoiler un mot mystérieusement dissimulé. Pour ce faire, le joueur doit soumettre un mot de même longueur. Si une lettre fait partie du mot secret mais n'est pas positionnée correctement, elle s'affichera en orange. En revanche, si la lettre appartient au mot et est à la bonne place, elle s'illuminera en vert. Dans le cas contraire, elle demeurera discrètement grise. Plongez dans cette aventure ludique où la déduction et la perspicacité vous mèneront à la découverte du mot énigmatique.</p>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
