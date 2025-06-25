export default function CalendarMonth() {
    const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    const totalDays = 30
    const offset = 6 // starts on Saturday

    return (
        <div className="grid grid-cols-7 gap-1 text-sm">
            {days.map((d) => (
                <div key={d} className="text-center font-semibold py-2">
                    {d}
                </div>
            ))}

            {Array.from({ length: offset }).map((_, i) => (
                <div key={`blank-${i}`} className="h-24 border rounded bg-gray-50" />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => (
                <div
                    key={i + 1}
                    className="h-24 border rounded p-1 hover:bg-gray-50 flex flex-col"
                >
                    <div className="text-xs font-medium mb-1">{i + 1}. Juni</div>
                    {/* Example Appointment */}
                    {i + 1 === 10 && (
                        <div className="text-xs bg-green-100 border-l-2 border-green-500 p-1 rounded">
                            Arzt-Termin, 08:45
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}