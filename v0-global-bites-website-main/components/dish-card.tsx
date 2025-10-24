"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { RecipeModal } from "./recipe-modal"

interface DishCardProps {
  id: string
  name: string
  image: string
  rating: number
  review: string
  recipe: {
    ingredients: Array<{ name: string; amount: string }>
    steps: string[]
  }
}

export function DishCard({ id, name, image, rating, review, recipe }: DishCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">{name}</h3>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">{rating}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{review}</p>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            View Recipe
          </button>
        </div>
      </div>

      <RecipeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} name={name} recipe={recipe} />
    </>
  )
}
