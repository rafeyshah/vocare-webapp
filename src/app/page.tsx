"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CalendarWeek from "@/components/CalendarWeek"
import CalendarMonth from "@/components/CalendarMonth"
import AppointmentList from "@/components/AppointmentList"
import NewAppointmentModal from "@/components/NewAppointmentModal"
import FilterModal from "@/components/FilterModal"

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'month' | 'list'>('week')
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    patient: "",
    start: "",
    end: "",
  });


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
          <Button variant="outline" onClick={() => setFiltersOpen(true)}>Termine filtern</Button>
          <Button onClick={() => setModalOpen(true)}>+ Neuer Termin</Button>
        </div>
      </div>

      {/* View Switcher */}
      {view === 'week' && <CalendarWeek weekStartDate={selectedDate} filters={filters} />}
      {view === 'month' && (
        <CalendarMonth
          filters={filters}
          weekStartMonth={selectedDate}
          onNextMonth={() => {
            const nextMonth = new Date(selectedDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            setSelectedDate(nextMonth);
          }}
        />
      )}

      {view === 'list' && <AppointmentList filters={filters} />}


      {/* Modal */}
      <NewAppointmentModal open={modalOpen} setOpen={setModalOpen} />
      <FilterModal
        open={filtersOpen}
        setOpen={setFiltersOpen}
        filters={filters}
        setFilters={setFilters}
      />

    </div>
  )
}
