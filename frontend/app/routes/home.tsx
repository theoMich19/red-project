import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {

    return (
        // <div className="flex flex-col items-center bg-[url('app/assets/images/bg/large_1.png')] bg-cover h-full"></div>
        <div className="flex flex-col items-center bg-gray-500 bg-cover h-full">
            <div className="flex flex-col items-center w-full mb-[5vh]">
                <h1 className="text-9xl font-bold mb-4" style={{ fontFamily: "Island Moments" }}>Enigmatique</h1>
                <p className="max-w-[80vw] text-justify" >"Enigmatique" est un jeu captivant où l'objectif est de dévoiler un mot mystérieusement dissimulé. Pour ce faire, le joueur doit soumettre un mot de même longueur. Si une lettre fait partie du mot secret mais n'est pas positionnée correctement, elle s'affichera en orange. En revanche, si la lettre appartient au mot et est à la bonne place, elle s'illuminera en vert. Dans le cas contraire, elle demeurera discrètement grise. Plongez dans cette aventure ludique où la déduction et la perspicacité vous mèneront à la découverte du mot énigmatique.</p>
            </div>
            <Link to={"/game-day"}
                className="bg-red-400 rounded-xl p-4 hover:bg-red-800 text-white font-bold text-xl">
                Accès au jeu
            </Link >
        </div>
    );
}
