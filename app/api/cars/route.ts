// app/api/cars/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Car dataset
const cars = [
  {
    id: 1,
    brand: 'Honda',
    model: 'Civic',
    price: 24000,
    fuelType: 'Petrol',
    seating: 5,
    image: '/images/civic.jpg',
  },
  {
    id: 2,
    brand: 'Toyota',
    model: 'Corolla',
    price: 22000,
    fuelType: 'Diesel',
    seating: 5,
    image: '/images/corolla.jpg',
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Mustang',
    price: 30000,
    fuelType: 'Petrol',
    seating: 4,
    image: '/images/mustang.jpg',
  },
  // Add more cars to fill the list up to 10, if necessary.
];

// GET method to filter and return cars
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const brand = searchParams.get('brand');
    const fuelType = searchParams.get('fuelType');
    const seating = searchParams.get('seating');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filteredCars = [...cars];

    if (brand) {
      filteredCars = filteredCars.filter(
        (car) => car.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    if (fuelType) {
      filteredCars = filteredCars.filter(
        (car) => car.fuelType.toLowerCase() === fuelType.toLowerCase()
      );
    }

    if (seating) {
      filteredCars = filteredCars.filter(
        (car) => car.seating === parseInt(seating)
      );
    }

    if (minPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price <= parseInt(maxPrice)
      );
    }

    return NextResponse.json({
      cars: filteredCars,
      total: filteredCars.length, // Total cars after filtering
    });
  } catch (err) {
    console.error('Error in API:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
