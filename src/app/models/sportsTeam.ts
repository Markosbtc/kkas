import { Athlete } from "./athlete";
import { Person } from "./person";

export interface Organization {
    identifier: string,
    name: string,
    alternateName?: string,
    address: string,
    email?: string[],
    url?: string,
    telephone?: string[]
}

export interface SportsTeam extends Organization {
    logo: any,
    captain: Person,
    president: Person,
    coaches: Person,
    athletes: Athlete,
}