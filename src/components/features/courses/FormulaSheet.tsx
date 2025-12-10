"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Plus, Sigma, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Formula {
    id: string;
    title: string;
    expression: string;
    description: string;
}

interface FormulaSheetProps {
    formulas: Formula[];
}

export default function FormulaSheet({ formulas: initialFormulas }: FormulaSheetProps) {
    const [formulas, setFormulas] = useState<Formula[]>(initialFormulas);
    const [newFormula, setNewFormula] = useState({ title: "", expression: "", description: "" });
    const [isOpen, setIsOpen] = useState(false);

    const handleAddFormula = () => {
        if (!newFormula.title || !newFormula.expression) return;

        const formula: Formula = {
            id: Date.now().toString(),
            title: newFormula.title,
            expression: newFormula.expression,
            description: newFormula.description
        };

        setFormulas([...formulas, formula]);
        setNewFormula({ title: "", expression: "", description: "" });
        setIsOpen(false);
    };

    const handleDelete = (id: string) => {
        setFormulas(formulas.filter(f => f.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Sigma className="w-5 h-5 text-purple-600" /> My Formulas
                </h2>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                            <Plus className="w-4 h-4" /> Add Formula
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Formula</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Pythagoras Theorem"
                                    value={newFormula.title}
                                    onChange={(e) => setNewFormula({ ...newFormula, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expression">Expression (Math)</Label>
                                <Input
                                    id="expression"
                                    placeholder="e.g. a² + b² = c²"
                                    className="font-mono bg-gray-50"
                                    value={newFormula.expression}
                                    onChange={(e) => setNewFormula({ ...newFormula, expression: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description (Optional)</Label>
                                <Textarea
                                    id="desc"
                                    placeholder="Brief explanation..."
                                    value={newFormula.description}
                                    onChange={(e) => setNewFormula({ ...newFormula, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleAddFormula} className="bg-purple-600 hover:bg-purple-700">Save Formula</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                    {formulas.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                        >
                            <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow group relative">
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                                        <Sigma className="w-6 h-6" />
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="my-3 p-3 bg-gray-50 rounded-md border border-gray-100 font-mono text-center text-lg text-gray-800 tracking-wide">
                                            {item.expression}
                                        </div>
                                        {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {formulas.length === 0 && (
                    <div className="col-span-full text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-400">No formulas added yet. Click "Add Formula" to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
