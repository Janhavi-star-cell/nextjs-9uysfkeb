'use client';

import React from 'react';

const Filters = ({ onFilterChange }) => {
  return (
    <div
      className="filter-container"
      style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        margin: '20px 0',
        flexWrap: 'wrap',
      }}
    >
      {/* Brand Filter */}
      <select onChange={(e) => onFilterChange('brand', e.target.value)}>
        <option value="">All Brands</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
      </select>

      {/* Fuel Type Filter */}
      <select onChange={(e) => onFilterChange('fuelType', e.target.value)}>
        <option value="">All Fuels</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
      </select>

      {/* Seating Capacity Filter */}
      <select onChange={(e) => onFilterChange('seating', e.target.value)}>
        <option value="">All Seating</option>
        <option value="4">4 Seater</option>
        <option value="5">5 Seater</option>
        <option value="7">7 Seater</option>
      </select>

      {/* Min Price Filter */}
      <select onChange={(e) => onFilterChange('minPrice', e.target.value)}>
        <option value="">Min Price</option>
        <option value="20000">$20,000</option>
        <option value="22000">$22,000</option>
        <option value="24000">$24,000</option>
        <option value="26000">$26,000</option>
        <option value="28000">$28,000</option>
      </select>

      {/* Max Price Filter */}
      <select onChange={(e) => onFilterChange('maxPrice', e.target.value)}>
        <option value="">Max Price</option>
        <option value="22000">$22,000</option>
        <option value="24000">$24,000</option>
        <option value="26000">$26,000</option>
        <option value="28000">$28,000</option>
        <option value="30000">$30,000</option>
      </select>
    </div>
  );
};

export default Filters;
