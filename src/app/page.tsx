"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CalendarWeek from "@/components/CalendarWeek"
import CalendarMonth from "@/components/CalendarMonth"
import AppointmentList from "@/components/AppointmentList"
import NewAppointmentModal from "@/components/NewAppointmentModal"

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'month' | 'list'>('week')
  const [selectedDate, setSelectedDate] = useState(new Date("2025-06-10"))
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
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
          <Button onClick={() => setModalOpen(true)}>+ Neuer Termin</Button>
        </div>
      </div>

      {/* View Switcher */}
      {view === 'week' && <CalendarWeek weekStartDate={selectedDate} />}
      {view === 'month' && <CalendarMonth />}
      {view === 'list' && <AppointmentList />}

      {/* Modal */}
      <NewAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  )
}
