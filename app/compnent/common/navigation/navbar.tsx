import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { Link } from 'react-router-dom';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getUser } from '~/session.server';
import { Form, useLoaderData } from '@remix-run/react';
import { User } from '~/ts/user';


const Navbar = ({ user }: { user: User | null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const connected = user && user?.pseudo !== ""

    return (
        <nav className={`bg-transparent text-white p-4 ${isMobileMenuOpen ? "bg-[url('app/assets/images/bg/fond5.png')] bg-cover bg-center h-[100vh]" : ""}`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="max-md:text-5xl text-3xl font-bold" style={{ fontFamily: "Island Moments" }}>Enigmatique</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden px-2 py-1 text-white">
                    <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        )}
                    </svg>
                </button>
                <div className="hidden lg:flex space-x-4 items-center">
                    <Link to={'/game-day'} className="px-4 py-2 hover:bg-gray-700 rounded">Game-Day</Link>
                    <Link to={'/game-list'} className="px-4 py-2 hover:bg-gray-700 rounded">More games</Link>
                    {/* <Link to={'/time-attack'} className="px-4 py-2 hover:bg-gray-700 rounded">time-attack</Link> */}
                    <Link to={"/information"} className="px-4 py-2 hover:bg-gray-700 rounded">Information</Link>
                    {
                        connected ?
                            (
                                <div className="relative">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="px-4 py-2 hover:bg-gray-700 rounded focus:outline-none focus:shadow-outline">
                                        Profile
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl text-black">
                                            <Link to={"/profile"} className="block px-4 py-2 text-sm hover:bg-gray-100">Mon Profile</Link>
                                            <Link to={"/profile/stats"} className="block px-4 py-2 text-sm hover:bg-gray-100">Mes Stats</Link>
                                            <Form action="/logout" method="post" className="w-full">
                                                <button type="submit" className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-start">Déconnexion</button>
                                            </Form>
                                        </div>
                                    )}
                                </div>
                            ) :
                            (
                                <Link to={"/login"} className="px-4 py-2 hover:bg-gray-700 rounded">Se connecter</Link>

                            )
                    }
                </div>
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-60 left-0 right-0 z-50 flex flex-col items-center text-center font-bold text-3xl">
                        <Link to={'/game-day'} className={`px-4 py-4 ${isProfileOpen ? "text-gray-500" : ""}`}>Game-Day</Link>
                        <Link to={"/information"} className={`px-4 py-4 ${isProfileOpen ? "text-gray-500" : ""}`}>Information</Link>
                        {
                            true ?
                                (
                                    <Link to={"/login"} className={`px-4 py-4 ${isProfileOpen ? "text-gray-500" : ""}`}>Se connecter</Link>

                                ) :
                                (
                                    <>
                                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`px-4 py-4 w-full transition-all duration-100 ease-in-out ${isProfileOpen && "bg-white bg-opacity-60  text-black"}`}>
                                            Profile
                                        </button>
                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                        transition: {
                                                            height: {
                                                                duration: 0.4,
                                                            },
                                                            opacity: {
                                                                duration: 0.25,
                                                                delay: 0.15,
                                                            },
                                                        }
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                        transition: {
                                                            height: {
                                                                duration: 0.4,
                                                            },
                                                            opacity: {
                                                                duration: 0.25,
                                                            },
                                                        },
                                                    }}>
                                                    <div className={`text-2xl w-[100vw] gap-4 bg-opacity-60 bg-white h-full`}>
                                                        <Link to={"/profile"} className="block px-4">Mon Profile</Link>
                                                        <Link to={"/profile/stats"} className="block px-4">Mes Stats</Link>
                                                        <Link to={"/logout"} className="block px-4">Déconnexion</Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )
                        }

                    </div>
                )}
            </div>
        </nav >
    );
};

export default Navbar;
