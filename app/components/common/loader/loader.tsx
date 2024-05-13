import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EnigmaticLoader = () => {
    const word = "ENIGMATIQUE";
    const colors = ['bg-orange-500', 'bg-green-500', 'bg-gray-500'];
    const [cards, setCards] = useState<Array<{ letter: string, color: string }>>([]);

    useEffect(() => {
        const initialCards = word.split('').map((char, index) => ({
            letter: char,
            color: colors[index % colors.length] // Cycle through colors
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
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-65 z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <div className="flex space-x-8 animate-wave">
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
        </motion.div>
    );
};

export default EnigmaticLoader;
