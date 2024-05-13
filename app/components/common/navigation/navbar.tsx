import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Form } from '@remix-run/react';
import { User } from '~/ts/user';

const Navbar = ({ user }: { user: User | null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const connected = user && user?.pseudo !== "";
    const defaultStyleBtn = "w-full px-4 py-4 hover:text-orange-400 duration-300 ease-in-out transition-colors";

    const menuVariants = {
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: "-100%",
            transition: {
                type: "spring",
                stiffness: 20
            }
        }
    };

    const iconVariants = {
        opened: {
            rotate: 45,
            scale: 1.5
        },
        closed: {
            rotate: 0,
            scale: 1
        }
    };

    const dropdownVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        closed: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.3 }
        }
    };

    return (
        <nav className="bg-transparent text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="max-md:text-5xl text-3xl font-bold" style={{ fontFamily: "Island Moments" }}>Enigmatique</h1>
                <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden px-2 py-1 text-white"
                    animate={isMobileMenuOpen ? "opened" : "closed"}
                    variants={iconVariants}
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        {isMobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        )}
                    </svg>
                </motion.button>
                <div className="hidden lg:flex space-x-4 items-center">
                    <Link to={'/game-day'} className="px-4 py-2 hover:bg-gray-700 rounded">Game-Day</Link>
                    <Link to={'/game-mod'} className="px-4 py-2 hover:bg-gray-700 rounded">More games</Link>
                    <Link to={"/information"} className="px-4 py-2 hover:bg-gray-700 rounded">Information</Link>
                    {connected ? (
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="px-4 py-2 hover:bg-gray-700 rounded focus:outline-none focus:shadow-outline">
                                Profile
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl text-black"
                                        variants={dropdownVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        <Link to={`/user/${user.id}`} className="block px-4 py-2 text-sm hover:bg-gray-100">Mon Profile</Link>
                                        <Form action="/logout" method="post" className="w-full">
                                            <button type="submit" className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-start">Déconnexion</button>
                                        </Form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to={"/login"} className="px-4 py-2 hover:bg-gray-700 rounded">Se connecter</Link>
                    )}
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="lg:hidden h-[90vh] absolute top-[10vh] left-0 right-0 z-5 flex flex-col items-center text-center font-bold text-3xl bg-gray-700 "
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <Link to={'/game-day'} className={`${defaultStyleBtn} ${isProfileOpen ? "text-gray-500" : ""}`}>Game-Day</Link>
                            <Link to={'/game-mod'} className={`${defaultStyleBtn} ${isProfileOpen ? "text-gray-500" : ""}`}>More games</Link>
                            <Link to={"/information"} className={`${defaultStyleBtn} ${isProfileOpen ? "text-gray-500" : ""}`}>Information</Link>
                            {connected ? (
                                <>
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="px-4 py-2">
                                        Profile
                                    </button>
                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                className="w-full mt-2 py-2 bg-white text-black"
                                                variants={dropdownVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                <Link to={`/user/${user.id}`} className="w-full px-4 py-2 text-base  hover:bg-gray-100">Mon Profile</Link>
                                                <Form action="/logout" method="post" className="w-full">
                                                    <button type="submit" className="w-full px-4 py-2 text-base  hover:bg-gray-100">Déconnexion</button>
                                                </Form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link to={"/login"} className="px-4 py-2 hover:bg-gray-700 rounded">Se connecter</Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav >
    );
};

export default Navbar;
