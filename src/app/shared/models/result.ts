import { Athlete } from "./athlete";

export interface Result {
    id?: string,
    raceId: string,
    created: Date,
    modified?: Date,
    competitor: Athlete,
    lane: number,
    rank: number,
    performance?: string,
    points?: number,
    disqualificationReason?: string,
}


