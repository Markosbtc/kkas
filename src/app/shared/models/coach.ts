import { Person } from "./person";
import { SportsTeamRef } from "./sportsTeam";

export interface Coach extends Person {
    licenceId: string,
    licenceValidFrom: Date | string,
    licenceValidTo?: Date | string,
    licenceLevel: string,
    note?: string,
    roleName?: string, // 'Diplomirani profesor u kajak kanu sportu' | 'Operativni trener' | 'Potvrda o strucnom radu' | 'Trener u kajak-kanu sportu - specijalista'
    team: SportsTeamRef
}

export interface CoachRef {
    name: {
        familyName: string,
        givenName: string,
        fullName?: string
    },
    team?: SportsTeamRef
    ref?: any,
    id?: string
}
