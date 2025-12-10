"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Map as MapIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterSidebar from "@/components/employment/FilterSidebar";
import JobCard from "@/components/employment/JobCard";
import { Badge } from "@/components/ui/badge";

export default function PartTimeJobsPage() {
    const [location, setLocation] = useState("Bangalore");
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9793134375!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin");

    const handleLocationSearch = () => {
        // Open Google Maps Search directly
        window.open(`https://www.google.com/maps/search/part+time+jobs+near+${location}`, '_blank');

        // Also update local simulation
        const query = encodeURIComponent(`Part time jobs in ${location}`);
        setMapSrc(`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30000!2d77.59!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${query}!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`);
    };

    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps/search/part+time+jobs+near+${location}`, '_blank');
    };

    const jobs = [
        {
            title: "Data Entry Operator",
            company: "QuickTech Solutions",
            experience: "0-1 Yrs",
            salary: "₹15,000 - ₹20,000",
            location: location,
            description: "Required basic computer knowledge and typing speed of 40 WPM. Flexible timings available for students.",
            tags: ["Data Entry", "Back Office", "Fresher"],
            postedDaysAgo: 1,
            type: "Part Time"
        },
        {
            title: "Delivery Partner",
            company: "Zomato / Swiggy",
            experience: "Fresher",
            salary: "₹25,000 - ₹35,000",
            location: `${location} (All Areas)`,
            description: "Join as a delivery partner. Weekly payouts and joining bonus of ₹2000. Bike/Cycle required.",
            tags: ["Delivery", "Logistics", "Flexible"],
            postedDaysAgo: 0,
            isHot: true,
            type: "Gig Work"
        },
        {
            title: "Home Tutor (Maths & Science)",
            company: "Local Parents Assoc.",
            experience: "0-2 Yrs",
            salary: "₹8,000 - ₹12,000",
            location: `${location} - Indiranagar`,
            description: "Looking for a tutor for Class 10 student. Evening shift 2 hours daily.",
            tags: ["Teaching", "Tutor", "Education"],
            postedDaysAgo: 2,
            type: "Part Time"
        },
        {
            title: "Retail Store Executive",
            company: "Reliance Trends",
            experience: "0-1 Yrs",
            salary: "₹12,000 + Incentives",
            location: location,
            description: "Assist customers in store, manage billing counter. Weekend shifts available.",
            tags: ["Retail", "Sales", "Counter"],
            postedDaysAgo: 4,
            type: "Part Time"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Location Input */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                Part-Time Jobs Near You
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Live Feed</Badge>
                            </h1>
                            <p className="text-gray-500 mt-1">Find local gigs, data entry, and delivery jobs in your area.</p>
                        </div>

                        {/* Location Bar with Direct Map Link */}
                        <div className="flex w-full md:w-auto gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                            <div className="relative flex-1 md:w-80 group">
                                <MapPin className="absolute left-3 top-2.5 text-blue-600 w-5 h-5 z-10" />
                                <Input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter City & Select on Map"
                                    className="pl-10 border-none shadow-none focus-visible:ring-0 h-10 font-medium cursor-pointer"
                                    onClick={openGoogleMaps} // Open map on click as requested
                                />
                                <div className="absolute right-3 top-2.5 pointer-events-none opacity-50 text-xs bg-gray-100 px-1 rounded">
                                    Touch to Open Map
                                </div>
                            </div>
                            <Button onClick={handleLocationSearch} className="bg-blue-600 hover:bg-blue-700">
                                <Navigation className="w-4 h-4 mr-2" /> Locate
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Map Section - Touch to Open */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white relative group cursor-pointer"
                    onClick={openGoogleMaps}
                    whileHover={{ scale: 1.01 }}
                    title="Tap to open in Google Maps to select location"
                >
                    <div className="bg-gray-100 h-64 w-full relative">
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0, pointerEvents: 'none' }} // Disable pointer events to ensure click goes to div
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale-[10%] group-hover:grayscale-0 transition-all duration-300"
                        ></iframe>

                        {/* Interactive Overlay Hint */}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors flex items-center justify-center">
                            <span className="bg-white/90 text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl transform group-hover:scale-105 transition-transform flex items-center gap-2 border border-blue-100">
                                <MapIcon className="w-5 h-5 text-blue-600" />
                                Select Location on Google Maps
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <FilterSidebar />
                    </div>

                    {/* Job Feed */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">{jobs.length}</span> jobs in <span className="font-bold text-blue-600">{location}</span></p>
                            <div className="text-sm text-gray-500">Sort by: <span className="font-bold text-gray-900 cursor-pointer">Date Posted</span></div>
                        </div>

                        {jobs.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <JobCard {...job} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
