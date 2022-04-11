import { Athlete } from "./athlete";

export interface Result { // could be a subcollection of Race
    id?: string,
    raceId: string,
    created: Date | string,
    modified?: Date | string,
    competitor: Athlete,
    lane: number,
    rank: number | string, // helyezés vagy 'dsq' | 'dnf' ...
    performance?: string,
    points?: number,
    disqualificationReason?: string,
}
