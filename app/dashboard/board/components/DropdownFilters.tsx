"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface DropdownFiltersProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function DropdownFilters({
  label,
  value,
  options,
  onChange,
}: DropdownFiltersProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || label;

  return (
    <div className="relative w-auto min-w-[140px]">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10">
          <div className="py-1 max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`text-gray-700 w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  value === opt.value ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
