"use client";

import { useEffect, useState } from "react";
import { Clock, Home, User } from "lucide-react";
import { fetchAppointments } from "@/lib/fetchAppointments";

export default function AppointmentList() {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const start = "2025-06-01";
            const end = "2025-06-30";
            const data = await fetchAppointments(start, end);
            console.log("Data: ", data)
            setAppointments(data);
        };
        load();
    }, []);

    // Group appointments by date
    const grouped = appointments.reduce((acc, appt) => {
        const date = new Date(appt.start).toLocaleDateString("de-DE", {
            weekday: "long",
            day: "2-digit",
            month: "long",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(appt);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="bg-gray-50 p-4 rounded-md">
            {Object.entries(grouped).map(([date, items], i) => (
                <div key={i} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-base text-gray-800">
                            {date}
                        </h3>
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
                            // style={{ borderColor: item.category?.color || "#ddd" }}
                        >
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`h-2 w-2 rounded-full`}
                                        style={{ backgroundColor: item.category?.color || "#888" }}
                                    />
                                    <span className="font-semibold text-sm text-gray-900 break-words">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(item.start).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} -
                                    {new Date(item.end).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Home className="w-4 h-4" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                    <User className="w-4 h-4" />
                                    <span className="italic">{item.notes}</span>
                                </div>
                            </div>
                            <div className="mt-1">
                                <input type="checkbox" className="w-5 h-5 accent-gray-400" />
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
    );
}
