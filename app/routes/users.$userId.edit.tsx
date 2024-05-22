import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { Award, Cake, CalendarDays, LoaderCircle, Mail, Pencil } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";
import { getSession, getUserId } from "~/session.server";
import { User } from "~/ts/user";
import { formatDate } from "~/utils/date";

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
    return json({ user });
};



export async function action({ request, params }: ActionFunctionArgs) {
    const session = await getSession(request)
    const token = await session.get("token")

    const formData = await request.formData()
    console.log(params.userId)

    const apiUser = await fetch(`${process.env.REST_URL_API}/users/${params.userId}/edit`, {
        method: "post",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    if (!apiUser.ok) {
        const errorData = await apiUser.json();
        console.error('Error updating user:', errorData);
        return json({ errors: errorData }, { status: apiUser.status });
    }

    const response = await apiUser.json()



    return redirect(`/users/${params.userId}`);
}


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

export default function Profile() {
    const { user }: any = useLoaderData();
    const navigation = useNavigation();
    const loading = navigation.state === "idle" ? false : true;

    return (
        <LayoutPage user={user}>
            <div className="flex flex-col h-full items-center justify-center ">
                <motion.div className="flex flex-col items-center overflow-x-hidden h-full pt-[10vh]"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* <motion.div>
                        <span>Modifier le profil</span>
                    </motion.div> */}
                    <Form method="put" className="flex max-md:flex-col max-md:items-center min-w-[50vw] text-white rounded-lg p-8 shadow-xl gap-8 bg-gradient-to-r from-teal-300 via-teal-500 to-green-500"
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
                        <div className="flex flex-col w-full gap-4 text-start text-lg">
                            <label className="flex flex-col w-full">
                                Pseudo :
                                <input id="pseudo" type="text" name="pseudo" defaultValue={user.pseudo} className="bg-transparent border-none text-white" required />
                            </label>
                            <label className="flex flex-col w-full relative">
                                <span className="flex gap-2 items-center">
                                    <Cake size={20} color="white" /> Date de naissance
                                </span>
                                <input type="date" name="birthday" required
                                    defaultValue={formatDate(user.birthday, "YYYY-MM-DD")}
                                    className="relative bg-transparent border-none text-white dateInput" />
                                {/* <CalendarDays size={20} className="absolute left-[22%] top-[57%] pointer-events-none color-white" /> */}
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="flex gap-2 items-center"><Mail size={20} /> Email</span>
                                <input type="email" name="email" defaultValue={user.email} className="bg-transparent border-none text-white" required />
                            </label>
                            <button type="submit" disabled={loading} className="w-full text-white font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out">
                                {
                                    loading
                                        ? <span className="flex gap-2 items-center justify-center">
                                            <LoaderCircle className="spinLoaderBtn" />Sauvegarde ...
                                        </span>
                                        : "Sauvegarder"
                                }
                            </button>
                        </div>
                    </Form>
                </motion.div>
            </div>
        </LayoutPage>
    );
}


