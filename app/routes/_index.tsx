import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { BookOpenCheck, CheckSquare, Clock, X } from "lucide-react";
import LayoutPage from "~/components/common/pageLayout";

export default function Index() {

  const card = {
    id: 'how-to-play',
    icon: <BookOpenCheck />,
    title: 'Comment jouer',
    content: "Une fois le mot saisie",
    subContent: [
      { key: 'gray', bgColor: "bg-gray-300", text: "GRIS, si la lettre ne fait pas partie du mot secret.", icon: <X /> },
      { key: 'orange', bgColor: "bg-orange-200", text: "ORANGE, si la lettre fait partie du mot secret mais n'est pas positionnée correctement.", icon: <Clock /> },
      { key: 'green', bgColor: "bg-green-200", text: "VERT, si la lettre fait partie du mot secret et est positionnée correctement.", icon: <CheckSquare /> }
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <LayoutPage >
      <div className="flex h-full w-full gap-4 max-lg:flex-col justify-center items-center">

        <motion.video
          src="video/presentation.mp4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          autoPlay
          loop
          className="lg:w-[40vw] h-auto max-lg:h-[40vh]"
        />
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center gap-2 text-xl mb-2">
            {card.icon}
            <h1 className="text-2xl font-bold">{card.title}</h1>
          </div>
          <p className="text-lg">
            {card.content}
          </p>
          {card.subContent.map((item, index) => (
            <div className="flex items-center p-4 gap-4">
              <motion.div
                key={item.key}
                className={`flex ${item.bgColor} animate-pulsate justify-center items-center rounded shadow-md transition-colors duration-300 p-1`}
                variants={cardVariants}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="font-bold text-white text-2xl">A</span>
              </motion.div>
              <span>{item.text}</span>
            </div>
          ))}
          <div className="flex justify-center">
            <Link to={"/game-day"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">
              Jouer
            </Link>
          </div>
        </motion.div>
      </div>
    </LayoutPage >
  );
}
