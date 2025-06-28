import { supabase } from "./supabaseClient"

export async function deleteAppointment(id: string) {
    const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id)

    if (error) {
        console.error("Error deleting appointment:", error)
        throw new Error("Fehler beim Löschen des Termins.")
    }
}
