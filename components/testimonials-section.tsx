import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frequent Traveler",
    content:
      "ForexHub has been my go-to for currency exchange. Their rates are consistently better than banks, and the doorstep delivery is super convenient.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Business Owner",
    content:
      "I regularly send money abroad for my import business. ForexHub's money transfer service is fast, reliable, and their customer support is excellent.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Student Parent",
    content:
      "Sending money to my son studying abroad was so easy with ForexHub. The rates are transparent and the process is completely digital.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
          <p className="text-muted-foreground text-lg">
            See what our customers have to say about their experience with ForexHub.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border">
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
