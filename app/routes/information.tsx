import { useState } from "react";
import CardInfo from "~/compnent/common/card/card-info";
import NavBar from "~/compnent/common/navigation/navbar";
import LayoutPage from "~/compnent/common/pageLayout";


export default function Information() {
    const [flipped, setFlipped] = useState(false);
    const [flippedS, setFlippedS] = useState(false);

    return (
        <LayoutPage>
            <div className="flex max-sm:flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center gap-8 pt-16">
                <div
                    className="cursor-pointer perspective"
                    onClick={() => setFlipped(!flipped)}
                >
                    <div className={`relative min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] transition-transform duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
                        <div className="absolute backface-hidden w-full h-full bg-white bg-opacity-80 rounded-lg p-4 flex items-center justify-center text-dark gap-4 text-md">
                            <h1 className="text-dark text-2xl font-bold text-center">Information</h1>
                        </div>
                        <div className="absolute rotate-y-180 backface-hidden w-full h-full p-8 bg-white bg-opacity-80 rounded-lg flex flex-col items-center text-dark gap-4 md:text-md text-sm">
                            <h1 className="text-lg md:text-2xl font-bold">Enigmatique</h1>
                            <p>C'est un jeu captivant où l'objectif est de dévoiler un mot mystérieusement dissimulé. Pour ce faire, le joueur doit soumettre un mot de même longueur. Attention le nombre d'essaie est limité.
                                <br /><br />Plongez dans cette aventure ludique où la déduction et la perspicacité vous mèneront à la découverte du mot énigmatique.</p>
                        </div>
                    </div>
                </div>
                <div
                    className="cursor-pointer perspective"
                    onClick={() => setFlippedS(!flippedS)}
                >
                    <div className={`relative  min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] transition-transform duration-700 preserve-3d ${flippedS ? 'rotate-y-180' : ''}`}>
                        <div className="absolute backface-hidden w-full h-full bg-white bg-opacity-80 rounded-lg p-4 flex items-center justify-center text-dark gap-4 text-md">
                            <h1 className="text-dark text-2xl font-bold text-center">Comment jouer</h1>
                        </div>
                        <div className="absolute rotate-y-180 backface-hidden w-full h-full p-8 bg-white bg-opacity-80 rounded-lg flex flex-col items-center text-dark gap-4 md:text-md text-sm">
                            <h1 className="text-lg md:text-2xl font-bold">Comment jouer</h1>
                            <span className="text-left w-full">Une fois un mot saisie :</span>
                            <ul>
                                <li>
                                    <span className="bg-gray-200 rounded-lg p-1 font-bold text-black ">GRIS</span>
                                    , si la lettre ne fait pas partie du mot secret
                                </li>
                                <li>
                                    <span className="bg-orange-200 rounded-lg p-1 font-bold">ORANGE</span>
                                    , si la lettre fait partie du mot secret mais n'est pas positionnée correctement
                                </li>
                                <li>
                                    <span className="bg-green-200 rounded-lg p-1 font-bold w-4">VERT</span>
                                    , si la lettre fait partie du mot secret et est positionnée correctement
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </LayoutPage>
    );
}
