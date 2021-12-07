import { Person } from "./person";
import { SportsTeam } from "./sportsTeam";

export interface Coach extends Person{
    licenceId: string,
    licenceValidFrom: Date,
    licenceValidTo: Date,
    licenceLevel: string,
    note?: string,
    roleName: string,
    team: SportsTeam
}