import { Person } from "./person";

export interface Referee extends Person {
    licenceAcquiredDate: Date | string,
    level?: string,
    licenceValidFrom: Date | string,
    licenceValidTo: Date | string,
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

