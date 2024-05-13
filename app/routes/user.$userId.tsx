import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { CircleCheckBig, Pencil, SearchCheck, UsersRound } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";
import { getSession, getUser } from "~/session.server";
import { User } from "~/ts/user";

interface useLoaderDataType { user: User, wordsFoundList: Array<Word> }

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getSession(request)
    const token = await session.get('token')

    const user: User = await getUser(request)
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

    return { user, wordsFoundList }
}

export default function Profile() {
    const { user, wordsFoundList }: useLoaderDataType = useLoaderData()

    // Animation variants
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


    const date = new Date(user.birthday).toLocaleDateString() !== "Invalide Date" ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` : new Date(user.birthday.toString()).toLocaleDateString()

    return (
        <LayoutPage user={user}>
            <div className="flex flex-col items-center overflow-x-hidden h-full bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center pt-24">
                <motion.div className="flex flex-col items-center overflow-x-hidden h-full"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div className="flex min-w-[50vw] text-white rounded-lg p-8 m-4 shadow-xl gap-8 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
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
                        <div className="text-start">
                            <motion.h2 className="text-2xl font-bold"
                                variants={itemVariants}
                            >
                                {user.pseudo}
                            </motion.h2>
                            <motion.span className="text-sm"
                                variants={itemVariants}
                            >
                                Membre depuis le {date}
                            </motion.span>
                        </div>
                    </motion.div>
                    <motion.div className="flex justify-evenly gap-5 min-w-[50vw] text-white rounded-lg p-4 mt-4 bg-opacity-20 bg-white border border-gray-200 shadow  bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
                        variants={containerVariants}
                    >
                        <div className="flex flex-col items-center text-center opacity-80">
                            <motion.span className="flex justify-center text-center gap-4"><SearchCheck size={20} />Mots trouvés </motion.span>
                            <motion.span variants={itemVariants}>{wordsFoundList.length}</motion.span>
                        </div>
                        <div className="flex flex-col items-center text-center opacity-80">
                            <motion.span className="flex justify-center text-center gap-4"><UsersRound size={20} />Amis</motion.span>
                            <motion.span variants={itemVariants}>0</motion.span>
                        </div>
                    </motion.div>
                    {
                        wordsFoundList.length !== 0 ? (
                            <motion.div className="flex flex-col gap-5 min-w-[50vw] text-white rounded-lg p-4 mt-4  bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
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
                                        <span className="text-base">{new Date(word.date_create).toLocaleDateString()}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : null
                    }
                </motion.div>
            </div>
        </LayoutPage>
    );
}
