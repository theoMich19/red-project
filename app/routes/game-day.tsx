import { useEffect, useRef, useState } from "react";
import { useLoaderData } from '@remix-run/react';
import { previousAttempts } from "~/compnent/common/attemps/attemps";

import { handleInputChange, handleKeyDown } from "~/utils/game";
import { readAndUseJsonDico } from "~/utils/dico";
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"

import ModalGame from "~/compnent/modal/modal-game/modal-game";
export const loader = async () => {
  const mots = [
    "amour", "rapide", "soleil", "lune", "etoile",
    "fleur", "oiseau", "riviere", "montagne", "foret",
    "voyage", "musique", "silence", "horizon", "liberte",
    "courage", "miracle", "histoire", "lumière", "espoir",
    "champs"
  ];

  const choisirMotAleatoire = () => mots[Math.floor(Math.random() * mots.length)];

  const secretWord = choisirMotAleatoire().toUpperCase(); // récupérer via la bdd (généré par chatgpt à la fin)
  // const secretWord = "RARE" // récupérer via la bdd (généré par chatgpt à la fin)

  const sizeWord = secretWord.length
  const valueindex: string = numberToWord(sizeWord)
  const listWords: any = dico;
  const dicoUsed: Array<string> = listWords[valueindex]
  return { dicoUsed, secretWord };
};

export default function GameDay() {
  const { dicoUsed, secretWord }: any = useLoaderData()
  console.log("🚀 ~ GameDay ~ secretWord:", secretWord)
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
    setAllAttemps([])
    setInputs(Array(secretWord.length).fill(""));
    setIsOpen(false)
  }

  useEffect(() => {
    if (inputs.every((input) => input !== " " && input !== "")) {
      const wordsAttemp = inputs.join("")

      if (!dicoUsed.includes(wordsAttemp.toLowerCase())) {
        console.log("Le mot n'existe pas")
        setIsInvalidWord(true); // Déclencher 
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
      } else {
        inputRefs[0].current.focus();
      }
    }
  }, [inputs, allAttemps, maxAttemps, secretWord.length]);

  return (
    <div className="flex flex-col items-center overflow-x-hidden bg-gray-600 h-full">
      <div className="flex flex-col items-center w-full mb-[5vh]">
        <h1
          className="text-9xl font-bold mb-4"
          style={{ fontFamily: "Island Moments" }}
        >
          Game day
        </h1>
      </div>
      <div className="px-16 pb-16 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <span className="p-4 text-lg">
            Il vous reste : {maxAttemps - allAttemps.length} essai
          </span>
          {isInvalidWord && <span className="text-red ">Le mot saisie n'est pas correcte</span>}
          {allAttemps.length > 0 && <div>{previousAttempts(allAttemps, secretWord)}</div>}
          {isOpen ? (
            <ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} resetGame={resetGame} secretWord={secretWord} />
          ) : (
            <div className="mt-4 space-x-2">
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  className={`w-20 h-20 text-center border bg-slate-50 `}
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
          )}
        </div>
      </div>
    </div>
  );
}
