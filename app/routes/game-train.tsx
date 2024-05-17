import { useState } from "react";
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { numberToWord } from "~/utils/transform";
import { dico } from "../../data/dico"
import ModalGame from "~/components/modal/modal-game";
import LayoutPage from "~/components/common/pageLayout";
import GameBoard from "~/components/game/game-board";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, getUser } from "~/session.server";
import { User } from "~/ts/user";
import { AnimatePresence, motion } from "framer-motion";
import { createMiniDico } from "~/utils/dico";

interface dataSecretWordsType { start: Array<string>, inter: Array<string>, difficile: Array<string>, expert: Array<string> }
interface useLoaderDataType { user: User, dicoUsed: Array<string>, dataSecretWords: dataSecretWordsType }

// const secretWords = [
//     "ANGLE", "FRUIT", "TITRE", "BRUIT", "TAXER", "ULTRA", "LASER", "LIGNE",
//     "LUEUR", "HORDE", "ECRAN", "ABOIE", "TREVE", "OVALE", "IMAGE", "GAZON",
//     "EPAVE", "TRAIT", "MAINS", "LAMPE", "ILEON", "MARNE", "NUAGE", "RANCE",
//     "MIEUX", "NERFS", "KILOS", "FLUTE", "PORTE", "PERLE", "VOIX", "DOUCE",
//     "POMME", "FAUNE", "VAGUE", "PEINE", "CHOIX", "GOÛTE", "HAUTE", "VERT",
//     "DENSE", "SONGE", "QUOTA", "VOILE", "CIRER", "VENIN", "FABLE", "FORME",
//     "TIGRE", "ZESTE", "PIECE", "CHIEN", "MORUE", "OPERA", "PENTE", "REBUT",
//     "VEXER", "LOUPE", "SOUPE", "ORAGE", "EPAIS", "ROUTE", "LUXER", "ZONES",
//     "BALLE", "IDIOT", "SUCRE", "GORGE", "DEBAT", "ANCRE", "GRAIN", "SALUT",
//     "CREUX", "FINIR", "TABLE", "DRAME", "COUDE", "PAUSE", "JASER", "HERBE",
//     "METAL", "ETOLE", "WAGON", "TENTE", "JAUNE", "QUART", "CHAT", "BOITE",
//     "PIANO", "ROBE", "WRAPS", "MONTE", "CREME", "OMBRE", "NOIRE", "LOUER",
//     "QUETE", "USUEL", "LOURD", "FERME", "BRUME", "CRANE", "LIVRE", "ZEBRE",
//     "MODEM", "RAPIDE", "VERRE", "NOYER", "RENNE", "USURE", "VIVRE", "DEBUT",
//     "PORCS", "SINGE", "ROUGE", "SABLE", "EGIDE", "PLAGE", "INUIT",
// ]

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request);

    const dataSecretWords = {
        "start": [
            "CHAT", "MAISON", "ARBRE", "LIVRE", "SOLEIL", "CHIEN", "ROUGE", "VOITURE",
            "EAU", "FLEUR", "POMME", "TABLE", "FENETRE", "SOURIS", "JARDIN", "CIEL",
            "MER", "NUIT", "JOUR", "PAIN", "LUNE", "CHAPEAU", "CHEMISE", "OISEAU",
            "RIVIERE", "PLAGE", "VILLE", "FORET", "NEIGE", "CERCLE", "TIGRE",
            "ROULEAU", "PIERRE", "COULEUR", "ANGLE", "ESPACE", "VOILE", "PONT",
            "LAC", "CRAYON", "ANANAS", "POIRE", "RATON", "OISEAU", "LION", "BRANCHE",
            "CANARD", "CHEVAL", "POULET", "PORC", "LIVRE", "ROUE", "PORT",
            "SOLEIL", "CIEL", "LIVRE", "CHIEN", "POMME", "MER", "FLEUR", "MONT", "BATEAU",
            "PLAGE", "VAGUE", "NUAGE", "SABLE", "LOUP", "ARBRE", "GRAIN", "FEUILLE",
            "RACINE", "FRUIT", "PIED", "MAIN", "BRAS", "CERF", "RAT", "CHAT", "BICHE"

        ],
        "inter": [
            "OXYGENE", "NEURONE", "ISOTOPE", "MAGMA", "BIOPSIE", "HORIZON", "OPTIQUE",
            "CYNISME", "RHIZOME", "ECLIPSE", "CORAIL", "CULTURE", "CORTEX", "IMPULS",
            "CALCIUM", "GLACIER", "PRISME", "SPECTRE", "CABINET", "FORMULE", "FOSSILE",
            "ATOMES", "CRATERE", "ENZYME", "FUNGUS", "LARVE", "VIRUS", "CERVEAU", "BIOME",
            "NEBULE", "CHROME", "AZOTE", "BARYON", "CELLULE", "FERMENT", "MATRIX"

        ],
        "difficile": [
            "SYNTAXE", "ARSENIC", "PLATINE", "URANIUM", "NEODYME", "QUASAR",
            "GALLIUM", "RHENIUM", "INDIUM", "COBALT", "CADMIUM", "PHOTON",
            "QUARK", "IODURE", "BORAX", "ZIRCON", "RADON", "OXYDE", "OZONIDE", "FLUORE",
            "GIBBSITE", "PYRITE", "SULFATE",

        ],
        "expert": [
            "PHILOSOPHIE", "CONSTITUTION", "BIODIVERSITE", "CHLOROPHYLLE", "KINESITHERAPIE",
            "TECTONIQUE", "ANTHROPOLOGIE", "BIOCHIMIE", "CARTOGRAPHIE", "DENDROCHRONOLOGIE",
            "EPIPHANIE", "FLUORESCENCE", "GEOSTATIONNAIRE", "PRETERITION", "CALLIPYGE", "INEXORABLE",
            "PLETHORE", "MELLIFLU", "APOCRYPHE", "SUBJUGUER", "PHILATELIE", "ETHERE", "PROPEDEUTIQUE",
            "OBOMBRATION", "PETRICHOR", "ANTEPENULTIEME", "SPHEROPHERIQUE", "TRAGELAPHUS", "ESCARBILLE",
            "EGREGORE", "MYRMECOPHILE", "ONOMATOPEE", "XENOPHOBIE", "ZIGGOURAT", "QUINTESSENCE",
            "REIFICATION", "SYLLOGISME", "TRANSSUBSTANTIATION", "ULTRACREPIDARIANISME", "VEXILLOLOGIE",
            "WOLFRAMITE", 'MONTAGNE', 'RUISSEAU', 'BOUSSOLE', 'EQUATEUR', 'PARADOXE', 'POLYGONE',
            'PARTICLE', 'MUTATION', 'ATOMIQUE', 'GENETIQUE', 'DIGESTIF', 'ABSINTHE', 'PHOSPHOR',
            'VITAMINE', 'MOMENTUM', 'ORBITALE', 'VENTILATE', 'BACTERIE', 'GLYCEROL', 'LANTHANE',
            'METAPHORE', 'DEMOCRATIE', 'PROTEINE', 'HEMISPHERE', 'SATELLITE', 'VANADIUM', 'THALLIUM',
            'PYRAMIDE', 'ZODIAQUE', 'CATALYSE', 'GLYCOLYS', 'OXIDATION', 'SELENIUM', 'STRONTIUM',
            'CHROMIUM', 'BERYLLIUM',
        ]
    }

    const dicoUsed = dico
    return { user, dicoUsed, dataSecretWords };
};

export default function GameTrain() {
    let { user, dicoUsed, dataSecretWords }: useLoaderDataType = useLoaderData();
    const [gameStatus, setGameStatus] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [wordsFoundCount, setWordsFoundCount] = useState<number>(0);
    const [listWordsSecret, setListWordsSecret] = useState<Array<string>>([])
    const [listDico, setListDico] = useState<Array<string>>([])

    const handleNextWord = () => {
        if (gameStatus !== "") {
            const nextIndex = currentWordIndex + 1;
            setCurrentWordIndex(nextIndex);
            setGameStatus("")
            if (gameStatus == "won") setWordsFoundCount(wordsFoundCount + 1);
        }
    }

    const handleStartGame = (data: Array<string>) => {
        setListWordsSecret(data)
        let minLength = 40
        let maxLength = 0
        data.forEach(mot => {
            if (mot.length > maxLength) maxLength = mot.length
            if (mot.length < minLength) minLength = mot.length
        })

        const dataDico = createMiniDico(dico, minLength, maxLength)
        setListDico(dataDico)
    }

    const available = currentWordIndex > listWordsSecret.length - 1
    const errorSecretWord = listWordsSecret.length === 0 ? "Une erreur est survenue, revenez plus tard !" : ""
    const resultMessage = gameStatus === "won" ? "FÉLICITATIONS, VOUS AVEZ GAGNÉ !" : "Dommage, c'est perdu !";

    const listBtnMode = [
        {
            key: "debutant",
            title: "Débutant",
            data: dataSecretWords.start,
        },
        {
            key: "inter",
            title: "Intermédiaire",
            data: dataSecretWords.inter,
        },
        {
            key: "difficile",
            title: "Difficile",
            data: dataSecretWords.difficile,
        },
    ]


    return (
        <LayoutPage user={user}>
            <div className="flex flex-col items-center overflow-x-hidden h-full justify-between bg-[url('app/assets/images/bg/fond6.png')] bg-cover bg-center">
                {
                    listWordsSecret.length === 0 ?
                        (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center w-full rounded-lg shadow mt-[20vh]"
                            >
                                <div className="max-w-fit mx-auto py-8 px-5 md:px-10 bg-white shadow-md rounded-lg border border-gray-400">
                                    <div className="flex flex-col items-center gap-8">
                                        <span className="text-2xl text-center p-2">
                                            Choisir votre niveau de difficulté
                                        </span>
                                        <div className="flex justify-between w-full max-lg:flex-col max-lg gap-4">
                                            {listBtnMode.map((btn: { key: string, title: string, data: Array<string> }) => (
                                                <button
                                                    key={btn.key}
                                                    className="cursor-pointer px-4 py-2 rounded-lg border text-gray-600 hover:text-white hover:bg-orange-300 transition duration-150 ease-in-out"
                                                    onClick={() =>
                                                        handleStartGame(btn.data)
                                                    }
                                                >
                                                    {btn.title}
                                                </button>
                                            ))}

                                        </div>
                                        {/* <div className="flex flex-col text-destructive">
                                        // futur implementation
                                            <span>Mode expert (uniquement sur pc)</span>
                                            <button
                                                key={"expert"}
                                                className="cursor-pointer px-4 py-2 rounded-lg border text-gray-600 hover:text-white hover:bg-orange-300 transition duration-150 ease-in-out"
                                                onClick={() =>
                                                    handleStartGame(dataSecretWords.expert)
                                                }
                                            >
                                                Expert
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                {
                                    isOpen && (<AnimatePresence>
                                        <motion.div
                                            className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="container mx-auto max-w-fit">
                                                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-lg border border-gray-400">
                                                    <div className="flex flex-col items-center gap-8">
                                                        <div className="flex flex-col">
                                                            <span className="text-2xl text-center p-2">
                                                                {resultMessage}
                                                            </span>
                                                            <span className="text-lg text-center p-2">Le mot caché était : </span>
                                                            <span className="px-4 py-2 border-2 border-gray-600 border-dashed bg-slate-100 w-fit items-center rounded-lg self-center">
                                                                {listWordsSecret[currentWordIndex]}
                                                            </span>
                                                        </div>
                                                        {
                                                            currentWordIndex < listWordsSecret.length - 1 ? (
                                                                <button
                                                                    className="cursor-pointer px-4 py-2 rounded-lg border text-gray-600 hover:text-white hover:bg-orange-300 transition duration-150 ease-in-out"
                                                                    aria-label="close modal"
                                                                    role="button"
                                                                    onClick={() => {
                                                                        setIsOpen(false)
                                                                        handleNextWord()
                                                                    }}
                                                                >
                                                                    Rejouer
                                                                </button>
                                                            ) : (
                                                                <div className="flex flex-col w-full border rounded-md p-4 bg-slate-100 items-center justify-center gap-4 ">
                                                                    <span>Plus aucun mot disponible pour le moment</span>
                                                                    <Link to={'/game-list'}>
                                                                        <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer à un autre mode</span>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>)}
                                {!gameStatus &&
                                    (
                                        <div className="mt-[20vh]">
                                            <span className="text-lg text-center p-2 text-white">Mots trouvés : {wordsFoundCount}</span>
                                            <GameBoard
                                                dicoUsed={listDico}
                                                secretWord={listWordsSecret[currentWordIndex]}
                                                handChageGameStatus={setGameStatus}
                                                setIsOpen={setIsOpen}
                                                isRestAvaliable={true} />
                                        </div>
                                    )
                                }
                                {
                                    errorSecretWord && (
                                        <div className="min-w-[300px] min-h-[300px] md:min-w-[400px] md:min-h-[400px] mt-[20vh]">
                                            <div className="w-full h-full p-8 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col items-center justify-evenly text-white gap-4 md:text-base text-sm">
                                                <div className="flex flex-col">
                                                    <h1 className="text-lg md:text-2xl font-bold">{errorSecretWord}</h1>
                                                </div>
                                                <Link to={'/game-list'}>
                                                    <span className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 text-sm rounded">Jouer à un autre mode</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                }
            </div >
        </LayoutPage >
    );
}
