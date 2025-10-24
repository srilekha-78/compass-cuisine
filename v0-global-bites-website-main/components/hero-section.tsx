"use client"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6 text-6xl md:text-8xl animate-bounce">🌎</div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">Global Bites</h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
          Explore 50 Authentic Dishes from 10 Countries
        </p>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          Embark on a culinary journey around the world. Discover authentic recipes, ratings, and reviews from India,
          Italy, Japan, Mexico, France, Thailand, USA, China, Greece, and Spain.
        </p>

        <a
          href="#india"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Start Exploring
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
    </section>
  )
}
