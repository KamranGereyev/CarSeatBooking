
interface ConfirmModalProps {
    chosenSeatIds: string[];
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({chosenSeatIds, onConfirm, onCancel}: ConfirmModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel}/>
            <div className="relative bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl shadow-black/80 max-w-sm w-[90%] p-5 text-slate-100 flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="text-xs font-mono text-slate-400">
                        Bron təsdiqi
                    </div>
                    <div className="text-lg font-semibold text-white flex items-center gap-2">
                        Sizin yerləriniz
                        <span className="text-[10px] bg-slate-700/70 text-slate-300 border border-slate-500 rounded-full px-2 py-[2px] leading-none">
                            {chosenSeatIds.length} ədəd
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 min-h-[60px]">
                    {chosenSeatIds.length === 0 ? (
                        <div className="text-slate-500 text-xs">
                            Sən sərnişin yerlərini seçməmisən (2 / 3 / 4 / 5)
                        </div>
                    ) : (
                        <ul className="text-slate-100 text-sm flex flex-wrap gap-2">
                            {chosenSeatIds.map((id) => (
                                <li
                                    key={id}
                                    className="bg-emerald-500 text-slate-900 text-[11px] font-bold rounded-full px-2 py-[2px] border border-emerald-700 shadow-lg shadow-emerald-900/40"
                                >
                                    Yer {id}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-col gap-2 text-[12px]">
                    <button
                        onClick={onConfirm}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm px-4 py-2 shadow-lg shadow-emerald-900/30 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={chosenSeatIds.length === 0}
                    >
                        Bronu təsdiqlə
                    </button>

                    <button
                        onClick={onCancel}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2 border border-slate-600 shadow-lg shadow-black/40 transition active:scale-[0.98]"
                    >
                        Ləğv et
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
