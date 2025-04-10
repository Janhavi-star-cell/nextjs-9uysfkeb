'use client';

import React, { useState } from 'react';
import CarCard from './CarCard';
import { cars } from '../data/car';
import Filters from './Filters';

const CarList = () => {
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    seating: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters({ ...filters, [type]: value });
  };

  const filteredCars = cars.filter((car) => {
    const matchesBrand = filters.brand ? car.brand === filters.brand : true;
    const matchesFuel = filters.fuelType
      ? car.fuelType === filters.fuelType
      : true;
    const matchesSeats = filters.seating
      ? String(car.seating) === filters.seating
      : true;

    // Safe price conversion
    const numericPrice = car.price
      ? Number(car.price.replace(/[^0-9]/g, ''))
      : 0;
    const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
    const matchesPrice = numericPrice >= minPrice && numericPrice <= maxPrice;

    return matchesBrand && matchesFuel && matchesSeats && matchesPrice;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="filter-heading">🚗 Car Finder Website</h2>
      <Filters onFilterChange={handleFilterChange} />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <CarCard
              key={index}
              {...car}
              onAddToWishlist={() => {
                const wishlist = JSON.parse(
                  localStorage.getItem('wishlist') || '[]'
                );
                const isAlreadyAdded = wishlist.some(
                  (item: any) => item.model === car.model
                );

                if (!isAlreadyAdded) {
                  const { brand, model, price, fuelType, seating, image } = car;
                  wishlist.push({
                    brand,
                    model,
                    price,
                    fuelType,
                    seating,
                    image,
                  });
                  localStorage.setItem('wishlist', JSON.stringify(wishlist));
                  alert(`${car.model} added to wishlist!`);
                } else {
                  alert(`${car.model} is already in your wishlist.`);
                }
              }}
            />
          ))
        ) : (
          <p>No cars match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
