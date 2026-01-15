import Link from 'next/link';
import {
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/mycurrency-logo-white.png"
                alt="MyCurrency Logo"
                width={200}
                height={70}
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              India&apos;s leading online forex marketplace. Buy & sell foreign
              currency at the best rates with doorstep delivery.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/exchange"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Buy Foreign Currency
                </Link>
              </li>
              <li>
                <Link
                  href="/exchange?type=sell"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Sell Foreign Currency
                </Link>
              </li>
              <li>
                <Link
                  href="/transfer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Money Transfer
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Forex Cards
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/rates"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Live Rates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Rate Alerts
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+91 99912 25544</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>support@mycurrency.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  E-187, Jindal Global City, Sector 35, Sonipat, Haryana 131001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>
              © 2026 mycurrency. All rights reserved. RBI Authorized Dealer.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
