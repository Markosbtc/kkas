import { SportsTeam } from "./sportsTeam";

export interface User {
    name: {
        familyName: string,
        givenName: string,
        fullName?: string
    },
    role: string,
    team: any //SportsTeam
}