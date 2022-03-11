import { Athlete } from "./athlete";
import { Coach } from "./coach";
import { Person } from "./person";

export interface Organization {
    id?: string,
    name: string,
    alternateName?: string,
    address: {
        zip: string,
        city: string,
        address: string
    },
    email?: string[],
    url?: string[],
    telephone?: string[]
}

export interface SportsTeam extends Organization {
    logo?: any,
    captain: Person,
    president: Person,
    coaches?: Coach[],
    athletes?: Athlete[],
}
