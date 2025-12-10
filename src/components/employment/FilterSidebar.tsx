"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FilterSidebar() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </h3>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-medium h-auto p-0 hover:bg-transparent">
                    Clear All
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={["work-mode", "department", "salary", "role"]} className="w-full">

                {/* Work Mode */}
                <AccordionItem value="work-mode" className="border-b-0 mb-4">
                    <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold text-gray-800">
                        Work Mode
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        {["Work from office", "Remote", "Hybrid"].map((mode) => (
                            <div key={mode} className="flex items-center space-x-2">
                                <Checkbox id={mode} />
                                <Label htmlFor={mode} className="text-sm font-normal text-gray-600 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {mode}
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                {/* Role Category */}
                <AccordionItem value="role" className="border-b-0 mb-4">
                    <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold text-gray-800">
                        Job Type
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        {[
                            { id: "govt", label: "Govt. Permanent" },
                            { id: "private", label: "Private Full Time" },
                            { id: "part-time", label: "Part Time / Gig" },
                            { id: "intern", label: "Internship" }
                        ].map((role) => (
                            <div key={role.id} className="flex items-center space-x-2">
                                <Checkbox id={role.id} />
                                <Label htmlFor={role.id} className="text-sm font-normal text-gray-600 cursor-pointer">
                                    {role.label}
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                {/* Department */}
                <AccordionItem value="department" className="border-b-0 mb-4">
                    <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold text-gray-800">
                        Department
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        {[
                            "Engineering / Tech",
                            "Banking / Finance",
                            "Teaching / EdTech",
                            "Data Entry / Back Office",
                            "Delivery / Logistics",
                            "Sales / Marketing"
                        ].map((dept) => (
                            <div key={dept} className="flex items-center space-x-2">
                                <Checkbox id={dept} />
                                <Label htmlFor={dept} className="text-sm font-normal text-gray-600 cursor-pointer">
                                    {dept}
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                {/* Salary */}
                <AccordionItem value="salary" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold text-gray-800">
                        Salary (LPA)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 px-1">
                        <Slider defaultValue={[3]} max={50} step={1} className="mb-6" />
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                            {[
                                "0-3 Lakhs",
                                "3-6 Lakhs",
                                "6-10 Lakhs",
                                "10-15 Lakhs",
                                "15-25 Lakhs",
                                "25+ Lakhs"
                            ].map((range) => (
                                <div key={range} className="border border-gray-200 rounded px-2 py-1 text-center hover:border-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
                                    {range}
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
}
