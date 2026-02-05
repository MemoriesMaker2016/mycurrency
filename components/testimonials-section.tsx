'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

type TestimonialCardData = {
  image: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

const testimonials: TestimonialCardData[] = [
  {
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60',
    name: 'Karla Lyon',
    role: 'Studio Content Consultant',
    company: '',
    quote:
      'There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected or randomised.',
    rating: 5,
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    name: 'Tomas Campbell',
    role: 'Service technician',
    company: '',
    quote:
      'There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected or randomised.',
    rating: 5,
  },
  {
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60',
    name: 'Robert Ocampo',
    role: 'Account Manager',
    company: '',
    quote:
      'There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected or randomised.',
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialCardData;
}) {
  return (
    <div className="group relative pt-12">
      {/* Avatar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
          <Image
            src={testimonial.image || '/placeholder.svg'}
            alt={testimonial.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg pt-14 pb-6 px-6 transition-all duration-300 group-hover:bg-[#1F3C6D] group-hover:shadow-xl h-full flex flex-col">
        {/* Quote */}
        <p className="text-sm text-gray-600 leading-relaxed text-center mb-6 flex-grow group-hover:text-white/90 transition-colors duration-300">
          {testimonial.quote}
        </p>

        {/* Name and Role */}
        <div className="text-center mb-4">
          <h3 className="font-semibold text-[#1F3C6D] group-hover:text-white transition-colors duration-300">
            {testimonial.name}
          </h3>
          <p className="text-xs text-gray-500 group-hover:text-white/70 transition-colors duration-300">
            {testimonial.role}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 transition-colors duration-300 ${
                index < testimonial.rating
                  ? 'fill-[#ff8a4c] text-[#ff8a4c]'
                  : 'fill-gray-200 text-gray-200 group-hover:fill-white/30 group-hover:text-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-1 bg-[#ff8a4c] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C6D] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Trusted by thousands of satisfied customers worldwide
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
