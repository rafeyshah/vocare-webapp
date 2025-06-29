export interface Patient {
    id: string
    firstname: string
    lastname: string
    email?: string
    birth_date?: string
    pronoun?: string
    care_level?: number
    active?: boolean
    active_since?: string
}
