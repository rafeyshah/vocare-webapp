"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import { supabase } from "@/shared/lib/supabaseClient";

export default function FilterModal({
    open,
    setOpen,
    filters,
    setFilters,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
    filters: {
        category: string;
        patient: string;
        start: string;
        end: string;
    };
    setFilters: (filters: any) => void;
}) {
    const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
    const [patients, setPatients] = useState<{ id: string; firstname: string; lastname: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: cats } = await supabase.from("categories").select("id, label");
            const { data: pats } = await supabase.from("patients").select("id, firstname, lastname");
            setCategories(cats || []);
            setPatients(pats || []);
        };
        fetchData();
    }, []);

    const handleApply = () => {
        setOpen(false);
    };

    const handleClear = () => {
        setFilters({ category: "", patient: "", start: "", end: "" });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter anwenden</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Kategorie</Label>
                        <Select
                            value={filters.category}
                            onValueChange={(value) => setFilters({ ...filters, category: value })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Kategorie wählen" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Patient</Label>
                        <Select
                            value={filters.patient}
                            onValueChange={(value) => setFilters({ ...filters, patient: value })}
                        >
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

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Startdatum</Label>
                        <Input
                            type="date"
                            value={filters.start}
                            onChange={(e) => setFilters({ ...filters, start: e.target.value })}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Enddatum</Label>
                        <Input
                            type="date"
                            value={filters.end}
                            onChange={(e) => setFilters({ ...filters, end: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={handleClear}>Zurücksetzen</Button>
                    <Button onClick={handleApply}>Anwenden</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
