import fs from "fs/promises";
import { Dico } from "~/ts/dico";

export const readAndUseJsonDico = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const obj = JSON.parse(data);
    return obj;
  } catch (error) {
    console.error(
      "Erreur lors de la lecture ou de l’interprétation du fichier JSON:",
      error
    );
    throw error;
  }
};

const numberToWords = (length: number) => {
  const units = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = ["ten", "twenty"];

  if (length <= 9) {
    return units[length - 1] as keyof Dico;
  } else if (length <= 19) {
    return teens[length - 11] as keyof Dico;
  } else if (length <= 25) {
    if (length === 20) {
      return "twenty" as keyof Dico;
    } else {
      return (tens[1] + "-" + units[(length % 20) - 1]) as keyof Dico;
    }
  }

  throw new Error("Length out of supported range");
};

export const createMiniDico = (
  dico: any,
  minLength: number,
  maxLength: number
) => {
  let newMiniDico = [];
  for (let i = minLength; i <= maxLength; i++) {
    const key = numberToWords(i);
    if (dico[key]) {
      newMiniDico.push(...dico[key]);
    }
  }
  return newMiniDico;
};
