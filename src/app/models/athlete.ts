import { Achievement } from "./achievement";
import { Coach } from "./coach";
import { Person } from "./person";
import { SportsTeam } from "./sportsTeam";

export interface Athlete extends Person {
    height?: number,
    weight?: number,
    coach?: Coach[],
    memberOf: SportsTeam,
    achievements?: Achievement[]
}