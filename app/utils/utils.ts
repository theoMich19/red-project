// Nouvelle fonction pour calculer les couleurs de fond en prenant en compte les règles supplémentaires
export const renderInputColor = (
  wordsAttempt: Array<string>,
  index: number,
  secretWord: any
) => {
  const letter = wordsAttempt[index];
  const secretOccurrences = secretWord.split("").reduce((acc: any, l: any) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});

  // Marquer les lettres correctement positionnées en premier
  wordsAttempt.forEach((attemptLetter, attemptIndex) => {
    if (attemptLetter === secretWord[attemptIndex]) {
      secretOccurrences[attemptLetter]--;
    }
  });

  if (letter === secretWord[index]) {
    return "bg-green-200"; // Lettre correcte et bien positionnée
  } else if (
    letter &&
    secretWord.includes(letter) &&
    secretOccurrences[letter] > 0
  ) {
    // Décrémenter l'occurrence puisque la lettre est présente mais mal positionnée
    secretOccurrences[letter]--;
    return "bg-orange-200"; // Lettre correcte mais mal positionnée
  } else {
    return "bg-gray-300"; // Lettre incorrecte
  }
};
