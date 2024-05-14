import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

const ErrorComponent = ({ error }: any) => {
    const word = "ENIGMATIQUE";
    const errorMessage = error.message; // Correction : ajout d'un point-virgule
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-red-700'];
    const [cards, setCards] = useState<Array<{ letter: string, color: string }>>([]);

    useEffect(() => {
        const initialCards = word.split('').map((char, index) => ({
            letter: char,
            color: colors[index % colors.length]
        }));
        setCards(initialCards);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-65 z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <div className="flex space-x-8 animate-wave mb-16">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className={`w-12 h-12 ${card.color} flex justify-center items-center rounded shadow-md transition-colors duration-300`}
                        variants={cardVariants}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <span className="font-bold text-white text-2xl">{card.letter}</span>
                    </motion.div>
                ))}
            </div>
            <span className="text-white mt-4 text-lg">Une erreur est survenue :</span>
            <span className="text-white mt-4 text-md">{errorMessage}</span>
            <Link to="/" className="mt-4 px-6 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                Revenir à l'accueil
            </Link>
            <span className="mt-4 text-sm text-gray-300 block text-center">
                Si le problème persiste rendez-vous sur ce <a href="https://www.facebook.com/people/Enigmatique/61559695619211/" className="font-bold underline text-teal-400 hover:text-teal-300 transition-colors">lien</a>.
            </span>

        </motion.div>
    );
};

export default ErrorComponent;
