"use client";

import { Clock, Home, User } from "lucide-react";

export default function CalendarMonth() {
    const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const firstDayOffset = 5;
    const totalDays = 30;
    const selectedDay = 10;

    const appointments = [
        {
            day: 10,
            title: "Arzt-Termin",
            time: "08:45 bis 09:30 Uhr",
            location: "Praxis von Frau Dr. med. Musterärztin",
            note: "Keine Begleitung notwendig",
            color: "green"
        },
        {
            day: 11,
            title: "MDK Besuch – Mögliche Erhöhung des Pflegegrad",
            time: "10:30 bis 12:30 Uhr",
            location: "Bei Herr Musterpatient zuhause",
            note: "@Rauno Ruser soll vor Ort dabei sein.",
            color: "purple"
        }
    ];

    const colorMap: Record<string, string> = {
        green: "border-l-4 border-green-500 bg-white",
        purple: "border-l-4 border-purple-500 bg-white"
    };

    return (
        <div className="bg-gray-50 min-h-screen py-6 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex h-[calc(100vh-3rem)] rounded-lg shadow overflow-hidden">
                    {/* Calendar Grid */}
                    <div className="flex-[3] min-w-0 overflow-auto px-2 py-4 bg-white">
                        <div className="border-t border-b grid grid-cols-7 text-xs text-center text-gray-500 uppercase">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="py-2 border-r last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 text-xs text-gray-800">
                            {Array.from({ length: firstDayOffset }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-[110px] border-b border-r bg-white" />
                            ))}

                            {Array.from({ length: totalDays }).map((_, i) => {
                                const day = i + 1;
                                const dayAppointments = appointments.filter((a) => a.day === day);

                                return (
                                    <div
                                        key={day}
                                        className="relative border-b border-r p-1 h-[110px] bg-white overflow-hidden"
                                    >
                                        <div className={`text-xs font-semibold w-fit px-2 py-0.5 rounded-full ${day === selectedDay
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-800'
                                            }`}>
                                            {day.toString().padStart(2, "0")}
                                        </div>

                                        {dayAppointments.map((appt, idx) => (
                                            <div
                                                key={idx}
                                                className={`mt-2 text-xs rounded-md px-2 py-1 pr-1 truncate shadow-sm ${colorMap[appt.color]}`}
                                            >
                                                {appt.title}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 text-center">
                            <button className="px-3 py-1 border rounded text-sm text-gray-600 bg-white hover:bg-gray-100">
                                Nächsten Monat laden
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Appointment Preview */}
                    <div className="flex-[1] min-w-[280px] overflow-y-auto px-4 py-6 border-l bg-gray-50">
                        <div className="font-semibold mb-2">
                            Dienstag, 10. Juni
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
                                <User className="w-4 h-4" /> <span className="italic">Keine Begleitung notwendig</span>
                            </div>
                            <div className="mt-2 text-right">
                                <input type="checkbox" className="w-5 h-5 accent-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
