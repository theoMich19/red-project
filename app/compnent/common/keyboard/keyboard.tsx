import { KeyButton } from "./keyboard-button";

export const Keyboard = ({ onKeyPress }: { onKeyPress: any }) => {
    const keys = [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['W', 'X', 'C', 'V', 'B', 'N'],
    ];

    return (
        <>
            <div className="flex justify-around gap-4 my-2">
                {'AZERTYUIOP'.split('').map((key) => (
                    <KeyButton key={key} keyLabel={key} onKeyPress={onKeyPress} />
                ))}
            </div>
            <div className="flex justify-around gap-4 my-2">
                {'QSDFGHJKLM'.split('').map((key) => (
                    <KeyButton key={key} keyLabel={key} onKeyPress={onKeyPress} />
                ))}
            </div>
            <div className="flex justify-around gap-4 my-2">
                <button className="h-10 w-20 rounded-lg bg-slate-400 hover:bg-slate-600" onClick={() => onKeyPress('reset')}>
                    Reset
                </button>
                {'WXCVBN'.split('').map((key) => (
                    <KeyButton key={key} keyLabel={key} onKeyPress={onKeyPress} />
                ))}
                <button className="h-10 w-20 rounded-lg bg-slate-400 hover:bg-slate-600" onClick={() => onKeyPress('del')}>
                    Del
                </button>
            </div>
        </>
    );
};
