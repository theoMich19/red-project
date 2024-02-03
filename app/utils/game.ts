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
