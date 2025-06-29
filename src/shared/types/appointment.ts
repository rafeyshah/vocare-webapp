export interface Appointment {
    id: string
    title: string
    notes?: string
    start: string  // ISO date string
    end: string
    location?: string
    patient?: string  // UUID
    category?: string // UUID
    created_at?: string
    updated_at?: string
}
