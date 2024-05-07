import fs from "fs/promises";

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
