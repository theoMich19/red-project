import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ModalGame({
  setIsOpen,
  resetGame,
  gameStatus,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resetGame: Function;
  gameStatus: string;
}) {
  const [progress, setProgress] = useState(0);
  const time = 5 * 10 // 50 * 1000 = 5000 ms
  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          resetGame();
        }
        return newProgress;
      });
    }, time);

    return () => clearInterval(interval);
  }, [gameStatus]);

  return (
    <div
      className={`absolute inset-0 backdrop-blur-sm flex items-center modal-animation `}
      onClick={() => resetGame()}
    >
      <div className="container mx-auto  max-w-fit">
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
            {gameStatus === "won" && (
              <span className="text-2xl text-center p-2">
                FÉLICITATIONS, VOUS AVEZ GAGNÉ!
              </span>
            )}
            {gameStatus === "lose" && (
              <span className="text-2xl text-center p-2">
                Dommage vous aures plus de chance une prochaine fois 😔
              </span>
            )}
            <div className="bg-blue-100 h-2.5 rounded-full w-[50%]">
              <div
                className={`${gameStatus === "won" ? "bg-green-400" : "bg-gray-400"} h-2.5 rounded-full w-[50%]`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
