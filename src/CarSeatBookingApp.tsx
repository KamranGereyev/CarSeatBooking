import React, { useState, useMemo, useEffect } from "react";
import ConfirmModal from "./ConfirmModal.tsx";
import type {SeatsState} from "./model.ts";
import CarTopView from "./CarTopView.tsx";
import PhotoSlider from "./PhotoSlider.tsx";
import { loadSeats, saveSeats, clearSeats, storageKey } from "./lib/storage";
import { listenSeats, reserveMany, releaseMany } from "./lib/seats";
import RouteShareBar from "./RouteShareBar.tsx";

const RIDE_ID = "2025-11-03-opel-astrah";
const USER_NAME = "AnonUser-" + Math.floor(Math.random()*10000); // istəsən formdan götür
export default function CarSeatBookingApp() {
    const [seats, setSeats] = useState<SeatsState>({
        1: "driver",
        2: "free",
        3: "free",
        4: "free",
        5: "free",
    });

    console.log("seats", seats)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState<string | null>(null);

    // Realtime dinləyici: DB-də kim bron edibsə hamıya göstər
    useEffect(() => {
        const unsub = listenSeats(RIDE_ID, (snapshot) => {
            setSeats((prev) => {
                const next: SeatsState = { ...prev };
                [2,3,4,5].forEach((i) => {
                    const s = (snapshot as any)[i];
                    if (s?.takenBy) {
                        // serverdən gələn bron — istifadəçidən asılı olmayaraq dolu göstərək
                        next[i] = "yours"; // istəsən ayrıca "taken" statusu əlavə edib rəngi fərqləndir
                    } else {
                        // boşdursa local seçimi saxlamayaq; server həqiqətdir
                        next[i] = "free";
                    }
                });
                return next;
            });
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        const stored = loadSeats(RIDE_ID);
        if (stored.length) {
            setSeats((prev) => {
                const next: SeatsState = { ...prev };
                [2, 3, 4, 5].forEach((i) => (next[i] = stored.includes(i) ? "yours" : "free"));
                return next;
            });
        }
    }, []);

    useEffect(() => {
        function onStorage(e: StorageEvent) {
            if (e.key !== storageKey(RIDE_ID)) return;
            const stored = loadSeats(RIDE_ID);
            setSeats((prev) => {
                const next: SeatsState = { ...prev };
                [2, 3, 4, 5].forEach((i) => (next[i] = stored.includes(i) ? "yours" : "free"));
                return next;
            });
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    function toggleSeat(id: number) {
        setSeats((prev: SeatsState): SeatsState => {
            const curr = prev[id];
            if (id === 1 || curr === "driver") return prev;
            // local seçim yalnız modal üçün istifadə olunur; real status serverdən gələcək
            if (curr !== "yours") {
                return { 1: prev[1], 2: id===2?"yours":"free", 3: id===3?"yours":"free", 4: id===4?"yours":"free", 5: id===5?"yours":"free" };
            }
            return { 1: prev[1], 2: "free", 3: "free", 4: "free", 5: "free" };
        });
    }

    const chosenSeatIds = useMemo(
        () => Object.entries(seats).filter(([id, st]) => st === "yours" && id !== "1").map(([id]) => Number(id)),
        [seats]
    ) as (2|3|4|5)[];

    async function confirmBooking() {
        if (chosenSeatIds.length === 0) { setIsModalOpen(false); return; }
        const res = await reserveMany(RIDE_ID, chosenSeatIds, USER_NAME);
        const failed = Object.entries(res).filter(([, ok]) => !ok).map(([s]) => s);
        if (failed.length) {
            setNote(`Artıq bron olunan yerlər: ${failed.join(", ")}`);
        } else {
            setNote("Bron təsdiqləndi ✅");
        }
        setIsModalOpen(false);
    }

    async function clearBooking() {
        await releaseMany(RIDE_ID, [2,3,4,5], USER_NAME);

        clearSeats(RIDE_ID);

        setSeats({
            1: "driver",
            2: "free",
            3: "free",
            4: "free",
            5: "free",
        });

        setNote("Bütün bronlar sıfırlandı 🗑️");
    }


    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100">
            <header
                className="w-full max-w-3xl lg:max-w-5xl flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                        Maşında yerlərin bron edilməsi
                    </h1>
                    <div className="text-[11px] text-slate-400 mt-1">Real-time paylaşılır</div>
                    {note && <div className="text-xs mt-2 text-emerald-300">{note}</div>}
                    <div className="mt-3">
                        <RouteShareBar/>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                        className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm px-4 py-2 shadow-lg transition active:scale-[0.98]">
                    Seçilənləri bron et
                </button>
                <button onClick={clearBooking}
                        className="rounded-2xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-3 py-2 border border-slate-600 shadow-lg transition active:scale-[0.98]">
                    Bronu təmizlə
                </button>
            </header>

            <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
                <div
                    className="relative bg-slate-800/60 border border-slate-700 rounded-2xl shadow-xl p-4 flex flex-col w-full h-[400px] lg:h-[480px]">
                    <div className="flex-1 rounded-xl bg-slate-900/60 border border-slate-700 overflow-hidden">
                        <PhotoSlider/>
                    </div>
                </div>

                <div className="relative bg-slate-800/60 border border-slate-700 rounded-2xl shadow-xl p-4 flex flex-col w-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Salon planı (yuxarıdan görünüş)</span>
                            <span className="text-[11px] text-slate-400">Yeri seçmək üçün oturacağa bas</span>
                        </div>
                    </div>

                    <div className="flex-1 grid place-items-center">
                        <CarTopView seats={seats} onToggle={toggleSeat} />
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <ConfirmModal
                    chosenSeatIds={chosenSeatIds}
                    // onConfirm={() => setIsModalOpen(false)}
                    onConfirm={confirmBooking}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </main>
    );
}







