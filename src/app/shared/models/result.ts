import { Athlete } from "./athlete";

export interface Result {
    id?: string,
    raceId: string,
    created: Date,
    modified?: Date,
    competitor: Athlete,
    resultStatus: ResultStatus.ResultStatusType,
    lane: number,
    rank: number,
    performance?: string,
    points?: number,
    disqualificationReason?: string,
}

export namespace ResultStatus {
    export type ResultStatusType = 'startlist' | 'official' | 'unofficial';
    export const ResultStatusType = {
        startlist: 'startlist' as ResultStatusType,
        official: 'official' as ResultStatusType,
        unofficial: 'unofficial' as ResultStatusType,
    };
}

