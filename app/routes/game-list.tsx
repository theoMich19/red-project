import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import LayoutPage from "~/compnent/common/pageLayout";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request)


    if (!user) {
        redirect('/')
    }
    return { user }
}


export default function Game() {
    let { user }: { user: User } = useLoaderData()
    const [survivalGameInfoFlipped, setSurvivalGameInfoFlipped] = useState(false);
    const [timeAttackInfoFlipped, setTimeAttackInfoFlipped] = useState(false);

    return (
        <LayoutPage user={user}>
            <div className="absolute top-16 left-0 right-0 bg-red-500 text-white text-center py-2 z-0">
                Cette page est en construction
            </div>
            <div className="flex max-sm:flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center gap-8 pt-16">
                <div className="cursor-pointer perspective" onClick={() => setSurvivalGameInfoFlipped(!survivalGameInfoFlipped)}>
                    <div className={`relative min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] transition-transform duration-700 preserve-3d ${survivalGameInfoFlipped ? 'rotate-y-180' : ''}`}>
                        <div className="absolute backface-hidden w-full h-full backdrop-filter backdrop-blur-lg rounded-lg p-4 flex flex-col items-center justify-center text-white gap-4 text-md">
                            <h1 className="text-white text-2xl font-bold text-center">Survie</h1>
                        </div>
                        <div className="absolute rotate-y-180 backface-hidden w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center text-white gap-4 md:text-md text-sm">
                            <h1 className="text-lg md:text-2xl font-bold">Jeu de survie</h1>
                            <p>Dans ce mode, le joueur peut échouer à trois mots sans que la partie s'arrête. Concentrez-vous et survivez aussi longtemps que possible!</p>
                            {/* <Link to={"/time-attack"}> */}
                            <span className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer</span>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>

                <div className="cursor-pointer perspective" onClick={() => setTimeAttackInfoFlipped(!timeAttackInfoFlipped)}>
                    <div className={`relative min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] transition-transform duration-700 preserve-3d ${timeAttackInfoFlipped ? 'rotate-y-180' : ''}`}>
                        <div className="absolute backface-hidden w-full h-full backdrop-filter backdrop-blur-lg rounded-lg p-4 flex flex-col items-center justify-center text-white gap-4 text-md">
                            <h1 className="text-white text-2xl font-bold text-center">Contre la montre</h1>
                        </div>
                        <div className="absolute rotate-y-180 backface-hidden w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center text-white gap-4 md:text-md text-sm">
                            <h1 className="text-lg md:text-2xl font-bold">Contre la montre</h1>
                            <p>Dans ce mode, le joueur doit trouver le plus de mots possible rapidement. Chaque mot correct vous donne du temps supplémentaire. Soyez rapide et précis!</p>
                            {/* <Link to={"/time-attack"}> */}
                            <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer</span>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div >
        </LayoutPage>
    );
}
