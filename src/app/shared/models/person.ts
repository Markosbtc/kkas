export interface Person {
    id?: string,
    name: {
        familyName: string,
        givenName: string,
        fullName?: string
    },
    image?: any,
    email?: string,
    url?: string,
    gender: Gender.GenderType,
    birthDate: Date | string,
    deathDate?: Date | string,
}

export namespace Gender {
    export type GenderType = 'male' | 'female';
    export const GenderType = {
        MALE: 'male' as GenderType,
        FEMALE: 'female' as GenderType,
    };
}
