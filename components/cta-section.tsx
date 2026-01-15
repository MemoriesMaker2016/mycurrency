import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#2c4777' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
            Ready to Get the Best Exchange Rates?
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Join over 500,000 happy customers who trust ForexHub for their
            foreign exchange needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 px-8"
            >
              Book Your Order
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 pt-4">
            Or chat with our experts via WhatsApp
            <a
              href="#"
              className="inline-flex items-center gap-1 ml-2 text-primary-foreground hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
