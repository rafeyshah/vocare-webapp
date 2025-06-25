"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import CalendarWeek from "@/components/CalendarWeek"
import CalendarMonth from "@/components/CalendarMonth"
import AppointmentList from "@/components/AppointmentList"

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'month' | 'list'>('week')

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="date"
            defaultValue="2025-06-10"
            className="border p-2 rounded"
          />
          <div className="flex gap-1 ml-2">
            <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
              Liste
            </Button>
            <Button variant={view === 'week' ? 'default' : 'outline'} onClick={() => setView('week')}>
              Woche
            </Button>
            <Button variant={view === 'month' ? 'default' : 'outline'} onClick={() => setView('month')}>
              Monat
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Termine filtern</Button>
          <Button>+ Neuer Termin</Button>
        </div>
      </div>

      {/* View Switcher */}
      {view === 'week' && <CalendarWeek />}
      {view === 'month' && <CalendarMonth />}
      {view === 'list' && <AppointmentList />}
    </div>
  )
}
