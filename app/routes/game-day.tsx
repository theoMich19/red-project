import { useState } from "react";
import { Link, useLoaderData } from '@remix-run/react';
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"
import ModalGame from "~/compnent/modal/modal-game";
import LayoutPage from "~/compnent/common/pageLayout";
import GameBoard from "~/compnent/game/game-board";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";

interface useLoaderDataType { user: User, dicoUsed: Array<string>, secretWord: string, isWordFound: boolean }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request)

  let isWordFound = false;
  let res = await fetch(`${process.env.REST_URL_API}/wordsDay`);
  const data = await res.json();

  const secretWord = data.length === 0 ? "" : data[0].value.toUpperCase();

  const sizeWord = secretWord.length
  const valueindex = numberToWord(sizeWord) as string
  const listWords: any = dico;
  const dicoUsed: Array<string> = listWords[valueindex]
  console.log(user)
  return { user, dicoUsed, secretWord, isWordFound };
};

export default function GameDay() {
  let { user, dicoUsed, secretWord, isWordFound }: useLoaderDataType = useLoaderData()
  const [gameStatus, setGameStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const errorSecretWord = !secretWord ? "Une erreur est survenue, revenez plus tard !" : ""
  const status = !gameStatus && !isWordFound && secretWord

  return (
    <LayoutPage user={user}>
      {isOpen && (<ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} secretWord={secretWord} />)}
      <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
        {status ?
          (<GameBoard dicoUsed={dicoUsed} secretWord={secretWord} setGameStatus={setGameStatus} setIsOpen={setIsOpen} />) :
          (
            <div className="min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] mt-[20vh]">
              <div className="w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center justify-evenly text-white gap-4 md:text-md text-sm">
                <div className="flex flex-col">
                  {
                    errorSecretWord ? (
                      <h1 className="text-lg md:text-2xl font-bold">{errorSecretWord}</h1>
                    ) : (
                      <>
                        <h1 className="text-lg md:text-2xl font-bold">Le mot du jour a déjà été trouvé</h1>
                        <span className="text-lg text-center p-2">Le mot caché était : </span>
                        <span className="px-4 py-2 border-2 border-gray-600 border-dashed  w-fit items-center rounded-lg self-center">
                          {secretWord}
                        </span>s
                      </>
                    )
                  }

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
