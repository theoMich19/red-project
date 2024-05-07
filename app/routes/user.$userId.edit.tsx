import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Pencil } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";
import { getUser } from "~/session.server";
import { User } from "~/ts/user";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request)


    if (!user) {
        redirect('/')
    }
    return { user }
}

export default function profile() {
    const { user }: { user: User } = useLoaderData()
    console.log("🚀 ~ profile ~ user:", user)
    return (
        <LayoutPage user={user}>
            <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center">
                <div className="flex flex-col items-center gap-5 bg-gray-700 min-w-96 text-white rounded-lg p-4 mt-24 ">
                    <div className="flex gap-8">
                        <img
                            src={"/images/avatar/avatar_1.jpg"}
                            alt="User Avatar"
                            style={{ width: "100px", height: "100px", borderRadius: "25%" }}
                        />
                        <div>
                            <div className="flex justify-between w-full">
                                <h2 className="text-xl font-bold">{user.pseudo}</h2>
                                <Link to="/edit-profile" className="flex bg-gray-700 font-bold text-sm p-1 gap-2 rounded text-gray-500 text-end items-center">
                                    <Pencil size={14} />
                                    Modifier
                                </Link>
                            </div>
                            <span className="text-sm">Membre depuis le {user.birthday.split(" ")[0]}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link to={`/user/${user.id}/stats`} className="bg-green-500 font-bold py-2 px-8 text-md rounded">Voir mes stats</Link>
                    </div>
                </div>
            </div>
        </LayoutPage>
    )
}