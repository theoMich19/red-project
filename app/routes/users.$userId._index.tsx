import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import { Award, Cake, CircleCheckBig, Hash, Pencil, SearchCheck, UsersRound } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";
import { getSession, getUserId } from "~/session.server";
import { Friend } from "~/ts/friend";
import { User } from "~/ts/user";
import { formatDate } from "~/utils/date";

interface useLoaderDataType { user: User, wordsFoundList: Array<Word>, confirmedFriendsList: Array<Friend> }

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

    const apiWordsFind = await fetch(`${process.env.REST_URL_API}/users/${user.id}/wordsFound`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const wordsFoundList = await apiWordsFind.json()

    const apiConfirmedFriends = await fetch(`${process.env.REST_URL_API}/friends/confirmed`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const confirmedFriendsList = await apiConfirmedFriends.json()

    return { user, wordsFoundList, confirmedFriendsList }
}

export default function Profile() {
    const { user, wordsFoundList, confirmedFriendsList }: useLoaderDataType = useLoaderData()

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


    return (
        <LayoutPage user={user}>
            <div className="flex flex-col h-full items-center justify-center ">
                <motion.div className="flex flex-col items-center overflow-x-hidden h-full pt-[10vh]"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div className="flex max-md:flex-col max-md:items-center min-w-[50vw] text-white rounded-lg p-8 shadow-xl gap-8 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
                        style={{ backdropFilter: 'blur(10px)' }}
                    >
                        <motion.img
                            src={"/images/avatar/avatar_1.jpg"}
                            alt="User Avatar"
                            className="mb-4 w-32 h-32 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20
                            }}
                        />
                        <div className="flex flex-col gap-2 text-start w-full">
                            <motion.h2 className="text-2xl font-bold flex items-center justify-between w-full"
                                variants={itemVariants}
                            >
                                {user.pseudo}
                                <Link to={`/users/${user.id}/edit`} className="opacity-50 hover:opacity-100 transition-opacity justify-between">
                                    <motion.div
                                        className="flex items-center gap-2 p-1 rounded hover:bg-gray-700 hover:opacity-75 cursor-pointer "
                                        initial={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Pencil size={16} className="text-white" />
                                        <span className="text-sm text-white">Modifier</span>
                                    </motion.div>
                                </Link>
                            </motion.h2>
                            <motion.span className="flex gap-4 items-center text-sm"
                                variants={itemVariants}
                            >
                                <Award size={20} />
                                Membre depuis le {formatDate(user.created_at)}
                            </motion.span>
                            {
                                formatDate(user.birthday) && (
                                    < motion.span className="flex gap-4 items-center text-sm"
                                        variants={itemVariants}
                                    >
                                        <Cake size={20} />
                                        Née le  {formatDate(user.birthday)}
                                    </motion.span>
                                )
                            }
                            <motion.span className="flex gap-4 items-center text-sm italic"
                                variants={itemVariants}
                            >
                                <Hash size={20} />
                                {user.friend_code}
                            </motion.span>
                        </div>
                    </motion.div>
                    <motion.div className="flex justify-evenly gap-5 w-full min:lgmax-w-[80vw] min-w-[50vw] text-white rounded-lg p-4 mt-4 bg-opacity-20 bg-white border border-gray-200 shadow  bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
                        variants={containerVariants}
                    >
                        <div className="flex flex-col items-center text-center opacity-80">
                            <motion.span className="flex justify-center text-center gap-4"><SearchCheck size={20} />Mots trouvés </motion.span>
                            <motion.span variants={itemVariants}>{wordsFoundList.length}</motion.span>
                        </div>
                        <div className="flex flex-col items-center text-center opacity-80">
                            <motion.span className="flex justify-center text-center gap-4"><UsersRound size={20} />Amis</motion.span>
                            <motion.span variants={itemVariants}>{confirmedFriendsList.length}</motion.span>
                        </div>
                    </motion.div>
                    {
                        wordsFoundList.length !== 0 ? (
                            <motion.div className="flex flex-col gap-5 w-full min:lgmax-w-[80vw] min-w-[50vw] text-white rounded-lg p-4 mt-4  bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at center, #4F5E3C 0%, #2B3F38 50%, #080D11 100%)'
                                }}
                                variants={containerVariants}
                            >
                                {wordsFoundList.map((word, index) => (
                                    <motion.div className="flex justify-around items-center"
                                        key={index}
                                        variants={itemVariants}
                                    >
                                        <CircleCheckBig />
                                        <span className="text-base">{word.value}</span>
                                        <span className="text-base">{formatDate(word.date_create)}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : null
                    }
                </motion.div>
            </div>
        </LayoutPage >
    );
}
