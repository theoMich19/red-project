export const handleKeyDown = (
  index: number,
  event: any,
  inputRefs: any,
  inputs: any
) => {
  if (event.key === "Backspace" && index > 0 && !inputs[index]) {
    inputRefs[index - 1].current.focus();
  }
};

export const handleInputChange = (
  index: number,
  value: any,
  inputRefs: any,
  inputs: any,
  setInputs: any,
  setIsInvalidWord: any
) => {
  const newInputs = [...inputs];
  newInputs[index] = value.toUpperCase();
  setInputs(newInputs);
  setIsInvalidWord(false);

  if (value.length === 0 && index > 0 && !newInputs[index - 1]) {
    inputRefs[index - 1].current.focus();
  } else if (
    value.length === 1 &&
    value !== " " &&
    index < inputRefs.length - 1
  ) {
    inputRefs[index + 1].current.focus();
  }
};

export const handleVirtualKeyPress = (
  key: string,
  secretWord: string,
  inputRefs: any,
  inputs: any,
  setInputs: any
) => {
  if (key === "reset") {
    setInputs(Array(secretWord.length).fill(""));
    inputRefs[0].current.focus();
  } else if (key === "del") {
    let newInputs = [...inputs];
    // Cette fois, on cherche l'index à effacer de manière un peu différente
    const indexToClear = newInputs.findIndex(
      (input, index, self) =>
        input !== "" && (self[index + 1] === "" || index === self.length - 1)
    );
    if (indexToClear !== -1) {
      newInputs[indexToClear] = ""; // Efface la valeur de l'input
      setInputs(newInputs);
      // Focus sur l'input vidé
      if (inputRefs[indexToClear] && inputRefs[indexToClear].current) {
        inputRefs[indexToClear].current.focus();
      }
    }
  } else {
    const newInputs = [...inputs];
    const firstEmptyIndex = newInputs.findIndex((input) => input === "");
    if (firstEmptyIndex !== -1) {
      newInputs[firstEmptyIndex] = key;
      setInputs(newInputs);

      // Focus sur le prochain input vide, s'il y en a un
      if (firstEmptyIndex + 1 < inputRefs.length) {
        inputRefs[firstEmptyIndex + 1].current.focus();
      }
    }
  }
};
