import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ModalGame({
  setIsOpen,
  resetGame,
  gameStatus,
  secretWord
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resetGame: Function;
  gameStatus: string;
  secretWord: string
}) {
  const [timeRemaining, setTimeRemaining] = useState(9);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 10000);

      return () => clearTimeout(timerId);
    } else {
      resetGame()
    }
  }, [timeRemaining]);

  const resultMessage = gameStatus === "won" ? "FÉLICITATIONS, VOUS AVEZ GAGNÉ !" : "Dommage, c'est perdu !"

  return (
    <div
      className={`absolute inset-0 backdrop-blur-sm flex items-center modal-animation `}
      onClick={() => resetGame()}
    >
      <div className="container mx-auto max-w-fit">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={() => resetGame()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl text-center p-2">
                {resultMessage}
              </span>
              <span className="text-lg text-center p-2">Le mot caché était : </span>
              <span className="px-4 py-2 border-2 border-gray-600 border-dashed bg-slate-100 w-fit items-center rounded-lg self-center">
                {secretWord}
              </span>
            </div>
            <button className="bg-orange-400 px-4 py-2 text-center rounded-lg hover:bg-orange-300 transition-colors duration-75 ease-in-out text-white font-bold">
              Rejour dans ... {timeRemaining}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
