"use client"

import { useEffect, useState } from "react"
import { Clock, Home, User, Pencil, Trash } from "lucide-react"
import { fetchAppointments } from "@/lib/fetchAppointments"
import { deleteAppointment } from "@/lib/deleteAppointment"
import { toast } from "sonner"

export default function AppointmentList({
    filters,
    onEdit,
}: {
    filters?: any
    onEdit?: (appointment: any) => void
}) {
    const [appointments, setAppointments] = useState<any[]>([])

    useEffect(() => {
        const load = async () => {
            const today = new Date()
            const start = new Date(today.getFullYear(), today.getMonth(), 1)
                .toISOString()
                .split("T")[0]
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                .toISOString()
                .split("T")[0]

            const data = await fetchAppointments(start, end, filters)
            setAppointments(data)
        }
        load()
    }, [filters])

    const handleDelete = async (id: string) => {
        if (confirm("Möchten Sie diesen Termin wirklich löschen?")) {
            try {
                await deleteAppointment(id)
                setAppointments((prev) => prev.filter((appt) => appt.id !== id))

                toast.success("Termin gelöscht", {
                    description: "Der Termin wurde erfolgreich entfernt.",
                })

            } catch {
                toast.error("Löschen fehlgeschlagen", {
                    description: "Beim Löschen des Termins ist ein Fehler aufgetreten.",
                })
            }
        }
    }


    const grouped = appointments.reduce((acc, appt) => {
        const date = new Date(appt.start).toLocaleDateString("de-DE", {
            weekday: "long",
            day: "2-digit",
            month: "long",
        })
        if (!acc[date]) acc[date] = []
        acc[date].push(appt)
        return acc
    }, {} as Record<string, any[]>)

    return (
        <div className="bg-gray-50 p-4 rounded-md">
            {Object.entries(grouped).map(([date, items], i) => (
                <div key={i} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-base text-gray-800">{date}</h3>
                        {i === 0 && (
                            <div className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                                Heute
                            </div>
                        )}
                    </div>

                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-start bg-white rounded-lg p-4 mb-3 shadow-sm w-full"
                        >
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`h-2 w-2 rounded-full`}
                                        style={{
                                            backgroundColor: item.category?.color || "#888",
                                        }}
                                    />
                                    <span className="font-semibold text-sm text-gray-900 break-words">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(item.start).toLocaleTimeString("de-DE", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(item.end).toLocaleTimeString("de-DE", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Home className="w-4 h-4" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                    <User className="w-4 h-4" />
                                    <span className="italic">
                                        {item.notes ||
                                            `${item.patient?.firstname || ""} ${item.patient?.lastname || ""}`}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <button
                                    onClick={() => onEdit?.(item)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {!appointments.length && (
                <div className="text-center text-gray-500 text-sm mt-8">
                    Keine Termine gefunden
                </div>
            )}
        </div>
    )
}
