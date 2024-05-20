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
            content: "C'est un jeu captivant où l'objectif est de dévoiler un mot mystérieusement dissimulé. Pour ce faire, le joueur doit soumettre un mot de même longueur. Attention, le nombre d'essais est limité.\n\nPlongez dans cette aventure ludique où la déduction et la perspicacité vous mèneront à la découverte du mot énigmatique.",
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
            <div className="flex max-lg:flex-col items-center h-full justify-center gap-8 pt-16">
                {cards.map(card =>
                    <motion.div
                        className="flex flex-col bg-white p-8 rounded-lg shadow-lg items-center gap-4 w-[40vw] h-[40vh] max-md:w-full"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2 text-xl">
                                {card?.icon}
                                <h1 className="text-2xl max-lg:text-sm font-bold">{card?.title}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-start text-xl">
                            <span className="text-lg max-md:text-sm overflow-auto">{card?.content}</span>
                            {card.id === 'how-to-play' && (
                                <div className="text-lg max-md:text-sm overflow-auto">
                                    {card?.subContent?.map((item: any) => (
                                        <div key={item.key} className="flex items-center gap-2 my-2">
                                            <span className={`${item.bgColor} px-2 py-1 border rounded-lg font-bold max-md:self-start`}>A</span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </LayoutPage>
    );
}
