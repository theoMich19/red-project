import { useEffect, useRef, useState } from "react";
import { useLoaderData } from '@remix-run/react';
import { handleInputChange, handleKeyDown, handleVirtualKeyPress } from "~/utils/game";
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"
import { sendToast } from "~/utils/toast";
import { PreviousAttempts, RemainingAttempts } from "~/components/common/attemps/attemps";
import ModalGame from "~/components/modal/modal-game";
import LayoutPage from "~/components/common/pageLayout";
import { Keyboard } from "~/components/common/keyboard/keyboard";

const getWords = () => {
    // Suppose que vous voulez un array de mots au lieu d'un seul
    return ['DESERT', 'VOYAGE', 'REVE', 'JARDIN'].map(word => word.toUpperCase());
}

export const loader = async () => {
    const secretWords = getWords(); // Maintenant c'est une liste de mots
    const sizeWord = secretWords[0].length; // Utilisez la longueur du premier mot comme référence
    const valueindex: string = numberToWord(sizeWord);
    const listWords: any = dico;
    const dicoUsed: Array<string> = listWords[valueindex];
    return { dicoUsed, secretWords };
};

export default function TimeAttackGame() {
    let { dicoUsed, secretWords }: { dicoUsed: Array<string>, secretWords: Array<string> } = useLoaderData();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [allAttempts, setAllAttempts] = useState<Array<Array<string>>>([]);
    const [gameStatus, setGameStatus] = useState<string>("");
    const [inputs, setInputs] = useState(Array(secretWords[0].length).fill(""));
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(60); // Changez pour la durée souhaitée
    const inputRefs: any = Array(secretWords[0].length)
        .fill(0)
        .map(() => useRef());

    const nextWord = () => {
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < secretWords.length) {
            setCurrentWordIndex(nextIndex);
            setInputs(Array(secretWords[nextIndex].length).fill(""));
        } else {
            // Fin du jeu, plus de mots
            setGameStatus('finished');
            setIsOpen(true);
        }
    };

    useEffect(() => {
        // Décompte du temps
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setGameStatus('timeout');
            setIsOpen(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        const currentWord = secretWords[currentWordIndex];
        if (inputs.every((input) => input !== " " && input !== "")) {
            const wordsAttempt = inputs.join("");

            if (!dicoUsed.includes(wordsAttempt.toLowerCase())) {
                setIsInvalidWord(true);
                sendToast({ type: "error", message: "Le mot n'existe pas", duration: 2000 });
                return;
            }

            setAllAttempts((prevAllAttempts) => [...prevAllAttempts, [...inputs]]);
            setInputs(Array(currentWord.length).fill(""));

            const isCorrect = inputs.every((input, index) => input === currentWord[index]);

            if (isCorrect) {
                nextWord(); // Passer au mot suivant
            } else {
                inputRefs[0].current.focus();
            }
        }
    }, [inputs, currentWordIndex, secretWords]);

    return (
        <LayoutPage>
            {isOpen && (<ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} resetGame={() => { }} secretWord={secretWords[currentWordIndex]} />)}
            <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
                <div className="flex flex-col items-center mt-4">
                    {/* Timer display */}
                    <div className="text-2xl font-bold bg-white p-2 rounded-md">
                        {timeLeft}s</div>
                    <PreviousAttempts allAttemps={allAttempts} secretWord={secretWords[currentWordIndex]} />
                    {!gameStatus && (
                        <div className="space-x-2 flex mt-2">
                            {inputs.map((input, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="w-14 h-14 text-center rounded-lg shadow-card bg-white"
                                    style={{ fontFamily: "Oswald" }}
                                    minLength={1}
                                    maxLength={1}
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e.target.value, inputRefs, inputs, setInputs, setIsInvalidWord)}
                                    onKeyDown={(e) => handleKeyDown(index, e, inputRefs, inputs)}
                                    ref={inputRefs[index]}
                                />
                            ))}
                        </div>
                    )}
                    {isInvalidWord && <span className="text-red-400 font-bold bg-white p-4 rounded-lg mt-4">Le mot saisi n'existe pas dans le dictionnaire</span>}
                    <RemainingAttempts remainingAttempts={secretWords.length - currentWordIndex - 1} wordLength={secretWords[currentWordIndex].length} />
                </div>
                <div className="my-8 p-4 border rounded-lg backdrop-filter backdrop-blur-sm">
                    <Keyboard onKeyPress={(key: any) => handleVirtualKeyPress(key, secretWords[currentWordIndex], inputRefs, inputs, setInputs)} />
                </div>
            </div>
        </LayoutPage>
    );
}
