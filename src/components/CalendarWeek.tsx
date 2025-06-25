export default function CalendarWeek() {
    return (
        <div className="grid grid-cols-8 border-t border-l text-sm relative">
            {/* Time Column */}
            <div className="border-r border-b bg-gray-100 h-[720px]">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="h-[90px] border-b p-1 text-right pr-2"
                    >
                        {`${6 + i}:00 Uhr`}
                    </div>
                ))}
            </div>

            {/* Days Columns */}
            {["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(
                (day, colIdx) => (
                    <div
                        key={colIdx}
                        className="border-r border-b h-[720px] relative"
                    >
                        <div className="sticky top-0 bg-white z-10 p-2 font-medium border-b">
                            {day}, {9 + colIdx}. Juni
                        </div>

                        {/* Demo Appointments (only Tuesday for now) */}
                        {day === "Dienstag" && (
                            <>
                                <div className="absolute top-[60px] left-1 right-1 bg-green-100 border-l-4 border-green-500 p-2 rounded shadow text-xs">
                                    <div className="font-semibold">Arzt-Termin</div>
                                    <div>08:45 bis 09:30 Uhr</div>
                                    <div>Praxis von Frau Dr. med. Musterärztin</div>
                                    <div>Keine Begleitung notwendig</div>
                                </div>

                                <div className="absolute top-[180px] left-1 right-1 bg-purple-100 border-l-4 border-purple-500 p-2 rounded shadow text-xs">
                                    <div className="font-semibold">
                                        MDK Besuch • Mögliche Erhöhung des Pflegegrad
                                    </div>
                                    <div>10:30 bis 12:15 Uhr</div>
                                    <div>Bei Herr Musterpatient zuhause</div>
                                    <div>
                                        <b>Bruno Ruser</b> soll vor Ort dabei sein.
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )
            )}

            {/* Current Time Line */}
            <div className="absolute top-[141px] left-24 right-4 h-[1px] bg-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full -mt-1" />
            </div>
        </div>
    )
}