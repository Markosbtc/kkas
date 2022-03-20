import { Achievement } from "./achievement";
import { CoachRef } from "./coach";
import { Person } from "./person";
import { SportsTeamRef } from "./sportsTeam";

export interface Athlete extends Person {
    height?: number,
    weight?: number,
    coaches?: CoachRef[],
    memberOf: SportsTeamRef,
    achievements?: Achievement[]
}