import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenCheck, X, CheckSquare, Clock, BadgeInfo } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request);
    if (!user) {
        redirect('/');
    }
    return { user };
}

export default function Information() {
    let { user }: { user: User } = useLoaderData();
    const [selectedId, setSelectedId] = useState(null);

    const cards = [
        {
            id: 'information',
            icon: <BadgeInfo />,
            title: 'Information',
            content: "C'est un jeu captivant où l'objectif est de dévoiler un mot mystérieusement dissimulé. Pour ce faire, le joueur doit soumettre un mot de même longueur. Attention le nombre d'essaie est limité.\n\nPlongez dans cette aventure ludique où la déduction et la perspicacité vous mèneront à la découverte du mot énigmatique.",
        },
        {
            id: 'how-to-play',
            icon: <BookOpenCheck />,
            title: 'Comment jouer',
            content: "Une fois le mot saisie",
            subContent: [
                { key: 'gray', bgColor: "bg-gray-300", text: "GRIS, si la lettre ne fait pas partie du mot secret.", icon: <X /> },
                { key: 'orange', bgColor: "bg-orange-200", text: "ORANGE, si la lettre fait partie du mot secret mais n'est pas positionnée correctement.", icon: <Clock /> },
                { key: 'green', bgColor: "bg-green-200", text: "VERT, si la lettre fait partie du mot secret et est positionnée correctement.", icon: <CheckSquare /> }
            ]
        }
    ];

    const cardSelected = cards.find(card => card.id === selectedId)

    return (
        <LayoutPage user={user}>
            <div className="flex max-sm:flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center gap-8 pt-16">
                {cards.map((card: any) => (
                    <motion.div
                        key={card.id}
                        layoutId={card.id}
                        onClick={() => setSelectedId(card.id)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer p-4 bg-white rounded-lg shadow-lg min-w-[300px] text-center"
                    >
                        <div className="flex items-center gap-2 text-2xl font-bold text-slate-700">
                            {card.icon}
                            <motion.h1>{card.title}</motion.h1>
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
                                onClick={() => setSelectedId(null)}
                            />
                            <motion.div
                                layoutId={selectedId}
                                className="fixed inset-0 bg-white p-8 m-auto rounded-lg shadow-lg flex flex-col items-center z-30 gap-4"
                                style={{ maxWidth: '600px', width: '80vw', maxHeight: '50vh' }}
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2 text-xl">
                                        {cardSelected?.icon}
                                        <h1 className="text-2xl font-bold">{cardSelected?.title}</h1>
                                    </div>
                                    <button onClick={() => setSelectedId(null)} className="p-2">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="flex flex-col items-start text-xl">
                                    <span className="text-lg md:text-md overflow-auto">{cardSelected?.content}</span>
                                    {selectedId === 'how-to-play' && (
                                        <div className="text-lg md:text-md overflow-auto">
                                            {cardSelected?.subContent?.map((item: any) => (
                                                <div key={item.key} className="flex items-center gap-2 my-2">
                                                    {/* {item.icon} */}
                                                    <span className={`${item.bgColor} px-2 py-1 border rounded-lg font-bold`}>A</span>
                                                    <span>{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </LayoutPage>
    );
}
