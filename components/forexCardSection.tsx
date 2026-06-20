
'use client';

import Image from 'next/image';
import { CheckCircle, Globe } from 'lucide-react';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export function ForexCardSection() {
  const t = useTranslations('forexcardsectionHome');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = (e.clientX - rect.left - centerX) * 0.1;
    const y = (e.clientY - rect.top - centerY) * 0.1;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const features = t.raw('features') as string[];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-green-50 overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative elements */}
      <div className="absolute bottom-32 left-20 text-6xl opacity-20">
        <Globe className="w-12 h-12 text-green-400" />
      </div>

      <div className="absolute top-40 right-20 w-8 h-8 rounded-full bg-green-400 opacity-40"></div>

      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-bold tracking-widest text-gray-800">
              {t('badge')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span style={{ color: '#1F3C6D' }}>
              {t('title.line1')}
            </span>
            <br />
            <span style={{ color: '#1F3C6D' }}>
              {t('title.line2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t('description')}
          </p>

          {/* Features */}
          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:bg-blue-50 transition-all duration-300 border-l-4 border-transparent hover:border-primary transform hover:translate-x-2 group"
              >
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>

                <p className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* CTA and Rating */}
          <div className="flex items-center gap-6 flex-wrap">
            <button className="inline-flex items-center gap-2 bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group cursor-pointer">
              {t('cta')}
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  {t('avatars.first')}
                </div>

                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  {t('avatars.second')}
                </div>

                <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  {t('avatars.third')}
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900">
                  {t('rating.score')}
                </div>

                <div className="text-sm text-gray-600">
                  {t('rating.label')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex items-center justify-center py-12">
          <div className="relative w-full max-w-sm">
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
            >
              <Image
                src="/mycurrencyForexCard.jpeg"
                alt={t('imageAlt')}
                width={400}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
