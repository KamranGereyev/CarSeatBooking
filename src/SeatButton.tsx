import type {SeatStatus} from "./model.ts";

interface SeatButtonProps {
    id: number;
    label: string;
    note: string;
    status: SeatStatus;
    onClick: () => void;
}
const SeatButton = ({label, note, status, onClick}: SeatButtonProps) => {
    const base =
        "relative flex flex-col items-center justify-center rounded-lg border text-center select-none cursor-pointer transition active:scale-[0.98] py-4";

    const variants: Record<SeatStatus, string> = {
        free:
            "bg-slate-700/40 border-slate-500 text-slate-200 hover:bg-slate-600/40",
        yours:
            "bg-emerald-400 text-slate-900 border-emerald-300 font-semibold shadow-lg shadow-emerald-900/30 hover:bg-emerald-300",
        driver:
            "bg-slate-800/70 border-slate-600 text-slate-500 cursor-not-allowed opacity-70 ring-1 ring-slate-900/50",
    };

    const isDisabled = status === "driver";

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${base} ${variants[status]}`}
        >
            <div className="text-xl leading-none font-bold">{label}</div>
            <div className="text-[10px] leading-none mt-1 opacity-80">{note}</div>

            {status === "yours" && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-900 text-[9px] font-bold rounded-full px-2 py-[2px] border border-emerald-700 shadow-lg shadow-emerald-900/40">
          MƏNİM
        </span>
            )}

            {status === "driver" && (
                <span className="absolute -top-2 -right-2 bg-slate-700 text-slate-200 text-[8px] font-bold rounded-full px-2 py-[2px] border border-slate-500 shadow-lg shadow-black/40">
          SÜRÜCÜ
        </span>
            )}
        </button>
    );
}

export default SeatButton;
