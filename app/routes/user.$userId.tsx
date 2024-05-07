import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

export default function profile() {
    const { user, wordsFoundList }: useLoaderDataType = useLoaderData()


    return (
        <LayoutPage user={user}>
            <div className="flex flex-col items-center overflow-x-hidden h-full bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center pt-24">
                <div className="flex gap-5 min-w-[50vw] text-white rounded-lg p-8"
                    style={{
                        backgroundImage: 'radial-gradient(circle at center, #4F5E3C 0%, #2B3F38 50%, #080D11 100%)'
                    }}>
                    <img
                        src={"/images/avatar/avatar_1.jpg"}
                        alt="User Avatar"
                        style={{ width: "150px", height: "150px", borderRadius: "15%" }}
                    />
                    <div className="flex flex-col w-full justify-between">
                        <div>
                            <div className="flex justify-between w-full">
                                <h2 className="text-xl font-bold">{user.pseudo}</h2>
                                {/* <Link to="/edit-profile" className="flex font-bold text-sm p-1 gap-2 rounded text-white opacity-45 text-end items-center">
                                    <Pencil size={14} />
                                    Modifier
                                </Link> */}
                            </div>
                            <span className="text-sm">Membre depuis le {user.birthday.split(" ")[0]}</span>
                        </div>
                        <div className="flex justify-evenly items-end">
                            <div className="flex flex-col items-center text-center opacity-50 tooltip">
                                <span><SearchCheck size={20} /></span>
                                <span className="opacity-100">{wordsFoundList.length}</span>
                                <span className="tooltiptext">Mots trouvé</span>
                            </div>
                            <div className="flex flex-col items-center text-center opacity-50 tooltip">
                                <span><UsersRound size={20} /></span>
                                <span className="opacity-100">0</span>
                                <span className="tooltiptext">Amis</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 min-w-[50vw] text-white rounded-lg p-4 mt-4"
                    style={{
                        backgroundImage: 'radial-gradient(circle at center, #4F5E3C 0%, #2B3F38 50%, #080D11 100%)'
                    }}>
                    <div className="flex justify-around">
                        <span className="text-md"></span>
                        <span className="text-md">Mots</span>
                        <span className="text-md">Date</span>
                    </div>
                    {/* change to calendar */}
                    {
                        wordsFoundList.map((wordsFind: Word) => {
                            return (
                                <div className="flex justify-around">
                                    <CircleCheckBig />
                                    <span className="text-md">{wordsFind.value}</span>
                                    <span className="text-md">{wordsFind.date_create.split(" ")[0]}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </LayoutPage>
    )
}