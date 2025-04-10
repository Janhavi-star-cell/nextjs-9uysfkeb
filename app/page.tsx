'use client';

import Link from 'next/link';
import CarList from '@/components/CarList';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  return (
    <main>
      {/* Top header bar with Wishlist (right) and Dark Mode (left) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Left side: Dark mode toggle */}
        <DarkModeToggle />

        {/* Right side: Wishlist button */}
        <Link href="/wishlist">
          <button
            style={{
              padding: '10px 16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            💖 View Wishlist
          </button>
        </Link>
      </div>

      {/* Car listing section */}
      <CarList />
    </main>
  );
}
