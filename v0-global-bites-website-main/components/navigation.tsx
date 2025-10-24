"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const countries = ["China", "France", "India", "Italy", "Japan", "Mexico"]

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🧭</span>
            <span className="hidden sm:inline">Compass Cuisine</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#dishes" className="text-foreground hover:text-primary transition-colors">
              Dishes
            </a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            <a href="#dishes" className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors">
              Dishes
            </a>
            <a href="#reviews" className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors">
              Reviews
            </a>
            <a href="#contact" className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
