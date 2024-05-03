import { useState } from "react";
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"
import ModalGame from "~/compnent/modal/modal-game";
import LayoutPage from "~/compnent/common/pageLayout";
import GameBoard from "~/compnent/game/game-board";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, getUser } from "~/session.server";
import { User } from "~/ts/user";

interface useLoaderDataType { user: User, dicoUsed: Array<string>, dataSecretWord: Word, isWordFound: boolean }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request)

  let isWordFound = false; // faire requet pour savoir
  let res = await fetch(`${process.env.REST_URL_API}/wordsDay`);
  const dataSecretWord = await res.json();

  const secretWord = dataSecretWord.value.toUpperCase();

  const sizeWord = secretWord.length
  const valueindex = numberToWord(sizeWord) as string
  const listWords: any = dico;
  const dicoUsed: Array<string> = listWords[valueindex]
  return { user, dicoUsed, dataSecretWord, isWordFound };
};

export default function GameDay() {
  let { user, dicoUsed, dataSecretWord, isWordFound }: useLoaderDataType = useLoaderData()
  const [gameStatus, setGameStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fetcherWordFind = useFetcher()

  const handChageGameStatus = async (status: string) => {
    setGameStatus(status)

    if (status === "won") {
      const formData = new FormData()
      formData.append("user_id", user.id.toString())
      formData.append("words_id", dataSecretWord.id.toString())

      fetcherWordFind.submit(formData, {
        method: "post",
        action: "/api/addWordToUser"
      })
    }
  }

  const secretWord = dataSecretWord.value.toUpperCase()
  const errorSecretWord = !secretWord ? "Une erreur est survenue, revenez plus tard !" : ""
  const status = !gameStatus && !isWordFound && secretWord


  return (
    <LayoutPage user={user}>
      {isOpen && (<ModalGame setIsOpen={setIsOpen} gameStatus={gameStatus} secretWord={secretWord} />)}
      <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
        {status ?
          (<GameBoard dicoUsed={dicoUsed} secretWord={secretWord} handChageGameStatus={handChageGameStatus} setIsOpen={setIsOpen} />) :
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
                        </span>
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
