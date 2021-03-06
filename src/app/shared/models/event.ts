import { Address, Organization, SportsTeam, SportsTeamRef } from "./sportsTeam"

export interface Event {
    id?: string,
    name: string,
    alternateName?: string,
    description?: string,
    location?: Address,
    url?: string,
    startDate: Date | string,
    endDate: Date | string,
    eventStatus: EventStatus.EventStatusType,
    organizer: Organization | SportsTeam | SportsTeamRef,
    /* participation?: {
        teams: SportsTeam[],
        athletes: Athlete[],
    }, */
    eventCategory: EventCategory.EventCategoryType,
    // races?: Race[],
}

export namespace EventStatus {
    export type EventStatusType = 'scheduled' | 'postponed' | 'rescheduled' | 'cancelled'
    export const EventStatusType = {
        scheduled: 'scheduled' as EventStatusType,
        postponed: 'postponed' as EventStatusType,
        rescheduled: 'rescheduled' as EventStatusType,
        cancelled: 'cancelled' as EventStatusType
    }
}

//TODO:
export namespace EventCategory {
    export type EventCategoryType = 'national' | 'international' | 'vajdasagi..'
    export const EventCategoryType = {
        national: 'national' as EventCategoryType,
        international: 'international' as EventCategoryType,
        vajdasagi: 'vajdasagi' as EventCategoryType,
    }
    export const EVENTS = [
        'national',
        'international',
        'vajdasagi'
    ]
}
