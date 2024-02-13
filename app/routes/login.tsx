import { Link } from "@remix-run/react"
import { useState } from "react"
import LayoutPage from "~/compnent/common/pageLayout"




export default function Login() {

    return (
        <LayoutPage>
            <div className="absolute top-16 left-0 right-0 bg-red-500 text-white text-center py-2 z-0">
                Cette page est en construction
            </div>
            <div className="flex flex-col items-center bg-[url('app/assets/images/bg/fondLogin.png')] bg-cover h-full justify-center">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Se connecter
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label id="email" className="block mb-2 text-sm font-medium text-gray-900 ">Votre email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " />
                            </div>
                            <div>
                                <label id="password" className="block mb-2 text-sm font-medium text-gray-900 ">Mot de passe</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " />
                            </div>
                            <button type="submit" className="w-full text-primary font-bold border-secondary border-2 hover:bg-secondary hover:bg-opacity-80 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-lg px-5 py-2.5 text-center transition-colors duration-300 ease-in-out">Se connecter</button>
                            <p className="text-sm font-light text-gray-500">
                                Pas encore de compte? {" "}
                                <Link to={"/register"}>
                                    <span className="font-medium text-primary hover:underline text-blue-00">S'inscrire ici</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutPage>
    )
}