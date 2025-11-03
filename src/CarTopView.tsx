import React from "react";
import SeatButton from "./SeatButton.tsx";
import type {SeatsState} from "./model.ts";

interface CarTopViewProps {
    seats: SeatsState;
    onToggle: (id: number) => void;
}

const CarTopView = ({seats, onToggle}: CarTopViewProps) => {
    return (
        <div className="relative">
            <div className="mx-auto bg-slate-900/60 border border-slate-700 rounded-[1.2rem] shadow-inner shadow-black/60 p-4 w-full max-w-[260px]">
                <div className="text-center text-[10px] text-slate-500 mb-2">
                    Ön şüşə
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                    <SeatButton
                        id={1}
                        label="1"
                        status={seats[1]}
                        onClick={() => onToggle(1)}
                        note="Sürücü"
                    />
                    <SeatButton
                        id={2}
                        label="2"
                        status={seats[2]}
                        onClick={() => onToggle(2)}
                        note="Öndə"
                    />
                </div>

                <div className="h-[2px] bg-slate-700/80 rounded mb-2" />

                <div className="grid grid-cols-3 gap-2">
                    <SeatButton
                        id={3}
                        label="3"
                        status={seats[3]}
                        onClick={() => onToggle(3)}
                        note="Arxada L"
                    />
                    <SeatButton
                        id={4}
                        label="4"
                        status={seats[4]}
                        onClick={() => onToggle(4)}
                        note="Arxada mərkəz"
                    />
                    <SeatButton
                        id={5}
                        label="5"
                        status={seats[5]}
                        onClick={() => onToggle(5)}
                        note="Arxada R"
                    />
                </div>

                <div className="text-center text-[10px] text-slate-500 mt-3">
                    Bağaj
                </div>
            </div>
        </div>
    );
}

export default CarTopView;
