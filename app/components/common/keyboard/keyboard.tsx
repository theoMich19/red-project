
export const Keyboard = ({ onKeyPress }: { onKeyPress: any }) => {
    const keys = [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['W', 'X', 'C', 'V', 'B', 'N'],
    ];
    const btnStyle = "h-10 rounded-lg bg-white hover:bg-slate-400"

    return (
        <>
            <div className="flex justify-around gap-4 my-2">
                {'AZERTYUIOP'.split('').map((key) => (
                    <button key={key} className={`${btnStyle} w-10`} onClick={() => onKeyPress(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <div className="flex justify-around gap-4 my-2">
                {'QSDFGHJKLM'.split('').map((key) => (
                    <button key={key} className={`${btnStyle} w-10`} onClick={() => onKeyPress(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <div className="flex justify-around gap-4 my-2">
                <button className={`${btnStyle} w-20`} onClick={() => onKeyPress('reset')}>
                    Reset
                </button>
                {'WXCVBN'.split('').map((key) => (
                    <button key={key} className={`${btnStyle} w-10`} onClick={() => onKeyPress(key)}>
                        {key}
                    </button>
                ))}
                <button className={`${btnStyle} w-20`} onClick={() => onKeyPress('del')}>
                    Del
                </button>
            </div >
        </>
    );
};
