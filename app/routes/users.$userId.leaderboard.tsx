import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import LayoutPage from "~/components/common/pageLayout";
import { getSession, getUserId } from "~/session.server";
import { User } from "~/ts/user";


interface dataUser { id: number, pseudo: string, words_count: number }

interface confirmedFriendsWithWordsList {
    user: dataUser,
    friends: Array<dataUser>
}

interface useLoaderDataType { user: User, confirmedFriendsWithWords: confirmedFriendsWithWordsList }

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getSession(request)
    const token = await session.get('token')

    const userId = await getUserId(request);
    const apiUser = await fetch(`${process.env.REST_URL_API}/users/${userId}`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    const user = await apiUser.json()
    if (!user || user == null) {
        redirect('/')
    }

    const apiConfirmedFriendsWithWords = await fetch(`${process.env.REST_URL_API}/friends/confirmed/words`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const confirmedFriendsWithWords = await apiConfirmedFriendsWithWords.json()

    return { user, confirmedFriendsWithWords }
}


export default function LeaderBord() {
    const { user, confirmedFriendsWithWords }: useLoaderDataType = useLoaderData();

    const containerVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const sortedDataList = [confirmedFriendsWithWords.user, ...confirmedFriendsWithWords.friends].sort((a, b) => b.words_count - a.words_count);

    return (
        <LayoutPage user={user}>
            <div className="flex flex-col h-full items-center justify-center ">
                <motion.div className="flex flex-col items-center overflow-x-hidden h-full pt-[10vh] max-md:w-full min-w-[50vw]"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div className="flex flex-col gap-4  w-full"
                        variants={containerVariants}
                    >
                        <motion.h6 className="text-xl font-bold flex items-center justify-between w-full text-white p-2 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500 rounded-lg shadow-xl"
                            variants={itemVariants}
                        >
                            Tableau des score
                        </motion.h6>
                        {sortedDataList.map((item: dataUser) => (
                            <>
                                {
                                    item.id == user.id ? (
                                        < motion.div key={item.id} className="flex items-center py-4 px-6 justify-between w-full text-white bg-gradient-to-r from-pink-500 to-pink-800 rounded-lg shadow-xl"
                                            variants={itemVariants}
                                        >
                                            <span className="text-lg font-bold">{item.pseudo}</span>
                                            <span className="text-lg">{item.words_count}  mots trouvés</span>
                                        </motion.div>
                                    ) : (
                                        < motion.div key={item.id} className="flex items-center py-4 px-6 justify-between w-full text-white bg-gradient-to-r from-teal-300 via-teal-500 to-green-500 rounded-lg shadow-xl"
                                            variants={itemVariants}
                                        >
                                            <span className="text-lg font-bold">{item.pseudo}</span>
                                            <span className="text-lg">{item.words_count}  mots trouvés</span>
                                        </motion.div>
                                    )
                                }
                            </>
                        ))
                        }
                    </motion.div >
                </motion.div>
            </div>
        </LayoutPage>
    );
};