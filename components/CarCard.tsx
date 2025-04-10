'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './CarCardAnimations.css'; // Importing the animation styles

interface CarProps {
  brand: string;
  model: string;
  price: string;
  fuelType: string;
  seating: number;
  image: string;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
  isInWishlist?: boolean; // To determine if the car is in the wishlist
}

const CarCard = ({
  brand,
  model,
  price,
  fuelType,
  seating,
  image,
  onAddToWishlist,
  onRemoveFromWishlist,
  isInWishlist,
}: CarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      setIsAnimating(true);
      onAddToWishlist();
      setTimeout(() => setIsAnimating(false), 300); // Reset animation state after 300ms
    }
  };

  const handleRemoveFromWishlist = () => {
    if (onRemoveFromWishlist) {
      setIsAnimating(true);
      onRemoveFromWishlist();
      setTimeout(() => setIsAnimating(false), 300); // Reset animation state after 300ms
    }
  };

  return (
    <div
      className={`car-card ${isAnimating ? 'animate' : ''}`} // Apply animation class
      style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '16px',
        width: '250px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease', // Add a transition for smooth animation
      }}
    >
      {/* Wrap card in a Link to /cars/[model] */}
      <Link
        href={`/cars/${model.toLowerCase()}`}
        style={{ textDecoration: 'none' }}
      >
        <div>
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="car-image" // Assign class for image animations
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
              transition: 'transform 0.3s ease', // Smooth hover effect
            }}
          />
          <h3 style={{ color: '#000' }}>
            {brand} {model}
          </h3>
          <p>Fuel: {fuelType}</p>
          <p>Seating: {seating}</p>
          <p style={{ fontWeight: 'bold' }}>{price}</p>
        </div>
      </Link>

      {/* Wishlist Button (outside link) */}
      {isInWishlist ? (
        <button
          className={`wishlist-button remove ${isAnimating ? 'animate' : ''}`}
          onClick={handleRemoveFromWishlist}
        >
          Remove from Wishlist ❌
        </button>
      ) : (
        <button
          className={`wishlist-button add ${isAnimating ? 'animate' : ''}`}
          onClick={handleAddToWishlist}
        >
          Add to Wishlist ❤️
        </button>
      )}
    </div>
  );
};

export default CarCard;
