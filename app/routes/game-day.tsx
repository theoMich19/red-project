import { useEffect, useRef, useState } from "react";
import { useLoaderData } from '@remix-run/react';
import { PreviousAttempts, RemainingAttempts } from "~/compnent/common/attemps/attemps";

import { handleInputChange, handleKeyDown, handleVirtualKeyPress } from "~/utils/game";
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"

import ModalGame from "~/compnent/modal/modal-game";
import { Keyboard } from "~/compnent/common/keyboard/keyboard";
import { sendToast } from "~/utils/toast";
import LayoutPage from "~/compnent/common/pageLayout";

const getWords = () => {
  // "pomme", "livre", "chat", "chien", "porte", "verre", "lune", "sole", "plage", "sable", "rouge", "bleu", "vert", "noir", "blanc", "jaune", "gris", 

  const mots = [
    'liberte', 'desert', 'voyage', 'reve', 'chanson', 'jardin', 'ordinateur', 'esperance', 'sol', 'foret', 'soleil', 'lampe', 'musique', 'ocean', 'bateau', 'amour', 'mur', 'montre', 'plafond', 'plage', 'train', 'ville', 'etoile', 'ciel', 'fleur', 'fenetre', 'avion', 'tableau', 'riviere', 'route', 'vallee', 'lumiere', 'livre', 'billet', 'chapeau', 'voiture', 'table', 'chaise', 'harmonie', 'bureau', 'maison', 'plaine', 'escalier', 'animal', 'couloir', 'hotel', 'toit', 'montagne', 'chateau', 'sourire', 'poesie', 'pont', 'porte'
  ];
  return mots[Math.floor(Math.random() * mots.length)].toUpperCase();
}


export const loader = async () => {
  const secretWord = getWords() // récupérer via la bdd (généré par chatgpt à la fin)
  // const secretWord = "SERPENTS" // récupérer via la bdd (généré par chatgpt à la fin)
  const valueindex: any = numberToWord(secretWord.length)
  const dicoUsed: Array<string> = dico[valueindex]
  return { dicoUsed, secretWord };
};

export default function GameDay() {
  let { dicoUsed, secretWord }: { dicoUsed: Array<string>, secretWord: string } = useLoaderData()
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [allAttemps, setAllAttemps] = useState<Array<Array<string>>>([]);
  const [gameStatus, setGameStatus] = useState<string>("");
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

  const checkWordsInput = () => {
    if (inputs.every((input) => input !== " " && input !== "") && !secretWord) {
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
        setGameStatus(result);
        setIsOpen(true);
        setInputs(Array(secretWord.length).fill(""));
      } else {
        inputRefs[0].current.focus();
      }
    }
  }

  useEffect(() => {
    checkWordsInput()
  }, [inputs]);

  return (
    <LayoutPage>
      {isOpen && (<ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} resetGame={resetGame} secretWord={secretWord} />)}
      <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
        <div className="flex flex-col items-center mt-16">
          <PreviousAttempts allAttemps={allAttemps} secretWord={secretWord} />
          {!gameStatus && (
            <div className="space-x-2 flex mt-2">
              {inputs.map((input, index) => (
                <input
                  key={index}
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
            </div>)}
          {
            secretWord.length - allAttemps.length - 1 > 0 &&
            <RemainingAttempts remainingAttempts={secretWord.length - allAttemps.length - 1} wordLength={secretWord.length} />
          }

          {isInvalidWord && <span className="text-red-400 font-bold bg-white p-4 rounded-lg mt-4">Le mot saisie n'existe pas dans le dictionnaire</span>}
        </div>
        <div className="my-8 p-4 border rounded-lg max-md:hidden backdrop-filter backdrop-blur-sm">
          <Keyboard onKeyPress={actionKeyVirtual} />
        </div>
      </div>
    </LayoutPage>
  );
}
