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
    resultStatus: ResultStatus.ResultStatusType,
    note?: string,
    progressingScheme?: string, //TODO: first 3 to FA ...
    startReferee?: Referee[],
    finishReferee?: Referee[],
    referee?: Referee[],
    connectedRaces?: string[]
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
    export const DISTANCES = [200, 500, 1000, 2000, 5000];
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
    export const AGE_GROUPS = [
        'pionir',
        'kadet',
        'junior',
        'U23',
        'senior'
    ]
}

//TODO: 
export namespace RaceT {
    export type RaceType = 'qualification' | 'semifinal' | 'final' | 'final A' | 'final B' | 'final C';
    export const RaceType = {
        qualification: 'qualification' as RaceType,
        semifinal: 'semifinal' as RaceType,
        final: 'final' as RaceType,
        finalA: 'final A' as RaceType,
        finalB: 'final B' as RaceType,
        finalC: 'final C' as RaceType
    };
    export const RACE_TYPES = [
        'qualification',
        'semifinal',
        'final',
        'final A',
        'final B',
        'final C'
    ]
}


//TODO:
export namespace Boat {
    export type BoatType = 'k1' | 'k2';
    export const BoatType = {
        k1: 'k1' as BoatType,
        k2: 'k2' as BoatType,
    };
    export const BOAT_TYPES = [
        'K1',
        'K2',
        'K4',
        'MK1',
        'MK2',
        'MK4',
        'C1',
        'C2'
    ];
}

export namespace ResultStatus {
    export type ResultStatusType = 'startlist' | 'official' | 'unofficial';
    export const ResultStatusType = {
        startlist: 'startlist' as ResultStatusType,
        official: 'official' as ResultStatusType,
        unofficial: 'unofficial' as ResultStatusType,
    };
}

