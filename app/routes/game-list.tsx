import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Infinity, Swords, X } from 'lucide-react';
import LayoutPage from "~/components/common/pageLayout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request);
    if (!user) {
        redirect('/');
    }
    return { user };
}

export default function Game() {
    let { user }: { user: User } = useLoaderData();
    const [selectedId, setSelectedId] = useState(null);

    const gamesInfo = [
        {
            id: 'survival',
            link: "",
            icon: <Swords size={24} />,
            title: 'Survie',
            subtitle: 'Jeu de survie',
            content: "Dans ce mode, le joueur peut échouer à trois mots sans que la partie s'arrête. Concentrez-vous et survivez aussi longtemps que possible!"
        },
        {
            id: 'time-attack',
            link: "",
            icon: <Clock size={24} />,
            title: 'Contre la montre',
            subtitle: 'Trouvez les mots rapidement',
            content: "Dans ce mode, le joueur doit trouver le plus de mots possible rapidement. Chaque mot correct vous donne du temps supplémentaire. Soyez rapide et précis!"
        },
        {
            id: 'infinity',
            link: "/game-train",
            icon: <Infinity size={24} />,
            title: 'Entrainement',
            subtitle: 'Mode infini',
            content: "Dans ce mode, le joueur joue à l'infini. Aucun moyen de s'arreter.Trouver tous les mots possible."
        }
    ];

    const gameSelected = gamesInfo.find(game => game.id === selectedId)

    return (
        <LayoutPage user={user}>
            <div className="flex max-sm:flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center gap-8 pt-16">
                {gamesInfo.map((game: any) => (
                    <motion.div
                        key={game.id}
                        layoutId={game.id}
                        onClick={() => setSelectedId(game.id)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer p-4 bg-white rounded-lg shadow-lg min-w-[300px]"
                    >
                        <div className="flex items-center gap-2">
                            {game.icon}
                            <motion.h2>{game.title}</motion.h2>
                        </div>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                            <motion.div
                                layoutId={selectedId}
                                className="fixed inset-0 bg-white p-8 m-auto rounded-lg shadow-lg flex flex-col items-center z-30 gap-4"
                                style={{ maxWidth: '600px', width: '80vw', maxHeight: '40vh' }}
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2 text-xl">
                                        <Infinity size={28} />
                                        <h2>{gameSelected?.title}</h2>
                                    </div>
                                    <button onClick={() => setSelectedId(null)} className="p-2">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p>{gameSelected?.content}</p>

                                {
                                    gameSelected && gameSelected?.link !== "" ?
                                        (<Link to={gameSelected.link.toString()}>
                                            <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">
                                                Jouer
                                            </span>
                                        </Link>) :
                                        (<button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 text-sm rounded">
                                            En construction
                                        </button>)
                                }


                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </LayoutPage >
    );
}
