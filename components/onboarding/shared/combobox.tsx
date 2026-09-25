"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  allowCustom?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Search...",
  allowCustom = true,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Allow custom options if enabled and search query doesn't match any option
  const showCustomOption =
    allowCustom &&
    search.trim() !== "" &&
    !options.some((opt) => opt.toLowerCase() === search.toLowerCase());

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Reset search field to current selected value
        setSearch(value);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // Sync search input with value updates
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }

    const totalCount = filteredOptions.length + (showCustomOption ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex((prev) => (prev + 1) % totalCount);
        e.preventDefault();
        break;
      case "ArrowUp":
        setFocusedIndex((prev) => (prev - 1 + totalCount) % totalCount);
        e.preventDefault();
        break;
      case "Enter":
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          selectOption(filteredOptions[focusedIndex]);
        } else if (focusedIndex === filteredOptions.length && showCustomOption) {
          selectOption(search);
        } else if (search.trim() !== "" && allowCustom) {
          selectOption(search);
        }
        e.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        setSearch(value);
        inputRef.current?.blur();
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  const selectOption = (opt: string) => {
    onChange(opt);
    setSearch(opt);
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="relative w-full text-left">
      {/* Combobox Input Frame */}
      <div 
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className="relative w-full cursor-text"
      >
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-text-secondary/40 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setFocusedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg h-11 pl-10 pr-10 text-xs text-white placeholder-text-secondary/30 focus:outline-none focus:border-primary transition-colors focus:ring-0"
        />
        <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-text-secondary/40 pointer-events-none" />
      </div>

      {/* Options Dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 rounded-lg border border-white/10 bg-[#0A0F24] shadow-2xl max-h-48 overflow-y-auto pr-1"
          >
            <div className="p-1.5 space-y-0.5">
              {filteredOptions.map((opt, index) => {
                const isSelected = value.toLowerCase() === opt.toLowerCase();
                const isFocused = focusedIndex === index;
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors text-left",
                      isFocused || isSelected
                        ? "bg-primary/10 text-white"
                        : "text-text-secondary hover:text-white"
                    )}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}

              {showCustomOption && (
                <button
                  type="button"
                  onClick={() => selectOption(search)}
                  onMouseEnter={() => setFocusedIndex(filteredOptions.length)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors text-left border border-dashed border-primary/20",
                    focusedIndex === filteredOptions.length
                      ? "bg-primary/10 text-white"
                      : "text-text-secondary/70 hover:text-white"
                  )}
                >
                  <span className="italic">Use custom: "{search}"</span>
                  <ChevronDown className="h-3.5 w-3.5 text-primary" />
                </button>
              )}

              {filteredOptions.length === 0 && !showCustomOption && (
                <div className="px-3 py-3 text-xs text-text-secondary/40 italic text-center">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
