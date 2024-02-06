export const KeyButton = ({ keyLabel, onKeyPress }: { keyLabel: string, onKeyPress: any }) => (
    <button className="h-10 w-10 rounded-lg bg-slate-400 hover:bg-slate-600" onClick={() => onKeyPress(keyLabel)}>
        {keyLabel}
    </button>
);
