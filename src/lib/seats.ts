import { db } from "./firebase";
import {
    ref, onValue, runTransaction, set, remove
} from "firebase/database";

export type SeatNum = 2 | 3 | 4 | 5;
export type SeatData = { takenBy: string; ts: number } | null;

export function listenSeats(rideId: string, cb: (snapshot: Record<string, SeatData>) => void) {
    const r = ref(db, `rides/${rideId}/seats`);
    return onValue(r, (snap) => cb((snap.val() as any) ?? {}));
}

export async function reserveSeat(rideId: string, seat: SeatNum, user: string) {
    const seatRef = ref(db, `rides/${rideId}/seats/${seat}`);
    const now = Date.now();
    return runTransaction(seatRef, (curr: SeatData) => {
        if (!curr) return { takenBy: user, ts: now };      // boşdursa götür
        if (curr.takenBy === user) return curr;            // artıq səndirsə, dəyişmə
        return curr;                                       // doludursa, saxla (uğursuzluq)
    }, { applyLocally: false }).then(res => res.committed);
}

export async function releaseSeat(rideId: string, seat: SeatNum, user: string) {
    const seatRef = ref(db, `rides/${rideId}/seats/${seat}`);
    return runTransaction(seatRef, (curr: SeatData) => {
        if (!curr) return curr;
        if (curr.takenBy === user) return null; // yalnız özün buraxa bilərsən
        return curr;
    }, { applyLocally: false }).then(r => r.committed);
}

export async function reserveMany(rideId: string, seats: SeatNum[], user: string) {
    const results: Record<number, boolean> = {};
    for (const s of seats) {
        results[s] = await reserveSeat(rideId, s, user);
    }
    return results;
}

export async function releaseMany(rideId: string, seats: SeatNum[], user: string) {
    const results: Record<number, boolean> = {};
    for (const s of seats) {
        results[s] = await releaseSeat(rideId, s, user);
    }
    return results;
}
