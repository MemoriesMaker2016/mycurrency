'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function ProfileMenu({ user }: { user: { firstName: string } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Profile button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 font-medium"
      >
        <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="hidden lg:block">Siddhanth</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Profile
          </Link>

          {/* Logout button (NO behavior yet) */}
          <button
            type="button"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
