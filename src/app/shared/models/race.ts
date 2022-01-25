import { Gender } from "./person";
import { Referee } from "./referee";
import { Result } from "./result";

export interface Race {
    id?: string,
    eventId: string,
    number: number,
    distance: Distance.DistanceType,
    boat: Boat.BoatType,
    gender: Gender.GenderType,
    age: AgeGroup.AgeGroupType,
    type?: RaceT.RaceType,
    time: string,
    day?: Date,
    results?: Result[],
    note?: string,
    progressingScheme?: any, //TODO:
    startReferee?: Referee[],
    finishReferee?: Referee[],
    referee?: Referee[],
}

export namespace Distance {
    export type DistanceType = 200 | 500 | 1000 | 2000 | 5000;
    export const DistanceType = {
        200: 200 as DistanceType,
        500: 500 as DistanceType,
        1000: 1000 as DistanceType,
        2000: 2000 as DistanceType,
        5000: 5000 as DistanceType,
    };
}

export namespace AgeGroup {
    export type AgeGroupType = 'pionir' | 'kadet' | 'junior' | 'U23' | 'senior';
    export const AgeGroupType = {
        pionir: 'pionir' as AgeGroupType,
        kadet: 'kadet' as AgeGroupType,
        junior: 'junior' as AgeGroupType,
        U23: 'U23' as AgeGroupType,
        senior: 'senior' as AgeGroupType,
    };
}

//TODO: 
export namespace RaceT {
    export type RaceType = 'qualification' | 'semifinal' | 'final';
    export const RaceType = {
        qualification: 'qualification' as RaceType,
        semifinal: 'semifinal' as RaceType,
        final: 'final' as RaceType
    };
}


//TODO:
export namespace Boat {
    export type BoatType = 'k1' | 'k2';
    export const BoatType = {
        k1: 'k1' as BoatType,
        k2: 'k2' as BoatType,
    };
}

