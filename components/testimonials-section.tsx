'use client';

import Image from 'next/image';

type CardData = {
  image: string;
  name: string;
  handle: string;
};

const cardsData: CardData[] = [
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Briar Martin',
    handle: '@neilstellar',
  },
  {
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Avery Johnson',
    handle: '@averywrites',
  },
  {
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    name: 'Jordan Lee',
    handle: '@jordantalks',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    name: 'Avery Johnson',
    handle: '@averywrites',
  },
];

function Card({ card }: { card: CardData }) {
  return (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <Image
          src={card.image}
          alt={card.name}
          width={44}
          height={44}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-medium">
            {card.name}
            <svg
              className="fill-blue-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <path d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59c-.052.078-.114.151-.239.297-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56Z" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">
        Radiant made undercutting all of our competitors an absolute breeze.
      </p>
    </div>
  );
}

export default function TestimonialSection() {
  const marqueeData = [...cardsData, ...cardsData];

  return (
    <section className="py-20 bg-white">
      {/* 🔥 Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Trusted by Thousands
        </h2>
        <p className="mt-3 text-gray-600 text-base md:text-lg">
          See what our customers have to say about their experience with
          ForexHub.
        </p>
      </div>

      {/* ROW 1 */}
      <div className="relative overflow-hidden max-w-5xl mx-auto">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="marquee flex w-max animate-marquee">
          {marqueeData.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* ROW 2 */}
      <div className="relative overflow-hidden max-w-5xl mx-auto mt-6">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="marquee flex w-max animate-marquee-reverse">
          {marqueeData.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
