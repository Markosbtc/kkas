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
}

export interface SportsTeamRef {
    name: string,
    alternateName?: string,
    city?: string,
    ref?: any,
    id?: string
}
