"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Home, User } from "lucide-react";
import { fetchAppointments } from "@/lib/fetchAppointments";

export default function CalendarMonth({
    filters,
    selectedDate,
}: {
    filters?: any;
    selectedDate: Date;
}) {
    const today = new Date();
    const [appointments, setAppointments] = useState<any[]>([]);

    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOffset = (startOfMonth.getDay() + 6) % 7; // Monday-start
    const totalDays = endOfMonth.getDate();

    useEffect(() => {
        const load = async () => {
            const data = await fetchAppointments(
                startOfMonth.toISOString().split("T")[0],
                endOfMonth.toISOString().split("T")[0],
                filters
            );
            setAppointments(data);
        };
        load();
    }, [filters, selectedDate]);

    const daysOfWeek = useMemo(
        () => ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        []
    );

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <div className="flex-[3] min-w-0 px-2 py-4 bg-white">
                    {/* Day Names */}
                    <div className="border-t border-b grid grid-cols-7 text-xs text-center text-gray-500 uppercase">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="py-2 border-r last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 text-xs text-gray-800">
                        {Array.from({ length: firstDayOffset }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-[110px] border-b border-r bg-white" />
                        ))}

                        {Array.from({ length: totalDays }).map((_, i) => {
                            const day = i + 1;
                            const fullDate = new Date(currentYear, currentMonth, day);
                            const isToday =
                                today.getFullYear() === fullDate.getFullYear() &&
                                today.getMonth() === fullDate.getMonth() &&
                                today.getDate() === fullDate.getDate();

                            const dayAppointments = appointments.filter(
                                (a) => new Date(a.start).getDate() === day &&
                                    new Date(a.start).getMonth() === currentMonth &&
                                    new Date(a.start).getFullYear() === currentYear
                            );

                            return (
                                <div
                                    key={day}
                                    className="relative border-b border-r p-1 h-[110px] bg-white overflow-hidden"
                                >
                                    <div
                                        className={`text-xs font-semibold w-fit px-2 py-0.5 rounded-full ${isToday ? "bg-gray-900 text-white" : "text-gray-800"
                                            }`}
                                    >
                                        {day.toString().padStart(2, "0")}
                                    </div>

                                    {dayAppointments.map((appt, idx) => (
                                        <div
                                            key={idx}
                                            className="mt-2 rounded-md p-2 bg-white border-l-4 shadow-sm text-[10px]"
                                            style={{ borderColor: appt.category?.color || "#888" }}
                                        >
                                            <div className="font-semibold truncate">{appt.title}</div>
                                            <div className="text-gray-600 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(appt.start).toLocaleTimeString("de-DE", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}{" "}
                                                -{" "}
                                                {new Date(appt.end).toLocaleTimeString("de-DE", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                            <div className="text-gray-600 flex items-center gap-1 truncate">
                                                <Home className="w-3 h-3" /> {appt.location}
                                            </div>
                                            <div className="text-gray-600 flex items-center gap-1 truncate">
                                                <User className="w-3 h-3" /> {appt.patient?.firstname}{" "}
                                                {appt.patient?.lastname}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Sidebar Example (Static content retained as placeholder) */}
                <div className="flex-[1] min-w-[280px] overflow-y-auto px-4 py-2 border-l bg-gray-50">
                    <div className="font-semibold mb-2">
                        {selectedDate.toLocaleDateString("de-DE", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                        })}
                        <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                            Heute
                        </span>
                    </div>

                    <div className="border-l-4 border-green-500 bg-white rounded-md shadow p-4 text-sm">
                        <div className="font-semibold text-green-800 text-base mb-1">Arzt-Termin</div>
                        <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                            <Clock className="w-4 h-4" /> 08:45 bis 09:30 Uhr
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                            <Home className="w-4 h-4" /> Praxis von Frau Dr. med. Musterärztin
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                            <User className="w-4 h-4" />{" "}
                            <span className="italic">Keine Begleitung notwendig</span>
                        </div>
                        <div className="mt-2 text-right">
                            <input type="checkbox" className="w-5 h-5 accent-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
