"use client";

import { useEffect, useState } from "react";
import { fetchAppointments } from "@/lib/fetchAppointments";

export default function CalendarWeek({ weekStartDate }: { weekStartDate: Date }) {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const from = new Date(weekStartDate);
        const to = new Date(from);
        to.setDate(from.getDate() + 6);
        const load = async () => {
            const data = await fetchAppointments(from.toISOString().split("T")[0], to.toISOString().split("T")[0]);
            setAppointments(data);
        };
        load();
    }, [weekStartDate]);

    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const dateForColumn = (offset: number) => {
        const date = new Date(weekStartDate);
        date.setDate(weekStartDate.getDate() + offset);
        return date;
    };

    const startHour = 6;
    const endHour = 20;
    const hourHeight = 80;
    const hourSlots = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

    return (
        <div className="relative">
            <div className="grid grid-cols-8 border-t border-l text-sm">
                {/* Time Column */}
                <div className="border-r bg-gray-50 pt-[38px]">
                    {hourSlots.map((hour) => (
                        <div
                            key={hour}
                            className="h-[80px] flex items-center justify-end pr-2 text-xs text-gray-600 border-t border-gray-200"
                        >
                            {hour.toString().padStart(2, "0")}:00 Uhr
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                {days.map((day, colIdx) => (
                    <div key={colIdx} className="border-r border-b relative">
                        <div className="sticky top-0 bg-white z-10 p-2 font-medium border-b">
                            {day}, {dateForColumn(colIdx).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })}
                        </div>

                        <div className="relative" style={{ height: `${hourHeight * hourSlots.length}px` }}>
                            {/* Hour Grid Lines */}
                            {hourSlots.map((hour, idx) => (
                                <div
                                    key={hour}
                                    className="absolute left-0 right-0 border-t border-gray-200"
                                    style={{ top: `${idx * hourHeight}px` }}
                                />
                            ))}

                            {/* Appointments */}
                            {appointments
                                .filter((appt) => {
                                    const apptDate = new Date(appt.start);
                                    const colDate = dateForColumn(colIdx);
                                    return apptDate.toDateString() === colDate.toDateString();
                                })
                                .map((appt, idx) => {
                                    const from = new Date(appt.start);
                                    const to = new Date(appt.end);
                                    const top = (from.getHours() - startHour) * hourHeight + (from.getMinutes() / 60) * hourHeight;
                                    const height = ((to.getTime() - from.getTime()) / (1000 * 60 * 60)) * hourHeight;

                                    return (
                                        <div
                                            key={idx}
                                            className="absolute left-1 right-1 p-2 rounded shadow text-xs bg-white border-l-4"
                                            style={{
                                                top: `${top}px`,
                                                height: `${height}px`,
                                                borderColor: appt.category?.color || "#999"
                                            }}
                                        >
                                            <div className="font-semibold truncate">{appt.title}</div>
                                            <div>
                                                {from.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} bis
                                                {to.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
                                            </div>
                                            <div className="truncate">{appt.location}</div>
                                            <div className="truncate">
                                                {appt.notes || `${appt.patient?.firstname || ""} ${appt.patient?.lastname || ""}`}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
