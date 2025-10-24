"use client"

interface FilterButtonsProps {
  countries: string[]
  selectedCountry: string
  onCountryChange: (country: string) => void
}

export function FilterButtons({ countries, selectedCountry, onCountryChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onCountryChange("All")}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          selectedCountry === "All" ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
        }`}
      >
        All Countries
      </button>
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => onCountryChange(country)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedCountry === country
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted"
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  )
}
