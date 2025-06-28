"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CalendarWeek from "@/components/CalendarWeek"
import CalendarMonth from "@/components/CalendarMonth"
import AppointmentList from "@/components/AppointmentList"
import NewAppointmentModal from "@/components/NewAppointmentModal"
import FilterModal from "@/components/FilterModal"

export default function CalendarPage() {
  const [view, setView] = useState<"week" | "month" | "list">("week")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filters, setFilters] = useState<any>({})
  const [showFilter, setShowFilter] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAppointments = () => setRefreshKey(prev => prev + 1);

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment)
    setShowNewModal(true)
  }

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
            <Button
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
            >
              Liste
            </Button>
            <Button
              variant={view === "week" ? "default" : "outline"}
              onClick={() => setView("week")}
            >
              Woche
            </Button>
            <Button
              variant={view === "month" ? "default" : "outline"}
              onClick={() => setView("month")}
            >
              Monat
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilter(true)}>
            Termine filtern
          </Button>
          <Button
            onClick={() => {
              setEditingAppointment(null)
              setShowNewModal(true)
            }}
          >
            + Neuer Termin
          </Button>
        </div>
      </div>

      {view === "week" && (
        <CalendarWeek weekStartDate={selectedDate} filters={filters} key={refreshKey} />
      )}
      {view === "month" && (
        <CalendarMonth selectedDate={selectedDate} filters={filters} key={refreshKey} />
      )}
      {view === "list" && (
        <AppointmentList filters={filters} onEdit={handleEdit} key={refreshKey} />
      )}

      <NewAppointmentModal
        open={showNewModal}
        setOpen={(val) => {
          setShowNewModal(val);
          if (!val) setEditingAppointment(null);
        }}
        existing={editingAppointment}
        onRefresh={refreshAppointments}
      />


      <FilterModal
        open={showFilter}
        setOpen={setShowFilter}
        filters={filters}
        setFilters={setFilters}
      />

    </div>
  )
}
