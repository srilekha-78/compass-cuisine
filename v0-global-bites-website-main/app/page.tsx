"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { FilterButtons } from "@/components/filter-buttons"
import { SimpleDishCard } from "@/components/simple-dish-card"
import { ReviewCard } from "@/components/review-card"
import { RecipeModal } from "@/components/recipe-modal"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { VoiceAssistant } from "@/components/voice-assistant"
import { countriesData } from "@/lib/dishes-data"

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedRecipe, setSelectedRecipe] = useState<{
    name: string
    recipe: { ingredients: Array<{ name: string; amount: string }>; steps: string[] }
  } | null>(null)

  const countries = countriesData.map((c) => c.name)

  const filteredDishes = useMemo(() => {
    if (selectedCountry === "All") {
      return countriesData.flatMap((country) =>
        country.dishes.map((dish) => ({
          ...dish,
          country: country.name,
        })),
      )
    }
    const country = countriesData.find((c) => c.name === selectedCountry)
    return country
      ? country.dishes.map((dish) => ({
          ...dish,
          country: country.name,
        }))
      : []
  }, [selectedCountry])

  const dishCount = filteredDishes.length

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Dishes Section */}
      <section id="dishes" className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Filter by Country</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>

          <FilterButtons countries={countries} selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />

          <p className="text-muted-foreground mb-8">
            Found <span className="font-semibold text-foreground">{dishCount}</span> dishes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredDishes.map((dish, index) => (
              <div
                key={dish.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedRecipe({ name: dish.name, recipe: dish.recipe })}
                className="cursor-pointer"
              >
                <SimpleDishCard name={dish.name} image={dish.image} rating={dish.rating} country={dish.country} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Reviews</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish, index) => (
              <div key={dish.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ReviewCard dishName={dish.name} country={dish.country} review={dish.review} rating={dish.rating} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Recipes</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish, index) => (
              <div
                key={dish.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedRecipe({ name: dish.name, recipe: dish.recipe })}
                className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-border hover:border-primary"
              >
                <h3 className="font-semibold text-lg text-card-foreground mb-2">{dish.name}</h3>
                <p className="text-sm text-primary font-medium mb-4">{dish.country}</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Ingredients:</span> {dish.recipe.ingredients.length} items
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Steps:</span> {dish.recipe.steps.length} steps
                  </p>
                </div>
                <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          name={selectedRecipe.name}
          recipe={selectedRecipe.recipe}
        />
      )}

      <VoiceAssistant />
    </main>
  )
}
