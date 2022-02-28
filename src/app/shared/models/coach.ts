import { Person } from "./person";
import { SportsTeam } from "./sportsTeam";

export interface Coach extends Person{
    licenceId: string,
    licenceValidFrom: Date,
    licenceValidTo?: Date,
    licenceLevel: string,
    note?: string,
    roleName?: string, // 'Diplomirani profesor u kajak kanu sportu' | 'Operativni trener' | 'Potvrda o strucnom radu' | 'Trener u kajak-kanu sportu - specijalista'
    team: SportsTeam
}