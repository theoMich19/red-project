import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PreviousAttempts, RemainingAttempts } from "~/compnent/common/attemps/attemps";

import { handleInputChange, handleKeyDown, handleVirtualKeyPress } from "~/utils/game";

import ModalGame from "~/compnent/modal/modal-game";
import { Keyboard } from "~/compnent/common/keyboard/keyboard";
import { sendToast } from "~/utils/toast";
import LayoutPage from "~/compnent/common/pageLayout";

interface GameBoardProps {
    dicoUsed: Array<string>,
    secretWord: string,
    handChageGameStatus: (status: string) => void;
    setIsOpen: (open: boolean) => void;

}

export default function GameBoard({ dicoUsed, secretWord, handChageGameStatus, setIsOpen }: GameBoardProps) {
    /*
   * utilisation d'un objet pour chaque lettre [{id :'', value: '', bg: ''}] 
  */
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [allAttemps, setAllAttemps] = useState<Array<Array<string>>>([]);
    const [inputs, setInputs] = useState(Array(secretWord.length).fill(""));
    const inputRefs: any = Array(secretWord.length)
        .fill(0)
        .map(() => useRef());

    // const resetGame = () => { // enlever le reste et mettre une fin
    //     handChageGameStatus("")
    //     setAllAttemps([])
    //     setIsOpen(false)
    // }

    const actionKeyVirtual = (key: string) => {
        handleVirtualKeyPress(key, secretWord, inputRefs, inputs, setInputs)
    }

    useEffect(() => {
        if (inputs.every((input) => input !== " " && input !== "")) {
            const wordsAttemp = inputs.join("")

            if (!dicoUsed.includes(wordsAttemp.toLowerCase())) {
                setIsInvalidWord(true);
                sendToast({ type: "error", message: "Le mot n'existe pas", duration: 2000 });
                return;
            }

            setAllAttemps((prevAllAttemps) => [...prevAllAttemps, [...inputs]]);
            setInputs(Array(secretWord.length).fill(""));

            const isCorrect = inputs.every(
                (input, index) => input === secretWord[index]
            );

            if (isCorrect || allAttemps.length + 1 === secretWord.length) {
                const result = isCorrect ? "won" : "lose"
                handChageGameStatus(result);
                setIsOpen(true);
                setInputs(Array(secretWord.length).fill(""));
            } else {
                inputRefs[0].current.focus();
            }
        }
    }, [inputs]);

    return (
        <>
            <div className="flex flex-col items-center mt-[20vh]">
                <PreviousAttempts allAttemps={allAttemps} secretWord={secretWord} />
                <div className="space-x-2 flex mt-2">
                    {inputs.map((input, index) => (
                        <input
                            key={index} // modifier la key car index de loupe ne peut etre traité correctement par react
                            type="text"
                            className={`max-md:w-12 max-md:h-12 w-14 h-14 flex text-center rounded-lg shadow-card bg-white`}
                            style={{ fontFamily: "Oswald" }}
                            minLength={1}
                            maxLength={1}
                            value={input}
                            onChange={(e) => handleInputChange(index, e.target.value, inputRefs, inputs, setInputs, setIsInvalidWord)}
                            onKeyDown={(e) => handleKeyDown(index, e, inputRefs, inputs,)}
                            ref={inputRefs[index]}
                        />
                    ))}
                </div>
                {
                    secretWord.length - allAttemps.length - 1 > 0 &&
                    <RemainingAttempts remainingAttempts={secretWord.length - allAttemps.length - 1} wordLength={secretWord.length} />
                }

                {isInvalidWord && <span className="text-red-400 font-bold bg-white p-4 rounded-lg mt-4">Le mot saisie n'existe pas dans le dictionnaire</span>}
            </div>
            {/* <div className="my-8 p-4 border rounded-lg max-md:hidden backdrop-filter backdrop-blur-sm">
                <Keyboard onKeyPress={actionKeyVirtual} />
            </div> */}
        </>
    );
}
