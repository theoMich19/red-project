import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import LayoutPage from "~/components/common/pageLayout";
import { createUserSession } from "~/session.server";
import { motion } from 'framer-motion'; // Import motion

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const password = formData.get("password") as string;

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!passwordRegex.test(password)) {
        return json({ errors: { message: "Le mot de passe ne respecte pas les critères requis." } }, { status: 400 });
    }

    const apiRegister = await fetch(`${process.env.REST_URL_API}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: formData,
    });

    const response = await apiRegister?.json();

    if (!response || response.message) {
        return json({ errors: { message: response.message } }, { status: 400 });
    }

    return createUserSession({
        request,
        user: response.user,
        userId: response.user.id.toString(),
        remember: false,
        token: response.access_token,
        redirectTo: '/game-day'
    });
}

export default function Register() {
    const navigation = useNavigation();
    const actionData = useActionData<typeof action>();
    const loading = navigation.state === "idle" ? false : true;

    return (
        <LayoutPage user={null}>
            <div className="flex flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover bg-center h-full justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
                >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            S'inscrire
                        </h1>
                        <Form method="post" className="space-y-4 md:space-y-6">
                            <div>
                                <label id="pseudo" className="block mb-2 text-sm font-medium text-gray-900">Votre pseudo</label>
                                <input type="text" name="pseudo" id="pseudo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
                            </div>
                            <div>
                                <label id="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
                            </div>
                            <div>
                                <label id="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
                            </div>
                            <div>
                                <label id="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirmation</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, et un chiffre."
                                    required
                                />
                            </div>
                            {actionData?.errors?.message && (
                                <div className="pt-1 text-red-700">{actionData.errors.message}</div>
                            )}
                            <button type="submit" disabled={loading} className="w-full text-primary font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg px-5 py-2.5 text-center transition-colors duration-300 ease-in-out">
                                S'inscrire
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Déjà un compte? <Link to={"/login"}><span className="font-medium text-primary hover:underline">Se connecter</span></Link>
                            </p>
                        </Form>
                    </div>
                </motion.div>
            </div>
        </LayoutPage>
    );
}
