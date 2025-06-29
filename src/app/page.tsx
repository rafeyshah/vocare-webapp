"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import CalendarWeek from "@/modules/calendar/CalendarWeek"
import CalendarMonth from "@/modules/calendar/CalendarMonth"
import AppointmentList from "@/modules/appointment/components/AppointmentList"
import NewAppointmentModal from "@/modules/appointment/components/NewAppointmentModal"
import FilterModal from "@/modules/appointment/components/FilterModal"
import { Menu } from "lucide-react"

export default function CalendarPage() {
  const [view, setView] = useState<"week" | "month" | "list">("week")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filters, setFilters] = useState<any>({})
  const [showFilter, setShowFilter] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const refreshAppointments = () => setRefreshKey(prev => prev + 1);

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment)
    setShowNewModal(true)
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
          <div className="flex justify-between w-full sm:w-auto">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border p-2 rounded w-full sm:w-auto"
            />
            <button
              className="sm:hidden ml-2 text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className={`flex-col sm:flex sm:flex-row gap-1 ml-0 sm:ml-2 mt-2 sm:mt-0 ${menuOpen ? "flex" : "hidden sm:flex"}`}>
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

        <div className={`flex-col sm:flex sm:flex-row gap-2 w-full sm:w-auto ${menuOpen ? "flex" : "hidden sm:flex"}`}>
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
        <AppointmentList selectedDate={selectedDate} filters={filters} onEdit={handleEdit} key={refreshKey} />
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
