import { useEffect, useRef, useState } from "react";
import { useLoaderData } from '@remix-run/react';
import { previousAttempts } from "~/compnent/common/attemps/attemps";

import { handleInputChange, handleKeyDown, handleVirtualKeyPress } from "~/utils/game";
import { readAndUseJsonDico } from "~/utils/dico";
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"

import ModalGame from "~/compnent/modal/modal-game";
import { Keyboard } from "~/compnent/common/keyboard/keyboard";
import { sendToast } from "~/utils/toast";
import LayoutPage from "~/compnent/common/pageLayout";
export const loader = async () => {
  const mots = [
    "pomme", "livre", "chat", "chien", "porte", "verre", "lune", "sole", "plage",
    "sable", "rouge", "bleu", "vert", "noir", "blanc", "jaune", "gris", "vin", "pain", "eau"
  ]


  const choisirMotAleatoire = () => mots[Math.floor(Math.random() * mots.length)];

  // const secretWord = choisirMotAleatoire().toUpperCase(); // récupérer via la bdd (généré par chatgpt à la fin)
  const secretWord = "SERPENTS" // récupérer via la bdd (généré par chatgpt à la fin)

  const sizeWord = secretWord.length
  const valueindex: string = numberToWord(sizeWord)
  const listWords: any = dico;
  const dicoUsed: Array<string> = listWords[valueindex]
  return { dicoUsed, secretWord };
};

export default function GameDay() {
  const { dicoUsed, secretWord }: any = useLoaderData()
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [allAttemps, setAllAttemps] = useState<Array<Array<string>>>([]);
  const [gameStatus, setGameStatus] = useState<string>("");
  const [maxAttemps] = useState<number>(secretWord.length);
  const [inputs, setInputs] = useState(Array(secretWord.length).fill(""));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRefs: any = Array(secretWord.length)
    .fill(0)
    .map(() => useRef());

  const resetGame = () => {
    setGameStatus("")
    setAllAttemps([])
    setIsOpen(false)
  }

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

      if (isCorrect || allAttemps.length + 1 === maxAttemps) {
        const result = isCorrect ? "won" : "lose"
        setGameStatus(result);
        setIsOpen(true);
        setInputs(Array(secretWord.length).fill(""));
      } else {
        inputRefs[0].current.focus();
      }
    }
  }, [inputs]);

  return (
    <LayoutPage>
      <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
        <div className="flex flex-col items-center mt-16">
          {allAttemps.length > 0 && <div>{previousAttempts(allAttemps, secretWord)}</div>}
          {isOpen && (
            <ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} resetGame={resetGame} secretWord={secretWord} />)}
          {!gameStatus && (
            <div className="mt-4 space-x-2 flex">
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  className={`max-md:w-12 max-md:h-12 w-14 h-14 flex text-center rounded-lg shadow-card bg-slate-200 `}
                  style={{ fontFamily: "Oswald" }}
                  minLength={1}
                  maxLength={1}
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value, inputRefs, inputs, setInputs, setIsInvalidWord)}
                  onKeyDown={(e) => handleKeyDown(index, e, inputRefs, inputs,)}
                  ref={inputRefs[index]}
                />
              ))}
            </div>)}
          {isInvalidWord && <span className="text-red-400 font-bold bg-white p-4 rounded-lg mt-4">Le mot saisie n'est pas correcte</span>}
        </div>
        <div className="my-8 p-4 border border-gray-400 rounded-sm max-md:hidden">
          <Keyboard onKeyPress={actionKeyVirtual} />
        </div>
      </div>
    </LayoutPage>
  );
}
