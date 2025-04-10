'use client';

import React, { useEffect, useState } from 'react';
import CarCard from '@/components/CarCard';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Fetch wishlist data from localStorage on page load
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  // Remove car from wishlist
  const removeFromWishlist = (index: number) => {
    const updated = [...wishlist];
    updated.splice(index, 1); // Remove the car at the specified index
    setWishlist(updated); // Update state
    localStorage.setItem('wishlist', JSON.stringify(updated)); // Store updated wishlist in localStorage
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Back button */}
      <div className="flex justify-start mb-6">
        <Link href="/">
          <button className="py-2 px-6 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
            ⬅️ Back to Home
          </button>
        </Link>
      </div>

      {/* Wishlist Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        💖 Your Wishlist
      </h2>

      {/* Display wishlist */}
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-nowrap overflow-x-auto gap-6">
          {wishlist.map((car, index) => (
            <div key={index} className="flex-none w-64">
              <CarCard
                {...car} // Spread all car properties (brand, model, price, etc.)
                isInWishlist={true} // This car is in the wishlist
                onRemoveFromWishlist={() => removeFromWishlist(index)} // Handle remove from wishlist
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
