export const renderInputColor = (
  wordsAttempt: Array<string>,
  index: number,
  secretWord: any
) => {
  const letter = wordsAttempt[index];
  let secretOccurrences = secretWord.split("").reduce((acc: any, l: any) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});

  let colors = wordsAttempt.map(() => "bg-gray-300");

  // Première passe : identifier les lettres correctement positionnées
  wordsAttempt.forEach((attemptLetter, attemptIndex) => {
    if (attemptLetter === secretWord[attemptIndex]) {
      colors[attemptIndex] = "bg-green-200";
      secretOccurrences[attemptLetter]--;
    }
  });

  // Deuxième passe : identifier les lettres mal positionnées
  wordsAttempt.forEach((attemptLetter, attemptIndex) => {
    if (
      secretWord.includes(attemptLetter) &&
      secretOccurrences[attemptLetter] > 0 &&
      colors[attemptIndex] !== "bg-green-200"
    ) {
      colors[attemptIndex] = "bg-orange-200";
      secretOccurrences[attemptLetter]--;
    }
  });

  return colors[index];
};

export const getWords = () => {
  const mots = [
    "desert",
    "voyage",
    "reve",
    "jardin",
    "sol",
    "foret",
    "soleil",
    "lampe",
    "ocean",
    "bateau",
    "amour",
    "mur",
    "montre",
    "plage",
    "train",
    "ville",
    "etoile",
    "ciel",
    "fleur",
    "avion",
    "route",
    "vallee",
    "livre",
    "billet",
    "table",
    "chaise",
    "bureau",
    "maison",
    "plaine",
    "animal",
    "hotel",
    "toit",
    "poesie",
    "pont",
    "porte",
  ];
  const words = mots[Math.floor(Math.random() * mots.length)];

  return words.toUpperCase();
};
