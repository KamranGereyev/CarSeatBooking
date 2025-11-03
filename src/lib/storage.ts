const NS = 'carseat';
export function storageKey(rideId: string) {
    return `${NS}:${rideId}`;
}

export function saveSeats(rideId: string, seats: number[]) {
    localStorage.setItem(storageKey(rideId), JSON.stringify({
        seats,
        savedAt: Date.now()
    }));
}

export function loadSeats(rideId: string): number[] {
    try {
        const raw = localStorage.getItem(storageKey(rideId));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed?.seats) ? parsed.seats : [];
    } catch { return []; }
}

export function clearSeats(rideId: string) {
    localStorage.removeItem(storageKey(rideId));
}
