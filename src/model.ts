export type SeatStatus = "driver" | "free" | "yours";
export type SeatsState = Record<number, SeatStatus>;
