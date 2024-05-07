import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";
import { motion, AnimatePresence } from 'framer-motion';
import { Infinity, X } from 'lucide-react';
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

    const games = [
        { id: 'survival', title: 'Survie', subtitle: 'Jeu de survie' },
        { id: 'time-attack', title: 'Contre la montre', subtitle: 'Trouvez les mots rapidement' },
        { id: 'infinity', title: 'Entrainement', subtitle: 'Mode infini' }
    ];

    return (
        <LayoutPage user={user}>
            <div className="flex max-sm:flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center gap-8 pt-16">
                {games.map((game: any) => (
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
                            <Infinity size={24} />
                            <motion.h2>{game.title}</motion.h2>
                        </div>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                            <motion.div
                                layoutId={selectedId}
                                className="fixed inset-0 bg-white p-8 m-auto rounded-lg shadow-lg flex flex-col items-center"
                                style={{ maxWidth: '600px', width: '80vw', maxHeight: '40vh' }}
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Infinity size={24} />
                                        <h2>{games.find(game => game.id === selectedId)?.title}</h2>
                                    </div>
                                    <button onClick={() => setSelectedId(null)} className="p-2">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="mt-4">{games.find(game => game.id === selectedId)?.subtitle}</p>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    En construction
                                </button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </LayoutPage>
    );
}