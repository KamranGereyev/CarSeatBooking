import { useState } from "react";
import { buildDirectionsUrl, shareOrCopy, ORIGIN, DESTINATION } from "../src/lib/routes";

export default function RouteShareBar() {
    const [note, setNote] = useState<string | null>(null);
    const url = buildDirectionsUrl();

    async function handleShare() {
        const res = await shareOrCopy(url, "Sumqayıt Qərb Saray → Cybernet montin");
        if (res === true) setNote("Paylaşıldı ✅");
        else if (res === "copied") setNote("Link kopyalandı 📋");
        else setNote("Paylaşmaq alınmadı, linki əl ilə açın");
        setTimeout(() => setNote(null), 2500);
    }

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="text-[11px] text-slate-400">
                Marşrut: <span className="font-medium text-slate-200">{ORIGIN}</span> ↔{" "}
                <span className="font-medium text-slate-200">{DESTINATION}</span>
            </div>
            <div className="flex items-center gap-2">
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm px-3 py-2 shadow-lg transition active:scale-[0.98]"
                    title="Xəritədə aç"
                >
                    Xəritədə aç
                </a>
                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-3 py-2 border border-slate-600 shadow-lg transition active:scale-[0.98]"
                    title="Marşrutu paylaş"
                >
                    Paylaş
                </button>
            </div>
            {note && <div className="text-xs text-emerald-300">{note}</div>}
        </div>
    );
}
