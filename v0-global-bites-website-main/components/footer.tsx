"use client"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="font-semibold">Compass Cuisine</span>
          </div>

          <p className="text-center text-sm">© 2025 Compass Cuisine | Made by  Srilekha</p>

          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80 transition-opacity text-sm">
              Privacy
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity text-sm">
              Terms
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity text-sm">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
