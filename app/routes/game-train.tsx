import { useState } from "react";
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"
import ModalGame from "~/components/modal/modal-game";
import LayoutPage from "~/components/common/pageLayout";
import GameBoard from "~/components/game/game-board";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, getUser } from "~/session.server";
import { User } from "~/ts/user";
import { AnimatePresence, motion } from "framer-motion";

interface useLoaderDataType { user: User, dicoUsed: Array<string>, secretWords: Array<string> }


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request);

    const secretWords = [
        "MAINS", "PORTE", "VOILE", "ROUGE", "VERT", "IMAGE", "ROUTE", "TITRE", "FORME", "LIVRE",
        "CHIEN", "CHAT", "TABLE", "FRUIT", "BALLE", "NOIRE", "CRÈME", "MÉTAL", "VERRE", "BOITE",
        "FINIR", "LASER", "SABLE", "DOUCE", "PEINE", "ÉCRAN", "HERBE", "MIEUX", "RAPIDE", "LOURD"
    ]

    const listWords: any = dico;
    const dicoUsed: Array<string> = listWords["five"]

    return { user, dicoUsed, secretWords };
};

export default function GameTrain() {
    let { user, dicoUsed, secretWords }: useLoaderDataType = useLoaderData();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [gameStatus, setGameStatus] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleNextWord = () => {
        if (gameStatus !== "") {
            const nextIndex = currentWordIndex + 1;
            setCurrentWordIndex(nextIndex);
            setGameStatus("")
        }
    }

    const available = currentWordIndex > secretWords.length - 1
    const errorSecretWord = secretWords.length === 0 ? "Une erreur est survenue, revenez plus tard !" : ""
    const resultMessage = gameStatus === "won" ? "FÉLICITATIONS, VOUS AVEZ GAGNÉ !" : "Dommage, c'est perdu !";


    return (
        <LayoutPage user={user}>
            {isOpen && (<AnimatePresence>
                <motion.div
                    className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="container mx-auto max-w-fit">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-lg border border-gray-400">
                            <div className="flex flex-col items-center gap-8">
                                <div className="flex flex-col">
                                    <span className="text-2xl text-center p-2">
                                        {resultMessage}
                                    </span>
                                    <span className="text-lg text-center p-2">Le mot caché était : </span>
                                    <span className="px-4 py-2 border-2 border-gray-600 border-dashed bg-slate-100 w-fit items-center rounded-lg self-center">
                                        {secretWords[currentWordIndex]}
                                    </span>
                                </div>
                                {
                                    currentWordIndex < secretWords.length - 1 ? (
                                        <button
                                            className="cursor-pointer px-4 py-2 rounded-lg border text-gray-600 hover:text-white hover:bg-orange-300 transition duration-150 ease-in-out"
                                            aria-label="close modal"
                                            role="button"
                                            onClick={() => {
                                                setIsOpen(false)
                                                handleNextWord()
                                            }}
                                        >
                                            Rejouer
                                        </button>
                                    ) : (
                                        <div className="flex flex-col w-full border rounded-md p-4 bg-slate-100 items-center justify-center gap-4 ">
                                            <span>Plus aucun mot disponible pour le moment</span>
                                            <Link to={'/game-list'}>
                                                <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer à un autre mode</span>
                                            </Link>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>)}
            <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
                {!gameStatus &&
                    (<GameBoard
                        dicoUsed={dicoUsed}
                        secretWord={secretWords[currentWordIndex]}
                        handChageGameStatus={setGameStatus}
                        setIsOpen={setIsOpen}
                        isRestAvaliable={true} />
                    )
                }
                {
                    errorSecretWord && (
                        <div className="min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] mt-[20vh]">
                            <div className="w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center justify-evenly text-white gap-4 md:text-md text-sm">
                                <div className="flex flex-col">
                                    <h1 className="text-lg md:text-2xl font-bold">{errorSecretWord}</h1>
                                </div>
                                <Link to={'/game-list'}>
                                    <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer à un autre mode</span>
                                </Link>
                            </div>
                        </div>
                    )
                }

            </div >
        </LayoutPage >
    );
}
