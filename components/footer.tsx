'use client';

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer.footer');

  const services = t.raw('services.items') as string[];
  const quickLinks = t.raw('quickLinks.items') as string[];
  const bottomLinks = t.raw('bottom.links') as string[];

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
              {t('about.description')}
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
            <h3 className="font-semibold text-lg mb-4">
              {t('services.title')}
            </h3>

            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/exchange"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {services[0]}
                </Link>
              </li>

              <li>
                <Link
                  href="/exchange?type=sell"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {services[1]}
                </Link>
              </li>

              <li>
                <Link
                  href="/transfer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {services[2]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {services[3]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {services[4]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t('quickLinks.title')}
            </h3>

            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/rates"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {quickLinks[0]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {quickLinks[1]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {quickLinks[2]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {quickLinks[3]}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  {quickLinks[4]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t('contact.title')}
            </h3>

            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t('contact.phone')}</span>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t('contact.email')}</span>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t('contact.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>{t('bottom.copyright')}</p>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                {bottomLinks[0]}
              </Link>

              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                {bottomLinks[1]}
              </Link>

              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                {bottomLinks[2]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
