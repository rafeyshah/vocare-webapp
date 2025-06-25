import { supabase } from "@/lib/supabaseClient"

export async function fetchAppointments(start: string, end: string) {
    const [{ data: appointments, error }, { data: categories }, { data: patients }] = await Promise.all([
        supabase
            .from("appointments")
            .select("*")
            .gte("start", start)
            .lte("end", end)
            .order("start", { ascending: true }),
        supabase.from("categories").select("id, label, color"),
        supabase.from("patients").select("id, firstname, lastname")
    ])

    if (error) {
        console.error("Error fetching appointments:", error)
        return []
    }

    return (
        appointments || []
    ).map((appt) => {
        const category = categories?.find((c) => c.id === appt.category)
        const patient = patients?.find((p) => p.id === appt.patient)
        return {
            ...appt,
            category,
            patient
        }
    })
}