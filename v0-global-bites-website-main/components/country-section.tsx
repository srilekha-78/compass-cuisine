"use client"

import { DishCard } from "./dish-card"
import type { Country } from "@/lib/dishes-data"

interface CountrySectionProps {
  country: Country
}

export function CountrySection({ country }: CountrySectionProps) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Country Header */}
        <div className="mb-12 animate-slide-in-left">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{country.emoji}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{country.name}</h2>
          </div>
          <div className={`h-1 w-24 bg-gradient-to-r ${country.color} rounded-full`} />
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {country.dishes.map((dish, index) => (
            <div key={dish.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <DishCard {...dish} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
