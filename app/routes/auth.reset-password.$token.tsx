import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import LayoutPage from "~/components/common/pageLayout";
import { createUserSession, getUser } from "~/session.server";
import { User } from "~/ts/user";
import { motion } from 'framer-motion'; // Import motion
import { useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    formData.append("token", params.token as string)
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        return json({ errors: { message: "Les mots de passe ne correspondent pas." } }, { status: 400 })
    }

    const apiUser = await fetch(`${process.env.REST_URL_API}/reset-password`, {
        method: "post",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });
    const response = await apiUser?.json();

    return redirect('/login')
};

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();
    const actionData = useActionData<typeof action>();
    const loading = navigation.state === "idle" ? false : true;


    return (
        <LayoutPage >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
            >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Mot de passe oublié
                    </h1>
                    <Form method="post" className="space-y-4 md:space-y-6">
                        <div>
                            <label id="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-700" /> : <EyeIcon className="h-5 w-5 text-gray-700" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Confirmation</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirm-password"
                                    id="confirm-password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, et un chiffre."
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-gray-700" /> : <EyeIcon className="h-5 w-5 text-gray-700" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {actionData?.errors?.message && (
                            <div className="text-sm font-light text-red-700">{actionData.errors.message}</div>
                        )}
                        <button type="submit" disabled={loading} className="w-full text-primary font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out">
                            {
                                loading
                                    ? <span className="flex gap-2 items-center justify-center">
                                        <LoaderCircle className="spinLoaderBtn" />Sauvegarde ...
                                    </span>
                                    : "Sauvegarder"
                            }
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Déjà un compte ? <Link to={"/login"} className="font-medium text-primary hover:underline">Se connecter</Link>
                        </p>
                    </Form>
                </div>
            </motion.div>
        </LayoutPage>
    );
}
