"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { formatISO } from "date-fns";

export default function NewAppointmentModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    const [form, setForm] = useState({
        title: "",
        start: "",
        end: "",
        location: "",
        notes: "",
        category: "",
        patient: "",
    });

    const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
    const [patients, setPatients] = useState<{ id: string; firstname: string; lastname: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data: categories } = await supabase.from("categories").select("id, label");
            const { data: patients } = await supabase.from("patients").select("id, firstname, lastname");
            setCategories(categories || []);
            setPatients(patients || []);
        };
        fetchData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setErrorMsg("");
        if (!form.title || !form.start || !form.end) {
            setErrorMsg("Titel, Start und Ende sind erforderlich.");
            return;
        }

        const startDate = new Date(form.start);
        const endDate = new Date(form.end);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            setErrorMsg("Ungültiges Datumsformat.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.from("appointments").insert([
            {
                title: form.title,
                start: formatISO(startDate),
                end: formatISO(endDate),
                location: form.location,
                notes: form.notes,
                category: form.category || null,
                patient: form.patient || null,
            },
        ]);

        setLoading(false);

        if (error) {
            console.error("Supabase insert error:", error);
            setErrorMsg("Fehler beim Hinzufügen des Termins.");
            return;
        }

        setForm({
            title: "",
            start: "",
            end: "",
            location: "",
            notes: "",
            category: "",
            patient: "",
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="selection:bg-neutral-700 selection:text-white">
                <DialogHeader>
                    <DialogTitle>Neuen Termin hinzufügen</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Titel</Label>
                        <Input id="title" name="title" value={form.title} onChange={handleChange} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start" className="text-right">Start</Label>
                        <Input id="start" type="datetime-local" name="start" value={form.start} onChange={handleChange} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end" className="text-right">Ende</Label>
                        <Input id="end" type="datetime-local" name="end" value={form.end} onChange={handleChange} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Ort</Label>
                        <Input id="location" name="location" value={form.location} onChange={handleChange} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">Notizen</Label>
                        <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Kategorie</Label>
                        <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Kategorie wählen" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Patient</Label>
                        <Select value={form.patient} onValueChange={(value) => setForm({ ...form, patient: value })}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Patient wählen" />
                            </SelectTrigger>
                            <SelectContent>
                                {patients.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>{p.firstname} {p.lastname}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {errorMsg && (
                        <p className="text-sm text-red-500 col-span-4 text-center">{errorMsg}</p>
                    )}
                </div>

                <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                    {loading ? "Speichern..." : "Speichern"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}