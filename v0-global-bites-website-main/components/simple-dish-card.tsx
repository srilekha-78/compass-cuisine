"use client"

import { Star } from "lucide-react"

interface SimpleDishCardProps {
  name: string
  image: string
  rating: number
  country: string
}

export function SimpleDishCard({ name, image, rating, country }: SimpleDishCardProps) {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up">
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-1 line-clamp-2">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{country}</p>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">{rating}</span>
        </div>
      </div>
    </div>
  )
}
