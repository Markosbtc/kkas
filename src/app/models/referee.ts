import { Person } from "./person";

export interface Referee extends Person{
licenceAcquiredDate: Date,
level?: string,
licenceValidFrom: Date,
licenceValidTo: Date,
discipline: Discipline.DisciplineType,
note?: string,
}

export namespace Discipline {
    export type DisciplineType = 'sprint' | 'slalom';
    export const DisciplineType = {
        sprint: 'sprint' as DisciplineType,
        slalom: 'slalom' as DisciplineType,
    };
}

