"use client";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center bg-neutral-800 rounded-xl px-3 py-2">
            <Search size={18} className="text-neutral-400 mr-2" />
            <input
                type="text"
                placeholder="Paste video URL..."
                className="bg-transparent outline-none flex-1 text-sm"
            />
        </div>
    );
}
