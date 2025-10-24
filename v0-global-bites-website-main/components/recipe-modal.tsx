"use client"

import { X } from "lucide-react"

interface RecipeModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  recipe: {
    ingredients: Array<{ name: string; amount: string }>
    steps: string[]
  }
}

export function RecipeModal({ isOpen, onClose, name, recipe }: RecipeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-card-foreground">{name} Recipe</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-card-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ingredients */}
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between text-card-foreground">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground font-medium">{ingredient.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Instructions</h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-card-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
