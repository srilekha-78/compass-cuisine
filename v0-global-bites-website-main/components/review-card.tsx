interface ReviewCardProps {
  dishName: string
  country: string
  review: string
  rating: number
}

export function ReviewCard({ dishName, country, review, rating }: ReviewCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{dishName}</h3>
          <p className="text-sm text-primary font-medium">{country}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-primary">{rating}</span>
          <span className="text-primary">★</span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{review}</p>
    </div>
  )
}
