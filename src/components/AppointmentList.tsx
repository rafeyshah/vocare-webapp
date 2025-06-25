import { CheckCircle2, Clock, Home, User } from "lucide-react"

export default function AppointmentList() {
    const groupedAppointments = [
        {
            date: "Dienstag, 10. Juni",
            today: true,
            items: [
                {
                    category: "Arzt-Termin",
                    time: "08:45 bis 09:30 Uhr",
                    location: "Praxis von Frau Dr. med. Musterärztin",
                    note: "Keine Begleitung notwendig",
                    color: "green"
                }
            ]
        },
        {
            date: "Mittwoch, 11. Juni",
            today: false,
            items: [
                {
                    category: "MDK Besuch – Mögliche Erhöhung des Pflegegrad",
                    time: "10:30 bis 12:30 Uhr",
                    location: "Bei Herr Musterpatient zuhause",
                    note: "@Rauno Ruser soll vor Ort dabei sein.",
                    color: "purple"
                }
            ]
        }
    ]

    const colorMap: Record<string, string> = {
        green: "bg-green-500",
        purple: "bg-purple-500"
    }

    return (
        <div className="bg-gray-50 p-4 rounded-md">
            {groupedAppointments.map((group, i) => (
                <div key={i} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-base text-gray-800">
                            {group.date}
                        </h3>
                        {group.today && (
                            <div className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                                Heute
                            </div>
                        )}
                    </div>

                    {group.items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-start bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm w-full"
                        >
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`h-2 w-2 rounded-full ${colorMap[item.color]}`} />
                                    <span className="font-semibold text-sm text-gray-900 break-words">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Clock className="w-4 h-4" />
                                    {item.time}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                    <Home className="w-4 h-4" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                    <User className="w-4 h-4" />
                                    <span className="italic break-words">{item.note}</span>
                                </div>
                            </div>
                            <div className="mt-1">
                                <input type="checkbox" className="w-5 h-5 accent-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="text-center text-gray-500 text-sm mt-8">
                Keine weiteren Termine gefunden
            </div>
        </div>
    )
}
