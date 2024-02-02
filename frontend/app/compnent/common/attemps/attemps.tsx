import { renderInputColor } from "~/utils/utils";

export const previousAttempts = (allAttemps: Array<Array<string>>, secretWord: string) => {
    return allAttemps.map((attempt, attemptIndex) => (
        <div key={attemptIndex} className="flex mt-2 space-x-2">
            {attempt.map((letter, letterIndex) => (
                <div
                    key={letterIndex}
                    className={`w-20 h-20 flex justify-center items-center rounded-lg shadow-card ${renderInputColor(
                        attempt,
                        letterIndex,
                        secretWord
                    )}`}
                >
                    <span
                        style={{ fontFamily: "Oswald", fontWeight: 400 }}
                        className="text-2xl"
                    >
                        {letter}
                    </span>
                </div>
            ))}
        </div>
    ));
};