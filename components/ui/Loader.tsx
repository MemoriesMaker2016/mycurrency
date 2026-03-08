"use client";

import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-pulse">
        <Image
          src="/mycurrency-logo_1.png"
          alt="MyCurrency Logo"
          width={230}
          height={70}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}