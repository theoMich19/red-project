import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useActionData, useNavigation } from "@remix-run/react"
import { useEffect, useState } from "react"
import LayoutPage from "~/compnent/common/pageLayout"
import { createUserSession } from "~/session.server"

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const remember = formData.get("remember")

    console.log(`${process.env.REST_URL_API}/login`)
    const apiUser = await fetch(`${process.env.REST_URL_API}/login`, {
        method: "post",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });
    const response = await apiUser?.json()


    if (!response) {
        return json({ errors: { message: "Email ou mot de passe invalide" } }, { status: 400 })
    }

    return createUserSession({
        request,
        user: response.user,
        userId: response.user.id.toString(),
        remember: remember === "on" ? true : false,
        token: response.user.token,
        redirectTo: '/game-day'
    })
}


export default function Login() {
    const navigation = useNavigation()
    const actionData = useActionData<typeof action>()
    const loading = navigation.state === "idle" ? false : true;


    return (
        <LayoutPage>
            <div className="absolute top-16 left-0 right-0 bg-red-500 text-white text-center py-2 z-0">
                Cette page est en construction
            </div>
            <div className="flex flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Se connecter
                        </h1>
                        <Form method="post" className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label id="email" className="block mb-2 text-sm font-medium text-gray-900 ">Votre email</label>
                                <input type="email" name="email" id="email" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " />
                            </div>
                            <div>
                                <label id="password" className="block mb-2 text-sm font-medium text-gray-900 ">Mot de passe</label>
                                <input type="password" name="password" id="password" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " />
                            </div>
                            {
                                actionData?.errors?.message ? (
                                    <div className="pt-1 text-red-700">{actionData.errors.message}</div>
                                ) : null
                            }
                            <button type="submit" disabled={loading} className="w-full text-primary font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg px-5 py-2.5 text-center transition-colors duration-300 ease-in-out">Se connecter</button>
                            <p className="text-sm font-light text-gray-500">
                                Pas encore de compte? {" "}
                                <Link to={"/register"}>
                                    <span className="font-medium text-primary hover:underline text-blue-00">S'inscrire ici</span>
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </LayoutPage>
    )
}