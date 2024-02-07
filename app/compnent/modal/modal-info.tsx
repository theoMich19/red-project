export const ModalInfo = () => {
    return (
        <div>
            <h1>Comment jouer une partie</h1>

            <p>Au cours du jeu des couleurs apparaitrons sur les lettres</p>
            <p>Si la couleur est <span className="text-gray-400">grise</span> alors la lettre n'appartient pas au mot
                Si la couleur est <span className="text-orange-400">orange</span> alors elle appartient au mot mais n'est pas placé au bonne endroit
                Si la couleur est <span className="text-green-400">verte</span> alors la lettre existe dans le mot caché et cette dernière est bien placée</p>
            <p>Exemple</p>

        </div>
    )
}