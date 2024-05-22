import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useFetcher, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { Award, Cake, CircleCheckBig, LoaderCircle, Pencil, SearchCheck, Trash2, UsersRound } from "lucide-react";
import { useEffect, useRef } from "react";
import LayoutPage from "~/components/common/pageLayout";
import { getSession, getUserId } from "~/session.server";
import { Friend } from "~/ts/friend";
import { User } from "~/ts/user";
import { formatDate } from "~/utils/date";
import { sendToast } from "~/utils/toast";


interface useLoaderDataType { user: User, confirmedFriendsList: Array<Friend>, pendingFriendsList: Array<Friend> }

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

    const apiConfirmedFriends = await fetch(`${process.env.REST_URL_API}/friends/confirmed`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    const apiPendingFriends = await fetch(`${process.env.REST_URL_API}/friends/pending`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const confirmedFriendsList = await apiConfirmedFriends.json()
    const pendingFriendsList = await apiPendingFriends.json()

    return { user, confirmedFriendsList, pendingFriendsList }
}

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request)
    const token = await session.get("token")

    const formData = await request.formData()
    const response = await fetch(`${process.env.REST_URL_API}/friends/add`, {
        method: "post",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    const result = await response.json()
    return result
}



export default function ProfileFriends() {
    const { user, confirmedFriendsList, pendingFriendsList }: useLoaderDataType = useLoaderData();
    const navigation = useNavigation();
    const dataAction = useActionData()
    const loading = navigation.state === "idle" ? false : true;
    const fetcherFriend = useFetcher()
    const inputRef = useRef(null);

    useEffect(() => {
        // console.log(dataAction)
        // if (dataAction?.id) { 
        //     inputRef.current.value = ''; 

        // }
    }, [dataAction])

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

    const deleteFriend = async (friendId: number) => {
        fetcherFriend.submit({
            method: "delete",
            action: `/api/friends/delete/${friendId}`
        })
    }

    const acceptFriend = async (friendId: number) => {
        fetcherFriend.submit({
            method: "patch",
            action: `/api/friends/accept/${friendId}`
        })
    }

    return (
        <LayoutPage user={user}>
            <div className="flex flex-col h-full items-center justify-center ">
                <motion.div className="flex flex-col items-center overflow-x-hidden h-full pt-[10vh] gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div className="flex max-md:flex-col max-md:items-center min-w-[50vw] w-full text-white rounded-lg p-8 shadow-xl gap-8 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
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
                    <motion.div
                        className="flex max-md:flex-col max-md:items-center min-w-[50vw] text-white rounded-lg p-8 shadow-xl gap-8 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500 justify-between items-center"
                        style={{ backdropFilter: 'blur(10px)' }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <motion.h6 className="text-2xl font-bold flex items-center justify-between w-full"
                                variants={itemVariants}
                            >
                                Ajouter un ami
                            </motion.h6>
                            <motion.span className="text-sm italic" variants={itemVariants}>
                                Vous pouvez saisir son code ou son email
                            </motion.span>
                        </div>
                        <Form method="post" className="flex max-md:flex-col gap-4 ">
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                placeholder="Email ou Code Ami"
                                className="w-full bg-white opacity-75 border-none text-gray-600 rounded p-2"
                                required
                                ref={inputRef}
                            />
                            <button type="submit" disabled={loading} className="text-white font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg p-2 text-center transition-colors duration-300 ease-in-out">
                                {
                                    loading
                                        ? <span className="flex gap-2 items-center justify-center">
                                            <LoaderCircle className="spinLoaderBtn" />Ajout ...
                                        </span>
                                        : "Ajouter"
                                }
                            </button>

                        </Form>
                    </motion.div>
                    {
                        confirmedFriendsList.length !== 0 && (
                            <motion.div className="flex flex-col gap-4 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500 rounded-lg shadow-xl p-3 w-full"
                                variants={containerVariants}
                            >
                                {confirmedFriendsList.map((friend: Friend) => (
                                    <motion.div key={friend.id} className="text-white flex items-center space-x-4 justify-evenly"
                                        variants={itemVariants}
                                    >
                                        <div className="flex gap-4">
                                            <motion.img
                                                src={"/images/avatar/avatar_1.jpg"}
                                                alt="User Avatar"
                                                className="w-12 h-12 rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ rotate: 360, scale: 1 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">{friend.user.pseudo}</span>
                                                {/* <span className="text-sm">{friend.user.friend_code}</span> */}
                                                <span className="text-sm italic">#7854polm</span>
                                            </div>
                                        </div>
                                        <span>Amis depuis {formatDate(friend.user.updated_at)}</span>
                                        <button onClick={() => deleteFriend(friend.id)} title="Supprimer l'ami">
                                            <Trash2 size={24} color="white" />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    }

                    {
                        pendingFriendsList.length !== 0 && (
                            <motion.div className="grid grid-cols-3 gap-4 w-full p-4"
                                variants={containerVariants}
                            >
                                {pendingFriendsList.map((friend) => (
                                    <motion.div key={friend.id} className="text-white rounded-lg shadow-xl bg-gradient-to-r from-pink-500 to-pink-800 p-3 flex items-center space-x-4"
                                        variants={itemVariants}
                                    >
                                        <img
                                            src={`/images/friends/${friend.user.id}.jpg`} // Chemin d'image hypothétique
                                            alt={friend.user.pseudo}
                                            className="w-16 h-16 rounded-full"
                                        />
                                        <div>
                                            <div className="text-lg font-bold">{friend.user.pseudo}</div>
                                            {/* <div className="text-sm">{friend.user.friend_code}</div> */}
                                            <button onClick={() => acceptFriend(friend.id)} title="Accepter l'ami">
                                                <CircleCheckBig size={24} color="white" />
                                            </button>
                                            <button onClick={() => deleteFriend(friend.id)} title="Supprimer l'ami">
                                                <Trash2 size={24} color="white" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    }
                </motion.div>
            </div>
        </LayoutPage>
    );
}